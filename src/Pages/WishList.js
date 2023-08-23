import React,{useState, useEffect, useContext} from 'react';
import './Styles/produits.css';
import {Card, Badge, Button, Spinner} from 'react-bootstrap';
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { IoIosHeartDislike } from "react-icons/io";
import { DeleteWishList, ClearWishList } from '../Backends/Wishlist';
import { Alerts } from '../Components/Communs/Alerts';
import { ModalConfirmation } from "../Components/Communs/DlgConfirmation";
import Navigation from '../Components/Produits/Navigation';

import { WishContext } from '../App';


export default function WishList(){
    const [Alert, setAlert]=useState({Etat: false, Titre: '', Type: '', Message: ''});
    const [Modal, setModal]= useState({Action:-1, Etat: false, Titre:'', Message:'',
                                        TxtBtnConfirmer:'', TxtBtnAnnuler:'', Type:'', Data: Object});
    const getWishLists = useContext(WishContext);
    const deleteWishList= DeleteWishList();
    const clearWishList= ClearWishList();

    useEffect(()=>{
        if (deleteWishList.isError){
            setAlert({Etat: true, Titre: 'WISHLIST - Error delete item', Type: 'ERROR', Message: deleteWishList.error.message});
            deleteWishList.reset();
        } else if (deleteWishList.isSuccess){
            setAlert({Etat: true, Titre: 'WISHLIST - Suppression article', Type: 'SUCCESS', Message: 'Suppression de l\'article "'+Modal.Data.name+'" dans le wishlist avec succés !'});
            deleteWishList.reset();
            getWishLists.refetch();
        }

        if (clearWishList.isError){
            setAlert({Etat: true, Titre: 'WISHLIST - Error clear item', Type: 'ERROR', Message: clearWishList.error.message});
            clearWishList.reset();
        } else if (clearWishList.isSuccess){
            setAlert({Etat: true, Titre: 'WISHLIST - Vidange de la liste', Type: 'SUCCESS', Message: 'Le wishlist a été vidé avec succés !'});
            clearWishList.reset();
            getWishLists.refetch();
        }
    }, [deleteWishList, clearWishList, Modal])

    function onFermerAlert(){
        setAlert({Etat: false});
    }

    function handleDelete(item){
        setModal({Action: 1, Etat: true, Type: 'ERROR', Titre: 'WISHLIST - SUPPRESSION WISHLIST...', 
        Message: 'Vous voulez vraiment supprimer cet article "'+item.name+'" ?', TxtBtnConfirmer:'Supprimer', TxtBtnAnnuler: 'Annuler', Data: Object.assign({}, item)});
    }

    function handleClear(){
      setModal({Action: 2, Etat: true, Type: 'ERROR', Titre: 'WISHLIST - VIDER LISTE...', 
      Message: 'Vous voulez vraiment vider ce liste ?', TxtBtnConfirmer:'Vider', TxtBtnAnnuler: 'Annuler'});
  }

    function handleModalConfirmer(Action){
      switch(Action){
          case 1: // suppression article
                deleteWishList.mutate({productId: Modal.Data.id});
                break;
          case 2: // vidage du panier
              clearWishList.mutate({});  
              break;
          default:
      }
      Modal.Action= 0;
        Modal.Etat= false;
        setModal(Modal);
    }

    function handleModalAnnuler(Action){
        setModal({Action: 0, Etat: false});
    }

    return (
        <>
            <div style={{height: '100%'}}>
                <div style={{height: 'calc(100vh - 200px)', overflowY: 'scroll', overflowX: 'hidden'}}>
                    <div className= 'd-flex align-items-center justify-content-between'>
                        <Navigation nav={['accueil', 'wishlist']} />
                        <Button disabled={clearWishList.isLoading?true:getWishLists.data.length===0?true:false} onClick={()=>handleClear()} className='text-nowrap' variant='danger'>
                            <Spinner className={clearWishList.isLoading?'d-block':'d-none'} variant='dark' as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            <IoIosHeartDislike className= {clearWishList.isLoading?'d-none':'d-block me-2'}/>Vider la liste
                        </Button>
                    </div>
                    <div className='d-flex flex-row flex-wrap justify-content-evenly'>
                    {getWishLists.data.map(item=>(
                              <Card  key={item.id} className='mx-2 my-3 border-0 border-top border-start border-primary border-3 rounded-4' style={{ cursor: 'pointer', width: '16rem', height: '20rem', maxHeight: '20rem',
                                  boxShadow: '15px 10px 15px 0px rgba(0,0,0,0.2)' }}>
                                  <Card.Img className='d-flex align-items-start mt-2' variant="top" src= {item.image} style={{width: '100%', height: '40%', objectFit: 'contain'}} />
                                  <Card.Body className='d-flex flex-column justify-content-between px-2 py-2'>
                                      <Card.Title className='text-center fw-bold text-primary my-0 py-0' style={{height: '50px'}}>{item.name}</Card.Title>
                                      <div className='text-center my-0 description' style={{display: '-webkit-box', maxWidth: '100%', height: '30px', overflow:' hidden'}}>
                                          {item.description}
                                      </div>
                                      <div className='d-flex justify-content-center'>
                                          <h5 className='my-0'><Badge className='bg-warning'><RiMoneyDollarCircleFill className='me-2' style={{fontSize:'1.5rem'}} />{new Intl.NumberFormat().format(item.price)} $</Badge></h5>
                                      </div>
                                      <div className='my-2 d-flex justify-content-between align-items-center'>
                                          <div div className='d-flex justify-content-center'>
                                              <span className='fw-bold'>{item.category.name}</span>
                                          </div>

                                          <Button className='py-1' variant= 'danger' onClick={()=>handleDelete(item)} >                                                
                                                <MdCancel style={{fontSize:'1.5rem'}} />
                                          </Button>

                                          <div className='d-flex justify-content-center'>
                                              <span style={{color: item.color.hexCode}}>{item.color.name}</span>
                                              <span className='px-2 ms-2' style={{border: '1px solid', color: item.color.hexCode, backgroundColor: item.color.hexCode,}}>C</span>
                                          </div>
                                      </div>
                                  </Card.Body>
                              </Card>
                          ))}
                    </div>
                  </div>
            </div>
            <Alerts Etat={Alert.Etat} Type={Alert.Type} Titre={Alert.Titre}  Message={Alert.Message} onFermer= {onFermerAlert}/>            
            <ModalConfirmation Action={Modal.Action} Titre={Modal.Titre} Message={Modal.Message} TextBtnConfirmer={Modal.TxtBtnConfirmer} TextBtnAnnuler={Modal.TxtBtnAnnuler} Etat={Modal.Etat} Type={Modal.Type} onConfirmer={handleModalConfirmer} onAnnuler={handleModalAnnuler}/>
        </>
    );
    
};
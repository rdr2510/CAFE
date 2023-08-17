import { useEffect, useState } from "react"
import { Carts } from "../Backends/Carts";
import { Alerts } from '../Components/Communs/Alerts';
import {Table, Button, Form, Badge} from 'react-bootstrap';
import './Styles/paniers.css';
import {  MdShoppingCartCheckout, MdRemoveShoppingCart } from "react-icons/md";
import { BsCartXFill } from "react-icons/bs";
import { useRef } from "react";
import { ModalConfirmation } from "../Components/Communs/DlgConfirmation";


export default function Paniers({onPanier}){
    const urlBase= 'https://insta-api-api.0vxq7h.easypanel.host/';

    let [carts, setCarts] = useState([]);
    const [Alert, setAlert]=useState({Etat: false, Titre: '', Type: '', Message: ''});
    let [subTotal, setSubTotal]= useState(0);
    let [taxe, setTaxe]= useState(0);
    let [grandTotal, setGrandTotal]= useState(0);
    let [qt, setQt] = useState(1);
    const [Modal, setModal]= useState({Action:-1, Etat: false, Titre:'', Message:'',
                                        TxtBtnConfirmer:'', TxtBtnAnnuler:'', Type:'', Data: Object});

    const count= useRef(0);

    function onFermerAlert(){
        setAlert({Etat: false});
    }

    function calculTotal(){
        subTotal= 0;
        setSubTotal(subTotal);
        for(const item of carts){
            subTotal= subTotal + (item.quantity * item.price);
        }
        setSubTotal(subTotal);
        taxe= subTotal * 14.975 / 100;
        setTaxe(taxe);
        grandTotal= subTotal + taxe;
        setGrandTotal(grandTotal);
    }

    useEffect(()=>{
        const paniers= new Carts(urlBase);
        paniers.getAll().then(p=>{
            setCarts(carts);
            calculTotal();
        }).catch(error=>{
            setAlert({Etat: true, Titre: 'CATÉGORIE - Error list all products', Type: 'ERROR', Message: error.message});
            console.log(error);
        });
        count.current= count.current + 1;
    }, []);

    function handleMoinsQte(index){
        let q= carts[index].quantity;
        --q;
        if (q > 0){ 
            carts[index].quantity= q;
            setCarts(carts.slice(0));
            calculTotal();
        }
    }

    function handlePlusQte(index){
        let q= carts[index].quantity;
        ++q;
        if (q > 0){ 
            carts[index].quantity= q;
            setCarts(carts.slice(0));
            calculTotal();
        }
    };
      
    function handleChange(event, index){
        if (event.target.value === ''){
            let q= carts[index].quantity;
            qt= q;
            setQt(qt);
        }

        carts[index].quantity= event.target.value;
        setCarts(carts.slice(0));

        if (event.target.value > 0){
            carts[index].quantity= event.target.value;
            setCarts(carts.slice(0));
            calculTotal();
        }
    }

    function handleFocusOut(event, index){
        if (event.target.value === '' || event.target.value <= 0){
            carts[index].quantity= qt;
            setCarts(carts.slice(0));
            calculTotal();
        }
    }

    function handleDelete(item){
        setModal({Action: 1, Etat: true, Type: 'ERROR', Titre: 'PANIER - SUPPRESSION ARTICLES...', 
        Message: 'Vous voulez vraiment supprimer cet article "'+item.name+'" ?', TxtBtnConfirmer:'Supprimer', TxtBtnAnnuler: 'Annuler', Data: item});
    }

    function handleClear(){
        setModal({Action: 2, Etat: true, Type: 'ERROR', Titre: 'PANIER - VIDER PANIER...', 
        Message: 'Vous voulez vraiment vider votre panier ?', TxtBtnConfirmer:'Vider', TxtBtnAnnuler: 'Annuler'});
    }

    function handleModalConfirmer(Action){
        const urlBase= 'https://insta-api-api.0vxq7h.easypanel.host/';
        const paniers= new Carts(urlBase);
        switch(Action){
            case 1: // suppression article
                paniers.delete(Modal.Data.id).then(()=>{
                    setAlert({Etat: true, Titre: 'PANIER - Suppression panier', Type: 'SUCCESS', Message: 'Suppression de l\'article "'+Modal.Data.name+'" dans le panier avec succés !'});
                    paniers.getAll().then((p)=>{
                        onPanier(p.length);
                        carts= p.splice(0);
                        setCarts(carts);
                        calculTotal();
                    }).catch(error=>{
                        setAlert({Etat: true, Titre: 'PANIER - Error Total item on cart', Type: 'ERROR', Message: error.message});
                    });
                }).catch(error=>{
                    setAlert({Etat: true, Titre: 'PANIER - Error delete item', Type: 'ERROR', Message: error.message});
                });
                break;
            case 2: // vidage du panier
                paniers.clear().then(()=>{
                    setAlert({Etat: true, Titre: 'PANIER - Vidange du panier', Type: 'SUCCESS', Message: 'Le panier a été vidé avec succés !'});
                    paniers.getAll().then((p)=>{
                        onPanier(p.length);
                        carts= p.splice(0);
                        setCarts(carts);
                        calculTotal();
                    }).catch(error=>{
                        setAlert({Etat: true, Titre: 'PANIER - Error Total item on cart', Type: 'ERROR', Message: error.message});
                    });
                }).catch(error=>{
                    setAlert({Etat: true, Titre: 'PANIER - Error clear item', Type: 'ERROR', Message: error.message});
                });
                break;
            default:
        }
        setModal({Action: 0, Etat: false});
    }

    function handleModalAnnuler(Action){
        setModal({Action: 0, Etat: false});
    }

    return(
        <>
            <div style={{height: '100%'}}>
                <div style={{height: 'calc(100vh - 200px)', overflowY: 'scroll', overflowX: 'hidden'}}>
                    <div className="d-flex justify-content-between">
                        <h3 className="text-center w-100 my-4">Votre Panier (<span className="text-dark">{carts.length} articles</span>)</h3>
                        <h3 className="text-center my-4 text-nowrap mx-2"><Badge>TOTAL : <span className="text-dark fw-bold">{new Intl.NumberFormat().format(grandTotal)} $</span></Badge></h3>                   
                        <Button disabled={carts.length===0?true:false} onClick={()=>handleClear()} variant="danger" className="text-nowrap my-4 mx-2">Vider le panier<MdRemoveShoppingCart className="ms-2" style={{fontSize:"25px"}} /></Button>
                        <Button disabled={carts.length===0?true:false} variant="dark" className="text-nowrap my-4 mx-2">Passer à la caisse<MdShoppingCartCheckout className="ms-2" style={{fontSize:"25px"}} /></Button>
                    </div>
                    
                    <Table hover responsive>
                        <thead>
                            <tr >
                                <th className="text-center" style={{width: '50%'}}><h4>Articles</h4></th>
                                <th className="text-center " style={{width: '16%'}}><h4>Prix</h4></th>
                                <th className="text-center" style={{width: '16%'}}><h4>Quantité</h4></th>
                                <th className="text-center" style={{width: '16%'}}><h4>Total</h4></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {carts.map((item, index)=>(
                                <tr key={index} >
                                    <td className="d-flex">
                                        <div style={{height: '5rem', width: '10rem'}}>
                                            <img src={item.image} alt="" style={{height: '5rem', width: '10rem', objectFit: 'contain'}}/>
                                        </div>
                                        <div className="d-flex flex-column justify-content-between">
                                            <div>
                                                <h5 className="mb-0">{item.name}</h5>
                                                <span className='description my-0' style={{display: '-webkit-box', width: '100%', height: '25px', overflow:' hidden'}}>
                                                    {item.description}
                                                </span>
                                            </div>
                                            <div className="d-flex">
                                                <span className="fw-bold">Couleur: </span><span className="mx-2" style={{color: item.color.hexCode}}>{item.color.name}</span><span className='px-2 ms-2' style={{width: '15px', height: '20px', border: '1px solid', color: item.color.hexCode, backgroundColor: item.color.hexCode}}>C</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center align-middle fs-6">{new Intl.NumberFormat().format(item.price)} $</td>
                                    <td className="text-center align-middle">
                                        <div className="d-flex w-100 justify-content-center align-items-center" style={{height: '100%'}}>
                                            <div className='d-flex me-4' style={{height: '35px'}} >
                                                <Button onClick={()=>handleMoinsQte(index)} variant="primary" className='rounded-0 fw-bold fs-5 py-0' style={{cursor: 'pointer', width: '40px'}}>-</Button>
                                                <Form.Control value={carts[index].quantity} onBlur={(event)=>handleFocusOut(event, index)} onChange={(event)=>handleChange(event, index)} className='rounded-0' style={{width: '55px', textAlign: 'center'}} type="number" />
                                                <Button onClick={()=>handlePlusQte(index)} variant="primary" className='rounded-0 fw-bold fs-5 py-0' style={{cursor: 'pointer', width: '40px'}} >+</Button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center align-middle fs-6 fw-bold">{new Intl.NumberFormat().format(item.price * item.quantity)} $</td>
                                    <td className="text-center align-middle"><Button variant="danger" onClick={(event)=>handleDelete(item)}><BsCartXFill style={{fontSize:"25px"}} /></Button></td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="active">
                                <td></td>
                                <td></td>
                                <td className="fw-bold">SOUS-TOTAL : </td>
                                <td className="text-center"><h6 className="text-dark fw-bold">{new Intl.NumberFormat().format(subTotal)} $</h6></td>
                                <td></td>
                            </tr>
                            <tr className="active">
                                <td></td>
                                <td></td>
                                <td className="fw-bold">TPS (5%) + TVQ (9.975%) : </td>
                                <td className="text-center"><span className="fs-6">{new Intl.NumberFormat().format(taxe)} $</span></td>
                                <td></td>
                            </tr>
                            <tr className="active">
                                <td></td>
                                <td></td>
                                <td className="fw-bold"><h5 className="align-middle my-0">GRAND-TOTAL : </h5></td>
                                <td className="text-center align-middle"><h4 className="align-middle my-0 "><Badge>{new Intl.NumberFormat().format(grandTotal)} $</Badge></h4></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </Table>
                </div>
            </div>

            <ModalConfirmation Action={Modal.Action} Titre={Modal.Titre} Message={Modal.Message} TextBtnConfirmer={Modal.TxtBtnConfirmer} TextBtnAnnuler={Modal.TxtBtnAnnuler} Etat={Modal.Etat} Type={Modal.Type} onConfirmer={handleModalConfirmer} onAnnuler={handleModalAnnuler}/>
            <Alerts Etat={Alert.Etat} Type={Alert.Type} Titre={Alert.Titre}  Message={Alert.Message} onFermer= {onFermerAlert}/>
        </>
    )
}
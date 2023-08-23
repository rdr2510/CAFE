import { useState, useEffect, useContext, useRef } from "react"
import { DeletePanier, ClearPanier, UpdatePanier } from "../Backends/Carts";
import { Alerts } from '../Components/Communs/Alerts';
import {Table, Button, Form, Badge, Spinner} from 'react-bootstrap';
import './Styles/paniers.css';
import {  MdShoppingCartCheckout, MdRemoveShoppingCart } from "react-icons/md";
import { BsCartXFill } from "react-icons/bs";
import { ModalConfirmation } from "../Components/Communs/DlgConfirmation";
import { CartContext, PromotionContext } from '../App';
import { useNavigate } from "react-router-dom";


export default function Paniers(){
    const navigate= useNavigate();
    let carts = useRef([]);
    const [Alert, setAlert]=useState({Etat: false, Titre: '', Type: '', Message: ''});
    let [subTotal, setSubTotal]= useState(0);
    let [taxe, setTaxe]= useState(0);
    let [grandTotal, setGrandTotal]= useState(0);
    let [qt, setQt] = useState(1);
    const [Modal, setModal]= useState({Action:-1, Etat: false, Titre:'', Message:'',
                                        TxtBtnConfirmer:'', TxtBtnAnnuler:'', Type:'', Data: Object});
    const [updateQte, setUpdateQte]= useState('o');

    const getPaniers = useContext(CartContext);
    const getPromotions = useContext(PromotionContext);

    const deletePanier= DeletePanier();
    const clearPanier= ClearPanier();
    const updatePanier= UpdatePanier();

    function calculTotal(){
        subTotal= 0;
        setSubTotal(subTotal);
        for(const item of carts.current){
            subTotal= subTotal + (item.data.quantity * (item.data.price - (item.data.price * item.promotion)));
        }
        setSubTotal(subTotal);
        taxe= subTotal * 14.975 / 100;
        setTaxe(taxe);
        grandTotal= subTotal + taxe;
        setGrandTotal(grandTotal);
    }

    function updateCarts(){
        carts.current=[];
        for (const item of getPaniers.data){
            const isExist = (element) => (element.productId === item.id);
            const index= getPromotions.data.findIndex(isExist);
            if (index !==-1){
                carts.current.push({data: item, promotion: getPromotions.data[index].discountPercent});
            } else {
                carts.current.push({data: item, promotion: 0});
            }
        }
    }

    useEffect(()=>{
        updateCarts();
        calculTotal();

        if (updatePanier.isError){
            setAlert({Etat: true, Titre: 'PANIER - Update item', Type: 'ERROR', Message: updatePanier.error.message});
            updatePanier.reset();
            setUpdateQte('o');
        } else if (updatePanier.isSuccess){
            setAlert({Etat: true, Titre: 'PANIER - Mise a jour', Type: 'SUCCESS', Message: 'mise a jour d\'un article "'+Modal.Data.name+'" dans le panier avec succés !'});
            updatePanier.reset();
            getPaniers.refetch();
            setUpdateQte('o');
        }

        if (deletePanier.isError){
            setAlert({Etat: true, Titre: 'PANIER - Error delete item', Type: 'ERROR', Message: deletePanier.error.message});
            deletePanier.reset();
        } else if (deletePanier.isSuccess){
            setAlert({Etat: true, Titre: 'PANIER - Suppression panier', Type: 'SUCCESS', Message: 'Suppression de l\'article "'+Modal.Data.name+'" dans le panier avec succés !'});
            deletePanier.reset();
            getPaniers.refetch();
        }

        if (clearPanier.isError){
            setAlert({Etat: true, Titre: 'PANIER - Error clear item', Type: 'ERROR', Message: clearPanier.error.message});
            clearPanier.reset();
        } else if (clearPanier.isSuccess){
            setAlert({Etat: true, Titre: 'PANIER - Vidange du panier', Type: 'SUCCESS', Message: 'Le panier a été vidé avec succés !'});
            clearPanier.reset();
            getPaniers.refetch();
        }
    }, [clearPanier, updatePanier, deletePanier, Modal])

    function onFermerAlert(){
        setAlert({Etat: false});
    }

    function handleMoinsQte(index){
        let q= carts.current[index].data.quantity;
        --q;
        if (q > 0){ 
            setUpdateQte('-');
            Modal.Data= carts.current[index].data;
            let id= carts.current[index].data.id;
            updatePanier.mutate({productId: id, quantity: q});
            carts.current[index].data.quantity= q;
            calculTotal();
        }
    }

    function handlePlusQte(index){
        let q= carts.current[index].data.quantity;
        ++q;
        if (q > 0){ 
            setUpdateQte('+');
            Modal.Data= carts.current[index].data;
            let id= carts.current[index].data.id;
            updatePanier.mutate({productId: id, quantity: q});
            carts.current[index].data.quantity= q;
            calculTotal();
        }
    };
      
    function handleChange(event, index){
        if (event.target.value === ''){
            let q= carts.current[index].data.quantity;
            qt= q;
            setQt(qt);
        }

        carts.current[index].data.quantity= event.target.value;

        if (event.target.value > 0){
            carts.current[index].data.quantity= event.target.value;
            calculTotal();
        }
    }

    function handleFocusOut(event, index){
        if (event.target.value === '' || event.target.value <= 0){
            carts.current[index].data.quantity= qt;
            calculTotal();
        } else if (qt !== event.target.value){
            setUpdateQte('o');
            let id= carts.current[index].data.id;
            Modal.Data= carts.current[index].data;
            updatePanier.mutate({productId: id, quantity: event.target.value});
        }
    }

    function handleDelete(item){
        setModal({Action: 1, Etat: true, Type: 'ERROR', Titre: 'PANIER - SUPPRESSION ARTICLES...', 
        Message: 'Vous voulez vraiment supprimer cet article "'+item.name+'" ?', TxtBtnConfirmer:'Supprimer', TxtBtnAnnuler: 'Annuler', Data: Object.assign({}, item.data)});
    }

    function handleClear(){
        setModal({Action: 2, Etat: true, Type: 'ERROR', Titre: 'PANIER - VIDER PANIER...', 
        Message: 'Vous voulez vraiment vider votre panier ?', TxtBtnConfirmer:'Vider', TxtBtnAnnuler: 'Annuler'});
    }

    function handleModalConfirmer(Action){
        switch(Action){
            case 1: // suppression article
                    deletePanier.mutate(Modal.Data.id);
                break;
            case 2: // vidage du panier    
                    clearPanier.mutate({});
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

    return(
        <>
            <div style={{height: '100%'}}>
                <div style={{height: 'calc(100vh - 200px)', overflowY: 'auto', overflowX: 'hidden'}}>
                    <div className="mx-4">
                        <div className="d-flex justify-content-between">
                            <h3 className="text-center w-100 my-4">Votre Panier (<span className="text-dark">{carts.current.length} articles</span>)</h3>
                            <h3 className="text-center my-4 text-nowrap mx-2"><Badge>TOTAL : <span className="text-dark fw-bold">{new Intl.NumberFormat().format(grandTotal)} $</span></Badge></h3>                   
                            <Button disabled={carts.current.length===0?true:false} onClick={()=>handleClear()} variant="danger" className="text-nowrap my-4 mx-2">Vider le panier<MdRemoveShoppingCart className="ms-2" style={{fontSize:"25px"}} /></Button>
                            <Button onClick={()=>{navigate('/Checkout')}} disabled={carts.current.length===0?true:false} variant="dark" className="text-nowrap my-4 mx-2">Passer à la caisse<MdShoppingCartCheckout className="ms-2" style={{fontSize:"25px"}} /></Button>
                        </div>
                        
                        <Table hover responsive className="border-dark">
                            <thead>
                                <tr >
                                    <th className="text-center" style={{width: '45%'}}><h4>Articles</h4></th>
                                    <th className="text-center " style={{width: '13.75%'}}><h4>Prix</h4></th>
                                    <th className="text-center" style={{width: '13.75%'}}><h4>Quantité</h4></th>
                                    <th className="text-center" style={{width: '13.75%'}}><h4>Rabais</h4></th>
                                    <th className="text-center" style={{width: '13.75%'}}><h4>Total</h4></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {carts.current.map((item, index)=>(
                                    <tr key={index} >
                                        <td className="d-flex">
                                            <div style={{height: '5rem', width: '10rem'}}>
                                                <img src={item.data.image} alt="" style={{height: '5rem', width: '10rem', objectFit: 'contain'}}/>
                                            </div>
                                            <div className="d-flex flex-column justify-content-between">
                                                <div>
                                                    <h5 className="mb-0">{item.data.name}</h5>
                                                    <span className='description my-0' style={{display: '-webkit-box', width: '100%', height: '25px', overflow:' hidden'}}>
                                                        {item.data.description}
                                                    </span>
                                                </div>
                                                <div className="d-flex">
                                                    <span className="fw-bold">Couleur: </span><span className="mx-2" style={{color: item.data.color.hexCode}}>{item.data.color.name}</span><span className='px-2 ms-2' style={{width: '15px', height: '20px', border: '1px solid', color: item.data.color.hexCode, backgroundColor: item.data.color.hexCode}}>C</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center align-middle fs-6">{new Intl.NumberFormat().format(item.data.price)} $</td>
                                        <td className="text-center align-middle">
                                            <div className="d-flex w-100 justify-content-center align-items-center" style={{height: '100%'}}>
                                                <div className='d-flex me-4' style={{height: '35px'}} >
                                                    <Button disabled={updatePanier.isLoading?true:false} onClick={()=>handleMoinsQte(index)} variant="primary" className='rounded-0 fw-bold fs-5 py-0' style={{cursor: 'pointer', width: '40px'}}>
                                                        <Spinner className={updateQte==='-'&&updatePanier.isLoading?'d-block':'d-none'} variant='dark' as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                                        <span className={updateQte==='-'&&updatePanier.isLoading?'d-none':'d-block'}>-</span>
                                                    </Button>
                                                    <Form.Control disabled={updatePanier.isLoading?true:false} value={item.data.quantity} onBlur={(event)=>handleFocusOut(event, index)} onChange={(event)=>handleChange(event, index)} className='rounded-0' style={{width: '55px', textAlign: 'center'}} type="number" />
                                                    <Button disabled={updatePanier.isLoading?true:false} onClick={()=>handlePlusQte(index)} variant="primary" className='rounded-0 fw-bold fs-5 py-0' style={{cursor: 'pointer', width: '40px'}} >
                                                        <Spinner className={updateQte==='+'&&updatePanier.isLoading?'d-block':'d-none'} variant='dark' as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                                        <span className={updateQte==='+'&&updatePanier.isLoading?'d-none':'d-block'}>+</span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={item.promotion!==0?"text-center align-middle text-danger fw-bold fs-5":"text-center align-middle"}>{item.promotion!==0?(item.promotion * 100)+' %':'-'}</td>
                                        <td className="text-center align-middle fs-6 fw-bold">{new Intl.NumberFormat().format((item.data.price - (item.data.price * item.promotion)) * item.data.quantity)} $</td>
                                        <td className="text-center align-middle">
                                            <Button disabled={deletePanier.isLoading?true:false} variant="danger" onClick={(event)=>handleDelete(item)}>
                                                <Spinner className={deletePanier.isLoading?'d-block':'d-none'} variant='dark' as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                                <BsCartXFill className={deletePanier.isLoading?'d-none':'d-block'} style={{fontSize:"25px"}} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="active border-0 border-primary">
                                    <td className="border-0"></td>
                                    <td className="border-0"></td>
                                    <td className="fw-bold" colSpan={2}>SOUS-TOTAL : </td>
                                    <td className="text-center"><h6 className="text-dark fw-bold">{new Intl.NumberFormat().format(subTotal)} $</h6></td>
                                    <td></td>
                                </tr>
                                <tr className="active border-0 border-primary">
                                    <td className="border-0"></td>
                                    <td className="border-0"></td>
                                    <td className="fw-bold" colSpan={2}>TPS (5%) + TVQ (9.975%) : </td>
                                    <td className="text-center"><span className="fs-6">{new Intl.NumberFormat().format(taxe)} $</span></td>
                                    <td></td>
                                </tr>
                                <tr className="active border-0 border-primary">
                                    <td className="border-0"></td>
                                    <td className="border-0"></td>
                                    <td className="fw-bold" colSpan={2}><h5 className="align-middle my-0 fw-bold">GRAND-TOTAL : </h5></td>
                                    <td className="text-center align-middle"><h4 className="align-middle my-0 "><Badge>{new Intl.NumberFormat().format(grandTotal)} $</Badge></h4></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td className="border-0" colSpan={4}></td>
                                    <td colSpan={2} className="border-0">
                                        <div className="d-flex justify-content-end">
                                            <Button onClick={()=>{navigate('/Checkout')}} disabled={carts.current.length===0?true:false} variant="dark" className="text-nowrap my-2">Passer à la caisse<MdShoppingCartCheckout className="ms-2" style={{fontSize:"25px"}} /></Button>
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </Table>
                    </div>
                </div>
            </div>

            <ModalConfirmation Action={Modal.Action} Titre={Modal.Titre} Message={Modal.Message} TextBtnConfirmer={Modal.TxtBtnConfirmer} TextBtnAnnuler={Modal.TxtBtnAnnuler} Etat={Modal.Etat} Type={Modal.Type} onConfirmer={handleModalConfirmer} onAnnuler={handleModalAnnuler}/>
            <Alerts Etat={Alert.Etat} Type={Alert.Type} Titre={Alert.Titre}  Message={Alert.Message} onFermer= {onFermerAlert}/>
        </>
    )
}
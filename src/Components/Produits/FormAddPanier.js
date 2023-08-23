import {Form, Button, Spinner} from 'react-bootstrap';
import { BsCart4 } from "react-icons/bs";
import './Styles/formaddpanier.css';
import { useState, useEffect, useContext } from 'react';
import { AddPanier } from "../../Backends/Carts";
import { Alerts } from '../Communs/Alerts';
import { CartContext } from '../../App';

export default function FormAddPanier({id, name, onPanier}){
    const [qte, setQte] = useState(1);
    const [qt, setQt] = useState(1);
    const [Alert, setAlert]=useState({Etat: false, Titre: '', Type: '', Message: ''});
    const addPanier= AddPanier();

    const getPaniers = useContext(CartContext);

    useEffect(()=>{
        if (addPanier.isError){
            setAlert({Etat: true, Titre: 'PANIER - Error add products', Type: 'ERROR', Message: addPanier.error.message});            
            addPanier.reset();
        } else if (addPanier.status === 'success'){
            setAlert({Etat: true, Titre: 'PANIER - Ajout panier', Type: 'SUCCESS', Message: 'Ajout de produit dans le panier avec succés !  Produit: '+name+' - Quantité: '+qte});
            addPanier.reset();
            getPaniers.refetch();
        }
    }, [getPaniers, addPanier, onPanier, name, qte])


    function handleMoinsQte(){
        let q= qte;
        --q;
        if (q > 0){ 
            setQte(q);
        }
    }

    function handlePlusQte(){
        let q= qte;
        ++q;
        setQte(q);
    }

    function handleChange(event){
        if (event.target.value === ''){
            let q= qte;
            setQt(q);
        }

        setQte(event.target.value);

        if (event.target.value > 0){
            setQt(event.target.value);    
        }
    }

    function handleFocusOut(event){
        setQte(qt);
    }

    function onFermerAlert(){
        setAlert({Etat: false});
    }

    function handleAddPanier(event){
        addPanier.mutate({productId: id, quantity: qte});
    }

    return (
        <>
            <div className='d-flex my-4'>
                <div className='d-flex me-4'>
                    <Button disabled={addPanier.isLoading?true:false} variant="primary" className='rounded-0 fw-bold fs-3 py-0' style={{cursor: 'pointer'}} onClick={handleMoinsQte}>-</Button>
                    <Form.Control disabled={addPanier.isLoading?true:false} className='rounded-0' style={{width: '55px', textAlign: 'center'}} type="number" id="panier" aria-describedby="qteHelpBlock" value={qte} onChange={handleChange} onBlur={handleFocusOut}/>
                    <Button disabled={addPanier.isLoading?true:false} variant="primary" className='rounded-0 fw-bold fs-3 py-0' style={{cursor: 'pointer'}} onClick={handlePlusQte}>+</Button>
                </div>
                <Button disabled={addPanier.isLoading?true:false} onClick={handleAddPanier} variant="primary" className='rounded-0 ' style={{cursor: 'pointer'}}>
                    <div className={addPanier.isLoading?'d-block':'d-none'}><Spinner variant='dark' as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Ajout en cours...</div>
                    <div className={addPanier.isLoading?'d-none':'d-block'}><BsCart4 className=' me-3 text-dark' style={{fontSize:"25px"}} />Ajouter au panier</div>
                </Button>
            </div>

            <Alerts Etat={Alert.Etat} Type={Alert.Type} Titre={Alert.Titre}  Message={Alert.Message} onFermer= {onFermerAlert}/>
        </>
    )
}
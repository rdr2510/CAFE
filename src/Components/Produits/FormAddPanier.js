import {Form, Button} from 'react-bootstrap';
import { BsCart4 } from "react-icons/bs";
import './Styles/formaddpanier.css';
import { useState } from 'react';
import { AddPanier, GetPaniers } from "../../Backends/Carts";
import { Alerts } from '../Communs/Alerts';

export default function FormAddPanier({id, name, onPanier}){
    const [qte, setQte] = useState(1);
    const [qt, setQt] = useState(1);
    const [Alert, setAlert]=useState({Etat: false, Titre: '', Type: '', Message: ''});


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
        const addPanier= AddPanier(id, qte);
        if (addPanier.isError){
            setAlert({Etat: true, Titre: 'PANIER - Error add products', Type: 'ERROR', Message: addPanier.error.message});
        } else if (addPanier.isSuccess){
            setAlert({Etat: true, Titre: 'PANIER - Ajout panier', Type: 'SUCCESS', Message: 'Ajout de produit dans le panier avec succés !  Produit: '+name+' - Quantité: '+qte});
            const getPaniers= GetPaniers();
            if (getPaniers.isError){
                setAlert({Etat: true, Titre: 'PANIER - Error list carts', Type: 'ERROR', Message: getPaniers.error.message});
            } else if (getPaniers.isSuccess){
                onPanier(getPaniers.data.length);
            }
        }
    }

    return (
        <>
            <div className='d-flex my-4'>
                <div className='d-flex me-4'>
                    <Button variant="primary" className='rounded-0 fw-bold fs-3 py-0' style={{cursor: 'pointer'}} onClick={handleMoinsQte}>-</Button>
                    <Form.Control className='rounded-0' style={{width: '55px', textAlign: 'center'}} type="number" id="panier" aria-describedby="qteHelpBlock" value={qte} onChange={handleChange} onBlur={handleFocusOut}/>
                    <Button variant="primary" className='rounded-0 fw-bold fs-3 py-0' style={{cursor: 'pointer'}} onClick={handlePlusQte}>+</Button>
                </div>
                <Button onClick={handleAddPanier} variant="primary" className='rounded-0 ' style={{cursor: 'pointer'}}><BsCart4 className=' me-3 text-dark' style={{fontSize:"25px"}} />Ajouter au panier</Button>
            </div>

            <Alerts Etat={Alert.Etat} Type={Alert.Type} Titre={Alert.Titre}  Message={Alert.Message} onFermer= {onFermerAlert}/>
        </>
    )
}
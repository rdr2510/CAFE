import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import {GetProduits} from '../../Backends/Produits';
import { Alerts } from '../Communs/Alerts';
import { RiMoneyDollarCircleFill } from "react-icons/ri";

export default function FiltrePrix({onFilter}) {

    const [prix, setPrix] =  useState({min:0, max:0});
    const [checkAllPrix, setcheckAllPrix] =  useState(true);
    const [filter, setFilter]= useState({min:0, max:0});
    const [prods, setProds] =  useState([]);
    const [Alert, setAlert]= useState({Etat: false, Titre: '', Type: '', Message: ''});
    const produits = GetProduits();

    if (produits.isError){
        setAlert({Etat: true, Titre: 'FILTRE CATÉGORIES - Error list all products', Type: 'ERROR', Message: produits.error.message});
    }

    if (produits.isSuccess){
        setProds(produits.data);
    }

    function onFermerAlert(){
        setAlert({Etat: false});
    }

    function maxPrix(produit){
        let maxPrix= [];
        for (const item of produit){
            if (maxPrix < item.price){
                maxPrix= item.price;
            }
        }
        return maxPrix;
    }

    function handleAllFilter(event){
        setcheckAllPrix(event.target.checked); 
        if (event.target.checked){
            onFilter({min:0, max:0});
        } else {
           onFilter(filter);
        }
    }

    function handleMinFilter(event){
        let p= parseInt(event.target.value, 10);
        prix.min= p;
        setFilter(prix);
        onFilter(prix);
    }

    const handleMaxFilter= function(event){
        let p= parseInt(event.target.value, 10);
        prix.max= p;
        setPrix(prix);
        onFilter(prix);
    }

    return (
        <div className='my-5'>
            <h4 className='text-nowrap my-0'><RiMoneyDollarCircleFill className='me-2'/>FILTRAGE PAR PRIX</h4>
            <div className='border'>
                <Form.Check className='fw-bold ms-3 my-3' type='checkbox' id= 'id-prix' label= 'Toutes les prix' defaultChecked= {checkAllPrix} onChange={(event)=>{handleAllFilter(event)}}/>
                <div className='px-3 pt-2'>
                    <Form.Label>Prix Minimum: {new Intl.NumberFormat().format(prix.min)} $</Form.Label>
                    <div className='d-flex'>
                        <Form.Label className='me-2'>{1}</Form.Label>
                        <Form.Range disabled= {checkAllPrix} min={1} max={maxPrix(prods) + maxPrix(prods) * 2 / 100 } defaultValue={prix.min} step="10" onChange={handleMinFilter}/>
                        <Form.Label className='ms-2 text-nowrap'>{new Intl.NumberFormat().format(maxPrix(prods))} $</Form.Label>
                    </div>
                </div>
                <div className='px-3 pt-2'>
                    <Form.Label>Prix Maximum: {new Intl.NumberFormat().format(prix.max)} $</Form.Label>
                    <div className='d-flex'>
                        <Form.Label className='me-2'>{1}</Form.Label>
                        <Form.Range disabled= {checkAllPrix} min={1} max={maxPrix(prods) + maxPrix(prods) * 2 / 100} defaultValue={prix.max} step="10" onChange={handleMaxFilter}/>
                        <Form.Label className='ms-2 text-nowrap'>{new Intl.NumberFormat().format(maxPrix(prods))} $</Form.Label>
                    </div>
                </div>
            </div>
            <Alerts Etat={Alert.Etat} Type={Alert.Type} Titre={Alert.Titre}  Message={Alert.Message} onFermer= {onFermerAlert}/>
        </div>
    );
}
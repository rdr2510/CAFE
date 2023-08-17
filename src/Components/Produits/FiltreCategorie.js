import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { BiCategoryAlt } from "react-icons/bi";
import Produits from '../../Backends/Produits';
import { Alerts } from '../Communs/Alerts';

export default function FiltreCategorie({filterManual, onFilter}) {
    const urlBase= 'https://insta-api-api.0vxq7h.easypanel.host/';

    const [prods, setProds] =  useState([]);
    const [Alert, setAlert]= useState({Etat: false, Titre: '', Type: '', Message: ''});
    const [checkAllCat, setcheckAllCat] =  useState(true);
    const [filter, setFilter]= useState([]);

    useEffect(()=>{
        const produits= new Produits(urlBase);
        produits.getProducts().then(p=>{
            setProds(p);
        }).catch(error=>{
            setAlert({Etat: true, Titre: 'FILTRE CATÉGORIES - Error list all products', Type: 'ERROR', Message: error.message});
            console.log(error);
        });
    }, []);

    function Categorie(produit){
        let category= [];
        for (const item of produit){
            const isExist = (element) => element.id === item.category.id;
            const index= category.findIndex(isExist);
            if (index === -1){
                category.push({id: item.category.id, name: item.category.name, totalProduit: 1});
            } else {
                category[index].totalProduit= category[index].totalProduit + 1; 
            }
        }
        return category;
    }

    function onFermerAlert(){
        setAlert({Etat: false});
    }

    function handleFilter(event, id){
        const isExist = (element) => element === id;
        const index= filter.findIndex(isExist);
        if (index === -1){
            filter.push(id); 
        } else {
            filter.splice(index, 1);
        }
        onFilter(filter);
    }

    function handleAllFilter(event){
        setcheckAllCat(event.target.checked); 
        if (event.target.checked){
            onFilter([]);
        } else {
            onFilter(filter);
        }
    }

    return (
        <>
            <div className='mb-5'>
                <h4 className='text-nowrap my-0'><BiCategoryAlt className='me-2'/>FILTRAGE PAR CATÉGORIES - {filterManual}</h4>
                <div className='px-3 border d-flex align-items-start'>
                    <Form className='d-flex flex-column w-100'>
                        <Form.Check className='fw-bold my-3' type='checkbox' defaultChecked={checkAllCat} id= 'id-categorie' label= 'Toutes les catégories'  onChange={(event)=>{handleAllFilter(event)}}/>
                        {Categorie(prods).map(item=>(    
                            <div key={item.id} className='d-flex my-1'>
                                <Form.Check disabled={checkAllCat} type='checkbox' id={`id-${item.id}`} label= {item.name} onChange={(event)=>{handleFilter(event, item.id)}}/>
                                <div className='d-flex justify-content-end w-100'>
                                    <span className='ms-xs-0 ms-5'>({item.totalProduit}) Produits</span>
                                </div>
                            </div>
                        ))}    
                    </Form>
                </div>
            </div>
            
            <Alerts Etat={Alert.Etat} Type={Alert.Type} Titre={Alert.Titre}  Message={Alert.Message} onFermer= {onFermerAlert}/>
        </>
    );
}
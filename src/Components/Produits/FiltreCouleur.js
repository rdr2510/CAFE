import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { IoIosColorPalette } from "react-icons/io";
import Produits from '../../Backends/Produits';
import { Alerts } from '../Communs/Alerts';

export default function FiltreCouleur({onFilter}) {
    const urlBase= 'https://insta-api-api.0vxq7h.easypanel.host/';

    const [prods, setProds] =  useState([]);
    const [Alert, setAlert]= useState({Etat: false, Titre: '', Type: '', Message: ''});
    const [checkAllColor, setcheckAllColor] =  useState(true);
    const [filter]= useState([]);

    useEffect(()=>{
        const produits= new Produits(urlBase);
        produits.getProducts().then(p=>{
            setProds(p);
        }).catch(error=>{
            setAlert({Etat: true, Titre: 'FILTRE COULEUR - Error list all products', Type: 'ERROR', Message: error.message});
            console.log(error);
        });
    }, []);

    function Couleur(produit){
        let colors= [];
        for (const item of produit){
            const isExist = (element) => element.id === item.color.id;
            const index= colors.findIndex(isExist);
            if (index === -1){
                colors.push({id: item.color.id, name: item.color.name, code: item.color.hexCode, totalProduit: 1});
            } else {
                colors[index].totalProduit= colors[index].totalProduit + 1; 
            }
        }
        return colors;
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
        setcheckAllColor(event.target.checked); 
        if (event.target.checked){
            onFilter([]);
        } else {
            onFilter(filter);
        }
    }

    return (
        <>
            <div className='my-5'>
                <h4 className='text-nowrap my-0'><IoIosColorPalette className='me-2'/>FILTRAGE PAR COULEUR</h4>
                <div className='px-3 border d-flex align-items-start'>
                    <Form className='d-flex flex-column w-100'>
                        <Form.Check className='fw-bold my-3' type='checkbox' id= 'id-couleur' label= 'Toutes les couleurs' defaultChecked= {checkAllColor} onChange={(event)=>{handleAllFilter(event)}}/>
                        {Couleur(prods).map(item=>(    
                            <div key={item.id} className='d-flex my-1'>
                                <Form.Check disabled={checkAllColor} type='checkbox' id={`id-${item.id}`} label= {<span style={{color: item.code}}>{item.name}</span>} onChange={(event)=>{handleFilter(event, item.id)}} />
                                <div className='d-flex justify-content-between w-100'>
                                    <span className='px-2 ms-2' style={{border: '1px solid', color: item.code, backgroundColor: item.code}}>C</span>
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
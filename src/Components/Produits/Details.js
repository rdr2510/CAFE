import { Alerts } from '../../Components/Communs/Alerts';
import { useState } from 'react';
import {GetProduit} from '../../Backends/Produits';
import { AddWishList, GetWishLists } from '../../Backends/Wishlist';
import FormAddPanier from './FormAddPanier';
import DetailDescription from './DetailDescription';
import { Button } from 'react-bootstrap';
import { GiHearts } from "react-icons/gi";

export default function Detail({id, WishList, onPanier, onWishList}){
    const [prod, setProd] =  useState();
    const [Alert, setAlert]=useState({Etat: false, Titre: '', Type: '', Message: ''});
    const produit = GetProduit(id);

    if (produit.isError){
        setAlert({Etat: true, Titre: 'PRODUITS DETAIL - Error get detail product', Type: 'ERROR', Message: produit.error.message});
    }

    if (produit.isSuccess){
        setProd(produit.data);
    }

    function onFermerAlert(){
        setAlert({Etat: false});
    }

    function handleWishlist(article){
        const addWishlist= AddWishList(article.id);
        if (addWishlist.isError){
            setAlert({Etat: true, Titre: 'ADD WISHLIST - Error add wishlist', Type: 'ERROR', Message: addWishlist.error.message});
        } else if (addWishlist.isSuccess){
            setAlert({Etat: true, Titre: 'WISHLIST - Ajout liste a souhait', Type: 'SUCCESS', Message: 'Ajout de produit dans la liste a souhait avec succés !  Produit: '+article.name}); 
            const getWishLists= GetWishLists();
            if (getWishLists.isError){
                setAlert({Etat: true, Titre: 'WISHLIST - Error list wishlist', Type: 'ERROR', Message: getWishLists.error.message});
            } else if (getWishLists.isSuccess){
                onWishList(getWishLists.data);
            }
        }
    }

    function isExistWishlist(item){
        const isExist = (element) => element.id === item.id;
        const index= WishList.findIndex(isExist);
        if (index===-1){
            return false;
        } else {
            return true;
        }
    }

    return (
        <>
            <div style={{height: '100%'}} className='mx-4'>
                <div className='d-flex mb-4'>
                    <div className='border me-2 px-0 py-0'>
                        <img src={prod?prod.image:''} alt="" style={{width: '40rem'}} className='py-0 px-0'/>
                    </div>
                    <div className='border ms-2 px-5 py-4 w-100'>
                        <h1 className='mb-4'>{prod?prod.name:''}</h1>
                        <h3 className='fw-bold'>{new Intl.NumberFormat().format(prod?prod.price:0)} $</h3>
                        <p className='my-4'>{prod?prod.description:''}</p>
                        <p><span className='fw-bold'>Catégorie: </span><span>{prod?prod.category.name:''}</span></p>
                        <p><span className='fw-bold'>Couleur: </span><span style={{color: prod?prod.color.hexCode:''}}>{prod?prod.color.name:''}</span> <span className='px-2 ms-2' style={{border: '1px solid', color: prod?prod.color.hexCode:'', backgroundColor: prod?prod.color.hexCode:''}}>C</span></p>
                        <FormAddPanier id={id} name={prod?prod.name:''} onPanier={onPanier}/>   
                        <div>
                            <Button disabled={prod?isExistWishlist(prod)?true:false:false} onClick={()=>{handleWishlist(prod)}}><GiHearts className="mx-1 text-danger" style={{fontSize:'25px'}} />Enregistrer au liste</Button>
                        </div>                 
                  </div>
                </div>
                <DetailDescription />
            </div>

            <Alerts Etat={Alert.Etat} Type={Alert.Type} Titre={Alert.Titre}  Message={Alert.Message} onFermer= {onFermerAlert}/>
        </>
    );
}
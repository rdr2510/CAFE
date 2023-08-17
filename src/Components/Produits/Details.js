import { Alerts } from '../../Components/Communs/Alerts';
import { useEffect, useState } from 'react';
import Produits from '../../Backends/Produits';
import WishLists from '../../Backends/Wishlist';
import FormAddPanier from './FormAddPanier';
import DetailDescription from './DetailDescription';
import { Button } from 'react-bootstrap';
import { GiHearts } from "react-icons/gi";

export default function Detail({id, WishList, onPanier, onWishList}){

    const [prod, setProd] =  useState();

    const urlBase= 'https://insta-api-api.0vxq7h.easypanel.host/';

    const [Alert, setAlert]=useState({Etat: false, Titre: '', Type: '', Message: ''});

    useEffect(()=>{
        const produits= new Produits(urlBase);
        produits.getProduct(id).then(p=>{
            setProd(p);
        }).catch(error=>{
            setAlert({Etat: true, Titre: 'PRODUITS DETAIL - Error get detail product', Type: 'ERROR', Message: error.message});
            console.log(error);
        });
    }, [prod, id]);

    function onFermerAlert(){
        setAlert({Etat: false});
    }

    function handleWishlist(article){
        const wishlists= new WishLists(urlBase);
        wishlists.add(id).then(()=>{
            setAlert({Etat: true, Titre: 'WISHLIST - Ajout liste a souhait', Type: 'SUCCESS', Message: 'Ajout de produit dans la liste a souhait avec succés !  Produit: '+article.name}); 
            wishlists.getAll().then((p)=>{
                onWishList(p);
            }).catch(error=>{
                setAlert({Etat: true, Titre: 'WISHLIST - Error list wishlist', Type: 'ERROR', Message: error.message});
            });
        }).catch(error=>{
            setAlert({Etat: true, Titre: 'ADD WISHLIST - Error add wishlist', Type: 'ERROR', Message: error.message});
            console.log(error);
        });
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
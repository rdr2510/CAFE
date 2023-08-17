import Navigation from "../Components/Produits/Navigation";
import { Alerts } from '../Components/Communs/Alerts';
import { useParams } from 'react-router';
import { useState } from 'react';
import Detail from "../Components/Produits/Details";

export default function ProductDetail({WishList, onPanier, onWishList}){
    const {id} = useParams();

    const [Alert, setAlert]= useState({Etat: false, Titre: '', Type: '', Message: ''});

    function onFermerAlert(){
        setAlert({Etat: false});
    }

    return (
        <>
            <div style={{height: '100%'}}>
                <div style={{height: 'calc(100vh - 200px)', overflowY: 'scroll', overflowX: 'hidden'}}>
                    <Navigation nav={['accueil', 'produits', 'detail']}/>
                    <Detail id={id} WishList={WishList} onPanier={onPanier} onWishList={onWishList}/>
                </div>
            </div>

            <Alerts Etat={Alert.Etat} Type={Alert.Type} Titre={Alert.Titre}  Message={Alert.Message} onFermer= {onFermerAlert}/>
        </>
    );
}
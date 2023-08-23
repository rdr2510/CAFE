import Navigation from "../Components/Produits/Navigation";
import { Alerts } from '../Components/Communs/Alerts';
import { useParams } from 'react-router';
import { useState, useContext, useEffect } from 'react';
import Detail from "../Components/Produits/Details";
import { ProductContext, PromotionContext } from '../App';

export default function ProductDetail(){
    const [prod, setProd]= useState({});
    const {id} = useParams();
    const [Alert, setAlert]= useState({Etat: false, Titre: '', Type: '', Message: ''});
    const getProduits = useContext(ProductContext);
    const getPromotions= useContext(PromotionContext);

    useEffect(()=>{
        const isExist = (element) => element.id === parseInt(id);
        let a= getProduits.data;
        const index= a.findIndex(isExist);
        if (index!==-1){
            const isExist1 = (element) => (element.productId === a[index].id);
            const index1= getPromotions.data.findIndex(isExist1);
            prod.data= a[index];
            if (index1 !==-1){
                prod.promotion= getPromotions.data[index1].discountPercent*100;    
            } else {
                prod.promotion= 0;
            }
        }
        setProd(prod);

    }, [prod, id, getProduits, getPromotions])

    function onFermerAlert(){
        setAlert({Etat: false});
    }

    return (
        <>
            <div style={{height: '100%'}}>
                <div style={{height: 'calc(100vh - 200px)', overflowY: 'scroll', overflowX: 'hidden'}}>
                    <Navigation nav={['accueil', 'produits', 'detail']}/>
                    <Detail prod={prod} />
                </div>
            </div>

            <Alerts Etat={Alert.Etat} Type={Alert.Type} Titre={Alert.Titre}  Message={Alert.Message} onFermer= {onFermerAlert}/>
        </>
    );
}
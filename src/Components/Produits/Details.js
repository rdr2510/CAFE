import { Alerts } from '../../Components/Communs/Alerts';
import { useState, useEffect, useContext, useRef } from 'react';
import { AddWishList} from '../../Backends/Wishlist';
import FormAddPanier from './FormAddPanier';
import DetailDescription from './DetailDescription';
import { Badge, Button, Spinner } from 'react-bootstrap';
import { GiHearts } from "react-icons/gi";
import { WishContext } from '../../App';

export default function Detail({prod}){
    const [Alert, setAlert]=useState({Etat: false, Titre: '', Type: '', Message: ''});
    const getWishLists = useContext(WishContext);
    const [, setState] = useState(false);
    const count= useRef(0);

    const addWishlist= AddWishList();

    useEffect(()=>{
        if (addWishlist.isError){
            setAlert({Etat: true, Titre: 'ADD WISHLIST - Error add wishlist', Type: 'ERROR', Message: addWishlist.error.message});
            addWishlist.reset();
        } else if (addWishlist.isSuccess){
            setAlert({Etat: true, Titre: 'WISHLIST - Ajout liste a souhait', Type: 'SUCCESS', Message: 'Ajout de produit dans la liste a souhait avec succés !  Produit: '+prod.data.name}); 
            addWishlist.reset();
            getWishLists.refetch();
        }

        if (count.current<2){
            count.current= count.current + 1;
            setState((prev) => !prev);
        }
    }, [prod, addWishlist, getWishLists])


    function onFermerAlert(){
        setAlert({Etat: false});
    }

    function handleWishlist(article){
        addWishlist.mutate({productId: article.data.id});
    }

    function isExistWishlist(item){
        const isExist = (element) => element.id === item.data.id;
        const index= getWishLists.data.findIndex(isExist);
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
                        <div className='border me-2 px-0 py-0' style={{position: 'relative'}}>
                            <div className={prod.promotion?'d-block w-100':'d-none'} style={{position: 'absolute'}}>
                                <Badge bg='danger' className='fs-2'>Rabais {prod.promotion?prod.promotion:0}%</Badge>
                            </div>
                            <img src={prod.data?prod.data.image:''} alt="" style={{width: '40rem'}} className='py-0 px-0'/>
                        </div>

                        <div className='border ms-2 px-5 py-4 w-100'>
                            <h1 className='mb-4'>{prod.data?prod.data.name:''}</h1>
                            <h3 className='fw-bold'>{new Intl.NumberFormat().format(prod.data?prod.data.price:'')} $</h3>
                            <p className='my-4'>{prod.data?prod.data.description:''}</p>
                            <p><span className='fw-bold'>Catégorie: </span><span>{prod.data?prod.data.category.name:''}</span></p>
                            <p><span className='fw-bold'>Couleur: </span><span style={{color: prod.data?prod.data.color.hexCode:''}}>{prod.data?prod.data.color.name:''}</span> <span className='px-2 ms-2' style={{border: '1px solid', color: prod.data?prod.data.color.hexCode:'', backgroundColor: prod.data?prod.data.color.hexCode:''}}>C</span></p>
                            <FormAddPanier id={prod.data?prod.data.id:0} name={prod.data?prod.data.name:''}/>   
                            <div>
                                <Button disabled={addWishlist.isLoading?true:prod.data?isExistWishlist(prod)?true:false:false} onClick={()=>{handleWishlist(prod)}}>
                                    <div className={addWishlist.isLoading?'d-block':'d-none'}><Spinner variant='dark' as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Ajout en cours...</div>
                                    <div className={addWishlist.isLoading?'d-none':'d-block'}><GiHearts className="mx-1 text-danger" style={{fontSize:'25px'}} />Enregistrer au liste</div>
                                </Button>
                            </div>                 
                        </div>
                    </div>
                    <DetailDescription id={prod.data?prod.data.id:0}/>
                </div>

                <Alerts Etat={Alert.Etat} Type={Alert.Type} Titre={Alert.Titre}  Message={Alert.Message} onFermer= {onFermerAlert}/>
            </>
        );
    
}
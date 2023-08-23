import './Styles/categories.css';
import { Alerts } from '../Communs/Alerts';
import { useState, useContext } from 'react';
import { BiCategoryAlt } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import { CategorieContext } from '../../App';

export default function Categories(){
    const [Alert, setAlert]=useState({Etat: false, Titre: '', Type: '', Message: ''});
    const navigate= useNavigate();
    const getCategories = useContext(CategorieContext);

    
    function onFermerAlert(){
        setAlert({Etat: false});
    }

    return(
        <>
            <div className='mx-5 my-5 pb-4'>
                <h2 className='w-100 py-0 ps-2 text-primary' style={{borderBottomLeftRadius: '20px', borderBottom: '2px solid var(--bs-primary)', borderLeft: '2px solid var(--bs-primary)'}}><BiCategoryAlt className="me-2 mb-2 text-dark" style={{fontSize:'40px'}}/>CATÉGORIES</h2>
                <div className='d-flex justify-content-between align-items-center flex-wrap flex-column flex-lg-row my-4' style={{width: '100%'}}>
                    {getCategories.data.map(item=>(
                        <div onClick={()=>{navigate('/Products/false/'+item.id+'/false')}} key={item.id} className='bouton d-flex align-items-center border-top border-start border-3 border-primary rounded-4 my-2' style={{cursor: 'pointer'}}>
                            <div><img src={item.image} alt="" style={{height: '95px', objectFit: 'contain'}} /></div>
                            <div className='btnText d-flex align-items-center flex-column py-4'>
                                <h5 className='btnTextCat my-0 text-center'>{item.name}</h5>
                                <p className='btnTextProd my-0 w-100 text-center'>({item.produits.length}) Produits</p>
                            </div>
                        </div>    
                    ))}
                </div>
            </div>

            <Alerts Etat={Alert.Etat} Type={Alert.Type} Titre={Alert.Titre}  Message={Alert.Message} onFermer= {onFermerAlert}/>
        </>
    )
}
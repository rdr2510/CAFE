import Form from 'react-bootstrap/Form';
import { useState, useEffect, useContext, useRef} from 'react';
import { BiCategoryAlt } from "react-icons/bi";
import { Alerts } from '../Communs/Alerts';
import { CategorieContext } from '../../App';
import { useNavigate } from "react-router-dom";


export default function FiltreCategorie({FilterId, filterAll, onFilter}) {
    const [Alert, setAlert]= useState({Etat: false, Titre: '', Type: '', Message: ''});
    const [checkAllCat, setcheckAllCat] =  useState(true);
    const [filter, setFilter]= useState([]);
    const getCategories = useContext(CategorieContext);
    const navigate= useNavigate();
    const [, setState] = useState(false);
    const Categories= useRef([]);

    useEffect(()=>{
        if (FilterId !==-1){
            ActiveFiltre();
        }
        if (filterAll){
            setcheckAllCat(true);
            filter.splice(0, filter.length);
            setFilter(filter);
            for (const item of Categories.current){
                item.checked= false;
            }
        }
        upDateCategorie();
    }, [FilterId, filterAll]);
    

    function onFermerAlert(){
        setAlert({Etat: false});
    }

    function upDateCategorie(){
        for (const item of getCategories.data){
            const isExist = (element) => (element.id === item.id);
            const index= Categories.current.findIndex(isExist);
            if (index === -1){
                Categories.current.push({id: item.id, name: item.name, description: item.description, checked: item.checked, produits: item.produits.slice(0)});
            } else {
                for (const item1 of item.produits){
                    const isExist1 = (element) => (element === item1);
                    const index1= Categories.current[index].produits.findIndex(isExist1);
                    if (index1 === -1){
                        Categories.current[index].produits.push(item1);
                    }
                }
            }
        }
    }

    function ActiveFiltre(){
        setcheckAllCat(false);
        filter.splice(0, filter.length);
        setFilter(filter);
        for (const item of Categories.current){
            if (item.id === FilterId){
                item.checked= true;
                filter.push(item.id);
            } else item.checked= false;
        }
        setFilter(filter);
        setState((prev) => !prev);
    }

    function handleFilter(event, item, index){
        navigate('/Products/false/false/false');
        const isExist = (element) => element === item.id;
        const Index= filter.findIndex(isExist);
        if (Index === -1){
            filter.push(item.id); 
            item.checked= true;
        } else {
            filter.splice(Index, 1);
            item.checked= false;
        }
        setFilter(filter);
        onFilter(filter, true);
        //setState((prev) => !prev);
    }

    function handleAllFilter(event){
        setcheckAllCat(event.target.checked); 
        if (event.target.checked){
            onFilter([], true);
        } else {
            onFilter(filter, true);
        }
    }

    return (
        <>
            <div className='mb-5'>
                <h4 className='text-nowrap my-0'><BiCategoryAlt className='me-2'/>FILTRAGE PAR CATÉGORIES</h4>
                <div className='px-3 border d-flex align-items-start'>
                    <Form className='d-flex flex-column w-100'>
                        <Form.Check className='fw-bold my-3' type='checkbox' checked={checkAllCat} id= 'id-categorie' label= 'Toutes les catégories'  onChange={(event)=>{handleAllFilter(event)}}/>
                        {Categories.current.map((item, index)=>(    
                            <div key={index} className='d-flex my-1'>
                                <Form.Check checked={item.checked} disabled={checkAllCat} type='checkbox' id={`id-${item.id}`} label= {item.name} onChange={(event)=>{handleFilter(event, item, index)}}/>
                                <div className='d-flex justify-content-end w-100'>
                                    <span className='ms-xs-0 ms-5'>({item.produits.length}) Produits</span>
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
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from 'react';
import Produits from '../../Backends/Produits';
import { Alerts } from './Alerts';
import './Styles/carousel.css';

export default function Slider(){
    const urlBase= 'https://insta-api-api.0vxq7h.easypanel.host/';

    const [prods, setProds] =  useState([]);
    const [Alert, setAlert]=useState({Etat: false, Titre: '', Type: '', Message: ''});

    useEffect(()=>{
        const produits= new Produits(urlBase);
        produits.getProducts().then(p=>{
            setProds(p);
        }).catch(error=>{
            setAlert({Etat: true, Titre: 'Error list all products', Type: 'ERROR', Message: error.message});
            console.log(error);
        });
    }, []);

    function onFermerAlert(){
        setAlert({Etat: false});
    }

    return(
        <>
            <Carousel interval={2000} style={{height: '200px'}} ride= 'true' wrap= {true}>
                {prods.map(item=>(
                    <Carousel.Item key={item.id} className='bg-primary text-center text-lg-start'>
                        <img className='ms-lg-4' src={item.image} alt='' style={{objectFit: 'contain', height: '200px'}}/>
                        <Carousel.Caption>
                            <h1 className='text-dark fw-bold'>{item.name}</h1>
                            <p className='fs-1 description' style={{color: item.color.hexCode, fontFamily: 'Brush Script MT, Brush Script Std, cursive', display: '-webkit-box', maxWidth: '100%', height: '50px', overflow:' hidden'}}>{item.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel> 

            <Alerts Etat={Alert.Etat} Type={Alert.Type} Titre={Alert.Titre}  Message={Alert.Message} onFermer= {onFermerAlert}/>
        </>
    )
}


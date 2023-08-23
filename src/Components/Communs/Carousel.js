import Carousel from 'react-bootstrap/Carousel';
import { useState, useContext } from 'react';
import { Alerts } from './Alerts';
import './Styles/carousel.css';
import { ProductContext } from '../../App';

export default function Slider(){
    const [Alert, setAlert]= useState({Etat: false, Titre: '', Type: '', Message: ''});
    const getProduits = useContext(ProductContext);

    function onFermerAlert(){
        setAlert({Etat: false});
    }

    return(
        <>
            <Carousel interval={2000} style={{height: '200px'}} ride= 'true' wrap= {true}>
                {getProduits.data.map(item=>(
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


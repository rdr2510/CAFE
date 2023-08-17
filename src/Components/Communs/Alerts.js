import { useEffect, useState } from 'react';
import {Toast} from 'react-bootstrap';

export function Alerts({Etat, Type, Titre, Message, onFermer}) {
    const initCompteur= 10000;
    const [Compteur, setCompteur]= useState(initCompteur/1000);   
    const [bgAlert, setbgAlert]= useState('bg-info') ;
    const [textAlert, setTextAlert]= useState('text-info') ;
    const [iconAlert, setIconAlert]= useState('') ;

    
    useEffect(()=>{
        let Timer;
        
        switch(Type){
            case 'SUCCESS':
                setbgAlert('bg-success');
                setTextAlert('text-success');
                setIconAlert('bi bi-check-circle fs-3 text-light');
                break;
            case 'ERROR':
                setbgAlert('bg-danger');
                setTextAlert('text-danger');
                setIconAlert('bi bi-exclamation-circle fs-3 text-light');
                break;
            case 'WARNING':
                setbgAlert('bg-warning');
                setTextAlert('text-warning');
                setIconAlert('bi bi-exclamation-triangle fs-3 text-light');
                break;
            case 'INFO':
                setbgAlert('bg-info');
                setTextAlert('text-info');
                setIconAlert('bi bi-info-circle fs-3 text-light');
                break;
            default:
                break;
        }
        
        if (Etat){
            Timer= setInterval(() => {
                let a= Compteur;
                --a;
                setCompteur(a);
            }, 1000); 
            
            return()=>{
                clearInterval(Timer);
            }          
        }

        return()=>{
            setCompteur(initCompteur/1000);
        }

    }, [Type, Etat, Compteur]);

    return (
        
        <Toast onClose={onFermer} show={Etat} delay={initCompteur} autohide className="mb-5 mx-2 position-absolute bottom-0 end-0 z-3">
            <Toast.Header className={bgAlert}>
                <i className={iconAlert}></i>
                <strong className="me-auto px-3 text-light">{Titre}</strong>
                <small className='text-light'>{Compteur} Seconde(s)</small>
            </Toast.Header>
            <Toast.Body className={textAlert}>{Message}</Toast.Body>
        </Toast>        
                        
    );
}
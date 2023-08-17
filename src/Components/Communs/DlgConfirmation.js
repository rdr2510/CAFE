import { useEffect, useState } from "react";
import {Modal, Button} from 'react-bootstrap';

export function ModalConfirmation({Action, Titre, Message, TextBtnConfirmer, TextBtnAnnuler='Annuler', Etat, Type, AutoFermer=false, onConfirmer, onAnnuler}) {
    const initCompteur= 10000;
    const [Compteur, setCompteur]= useState(initCompteur/1000);   
    const [bgAlert, setbgAlert]= useState('bg-info') ;
    const [textAlert, setTextAlert]= useState('text-info') ;
    const [iconAlert, setIconAlert]= useState('') ;


    useEffect(()=>{
        if (Etat && AutoFermer){
            const Timer= setInterval(() => {
                let a= Compteur;
                --a;
                setCompteur(a);
                if (a===0){
                    onConfirmer();
                }
            }, 1000);           
            return()=>{
                clearInterval(Timer);
            }
        }

        switch(Type){
            case 'SUCCESS':
                setbgAlert('bg-success text-light');
                setTextAlert('text-success');
                setIconAlert('bi bi-check-circle fs-3 text-light');
                break;
            case 'ERROR':
                setbgAlert('bg-danger text-light');
                setTextAlert('text-danger');
                setIconAlert('bi bi-exclamation-circle fs-3 text-light');
                break;
            case 'WARNING':
                setbgAlert('bg-warning text-light');
                setTextAlert('text-warning');
                setIconAlert('bi bi-exclamation-triangle fs-3 text-light');
                break;
            case 'INFO':
                setbgAlert('bg-info text-light');
                setTextAlert('text-info');
                setIconAlert('bi bi-info-circle fs-3 text-light');
                break;
            default:
                break;
        }

        return()=>setCompteur(initCompteur/1000);
    }, [Type, Etat, Compteur, AutoFermer, onConfirmer]);
    
    return (
        <>
            <Modal show={Etat} onHide={onAnnuler} backdrop="static" keyboard={false}>
                <Modal.Header className={bgAlert} closeButton>
                    <Modal.Title><h4><i className={iconAlert}></i><span className='mx-3'>{Titre}</span></h4></Modal.Title>
                </Modal.Header>
                <Modal.Body className={textAlert}>{Message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{onAnnuler(Action)}}>{TextBtnAnnuler}</Button>
                    <Button className={bgAlert} onClick={()=>{onConfirmer(Action)}}>{AutoFermer?'('+Compteur+'s)':''} {TextBtnConfirmer}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
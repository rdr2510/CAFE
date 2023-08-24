import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {  IoArrowBackSharp } from "react-icons/io5";
import {  BsCartCheckFill } from "react-icons/bs";
import { AddCheckout } from "../../Backends/Checkout";
import { useState, useEffect} from "react";
import { Alerts } from '../../Components/Communs/Alerts';

export default function ValidCheck({formCheckOut}){
    const navigate= useNavigate();
    const addCheckout= AddCheckout();
    const [Alert, setAlert]=useState({Etat: false, Titre: '', Type: '', Message: ''});

    useEffect(()=>{
        if (addCheckout.isError){
            setAlert({Etat: true, Titre: 'PANIER - Update item', Type: 'ERROR', Message: addCheckout.error.message});
            addCheckout.reset();
        } else if (addCheckout.isSuccess){
            navigate('/Confirmation');
        }
    }, [addCheckout]);

    function onFermerAlert(){
        setAlert({Etat: false});
    }

    function handleClickTerminer(){
        addCheckout.mutate(formCheckOut);
    }

    return(
        <div style={{height: '100%'}}>
            <div className="d-flex" style={{height: 'calc(100vh - 200px)', overflowY: 'scroll', overflowX: 'hidden'}}>
                <div className="mx-5 w-100 text-center">
                    <div className="border rounded-3 border-primary my-4 text-center py-2">
                        <h3><span className="fw-bold text-dark">Total: </span><span>{new Intl.NumberFormat().format(formCheckOut.total)} $</span></h3>
                    </div>
                    <div className="border rounded-3 border-primary text-center my-4">
                        <h4 className="mt-2 w-100 text-center fw-bold">INFORMATION DE CONTACT</h4>
                        <div className="fs-3 d-flex justify-content-evenly">
                            <div><span className="fw-bold me-2">Nom: </span><span className="text-primary">{formCheckOut.contactName}</span></div>
                            <div><span className="fw-bold me-2">Adresse Email: </span><span className="text-primary">{formCheckOut.contactEmail}</span></div>
                        </div>
                    </div>
                    <div className="border rounded-3 border-primary text-center my-4">
                        <h4 className="mt-2 w-100 text-center fw-bold">ADRESSE</h4>
                        <div className="fs-3 d-flex flex-column justify-content-evenly">
                            <div className="d-flex justify-content-evenly">
                                <div className="d-flex"><span className="fw-bold me-2">Nom: </span><span className="text-primary">{formCheckOut.contactLastName}</span></div>
                                <div className="d-flex"><span className="fw-bold me-2">Prénom: </span><span className="text-primary">{formCheckOut.contactFirstName}</span></div>
                            </div>
                            <div className="d-flex justify-content-evenly">
                                <div className="d-flex"><span className="fw-bold me-2">Adresse 1: </span><span className="text-primary">{formCheckOut.adresseLine1}</span></div>
                                <div className="d-flex"><span className="fw-bold me-2">Adresse 2: </span><span className="text-primary">{formCheckOut.adresseLine2}</span></div>
                            </div>
                            <div className="d-flex justify-content-evenly">
                                <div className="d-flex"><span className="fw-bold me-2">Ville: </span><span className="text-primary">{formCheckOut.city}</span></div>
                                <div className="d-flex"><span className="fw-bold me-2">Code Postal: </span><span className="text-primary">{formCheckOut.postalCode}</span></div>
                            </div>
                            <div className="d-flex justify-content-evenly">
                                <div className="d-flex"><span className="fw-bold me-2">Province: </span><span className="text-primary">{formCheckOut.province}</span></div>
                                <div className="d-flex"><span className="fw-bold me-2">Téléphone: </span><span className="text-primary">{formCheckOut.contactPhone}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-3 border-primary text-center my-4">
                        <h4 className="mt-2 w-100 text-center fw-bold">METHODE DE PAIEMENT</h4>
                        <div className="fs-3 d-flex flex-column justify-content-evenly">
                            <div className="d-flex justify-content-evenly">
                                <div className="d-flex"><span className="fw-bold me-2">Numéro carte de crédit: </span><span className="text-primary">{formCheckOut.creditCardNumber}</span></div>
                            </div>
                            <div className="d-flex justify-content-evenly">
                                <div className="d-flex"><span className="fw-bold me-2">Mois d'éxpiration: </span><span className="text-primary">{formCheckOut.creditCardExpirationMonth}</span></div>
                                <div className="d-flex"><span className="fw-bold me-2">Année d'éxpiration: </span><span className="text-primary">{formCheckOut.creditCardExpirationYear}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-3 border-primary text-center my-4">
                        <h4 className="mt-2 w-100 text-center fw-bold">MODE DE LIVRAISON</h4>
                        <div className="fs-3 d-flex flex-column justify-content-evenly">
                            <div className="d-flex justify-content-center"><span className="fw-bold me-2">Livraison: </span><span className="text-primary">{formCheckOut.shippingMode}</span></div>
                        </div>
                    </div>
                    <div className="mb-5 d-flex justify-content-evenly">
                        <Button className="d-none" variant="secondary" onClick={()=>navigate('/Checkout')}><IoArrowBackSharp className="me-2" style={{fontSize:"25px"}} />Précédent</Button>
                        <Button variant="success" onClick={()=>{handleClickTerminer()}}><BsCartCheckFill className="me-2" style={{fontSize:"25px"}} />Terminer</Button>
                    </div>
                </div>
            </div>
            <Alerts Etat={Alert.Etat} Type={Alert.Type} Titre={Alert.Titre}  Message={Alert.Message} onFermer= {onFermerAlert}/>
        </div>
    )
}
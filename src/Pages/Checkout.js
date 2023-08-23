import { useState, useEffect, useContext, useRef } from "react";
import {Table, Button, Form, Badge, Spinner, FloatingLabel} from 'react-bootstrap';
import {GetCheckouts} from '../Backends/Checkout';
import { Alerts } from '../Components/Communs/Alerts';
import Spinners from "../Components/Communs/Spinners";

export default function Checkout(){
    const getCheckouts= GetCheckouts();
    const [Alert, setAlert]=useState({Etat: false, Titre: '', Type: '', Message: ''});
    const checkouts= useRef({cartId: 0, products: [], subTotal: 0, taxe:0, grandTotal: 0});

    useEffect(()=>{
        if (getCheckouts.isError){
            setAlert({Etat: true, Titre: 'PANIER - Update item', Type: 'ERROR', Message: getCheckouts.error.message});
        } else if (getCheckouts.isSuccess){
            checkouts.current.cartId=  getCheckouts.data.cartId;
            checkouts.current.products=  getCheckouts.data.products.slice(0);
            checkouts.current.subTotal= 0;
            checkouts.current.taxe= 0;
            checkouts.current.grandTotal= 0;
            for (const item of getCheckouts.data.products){
                checkouts.current.subTotal= checkouts.current.subTotal + (item.discountedPrice * item.quantity); 
            }
            checkouts.current.taxe= checkouts.current.subTotal * 14.975 / 100;
            checkouts.current.grandTotal= checkouts.current.subTotal + checkouts.current.taxe;
        }
    }, [getCheckouts, checkouts]);

    function onFermerAlert(){
        setAlert({Etat: false});
    }

    if(getCheckouts.isLoading){
        return <Spinners Message={'Chargement des données en cours..., Veuillez patienter s\'il vous plait.'}/>
    }

    function handleChangeMois(event){
        if (!(1 <= event.target.value && event.target.value <= 12)){
            event.target.value= '';
        }
    }

    function handleChangeAnnee(event){
        if (!(2023 <= event.target.value && event.target.value <= 2030)){
            event.target.value= '';
        }
    }

    return(
        <>
            <div style={{height: '100%'}}>
                <div className="d-flex" style={{height: 'calc(100vh - 200px)', overflowY: 'scroll', overflowX: 'hidden'}}>
                    <div className="w-50 d-flex flex-column align-items-center mx-4">
                        <div className="w-100">
                            <h4 className="mt-5 w-100 text-center">INFORMATION DE CONTACT</h4>
                            <div className="d-flex flex-row w-100">
                                <Form.Group className="mx-2 my-2 w-50" controlId="validationCustom01">
                                    <Form.Control required type="text" placeholder="Nom" />
                                    <Form.Control.Feedback type="invalid">Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mx-2 my-2 w-50" controlId="validationCustom01">
                                    <Form.Control required type="email" placeholder="Adresse Mail" />
                                    <Form.Control.Feedback type="invalid">Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </div>
                        </div>

                        <div className="w-100">
                            <h4 className="mt-5 w-100 text-center">ADRESSE DE LIVRAISON</h4>
                            <div className="d-flex flex-row w-100">
                                <Form.Group className="mx-2 my-2 w-50" controlId="validationCustom01">
                                    <Form.Control required type="text" placeholder="Nom" />
                                    <Form.Control.Feedback type="invalid">Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mx-2 my-2 w-50" controlId="validationCustom01">
                                    <Form.Control required type="text" placeholder="Prénom" />
                                    <Form.Control.Feedback type="invalid">Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="d-flex flex-row w-100">
                                <Form.Group className="mx-2 my-2 w-50" controlId="validationCustom01">
                                    <Form.Control required type="text" placeholder="Adresse 1" />
                                    <Form.Control.Feedback type="invalid">Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mx-2 my-2 w-50" controlId="validationCustom01">
                                    <Form.Control required type="text" placeholder="Adresse 2" />
                                    <Form.Control.Feedback type="invalid">Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="d-flex flex-row w-100">
                                <Form.Group className="mx-2 my-2 w-50" controlId="validationCustom01">
                                    <Form.Control required type="text" placeholder="Ville" />
                                    <Form.Control.Feedback type="invalid">Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <div className="d-flex w-50 mx-2">
                                    <Form.Group className="me-2 my-2 w-50" controlId="validationCustom01">
                                        <Form.Control required type="text" placeholder="Code Postal" />
                                        <Form.Control.Feedback type="invalid">Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="ms-2 my-2 w-50" controlId="validationCustom01">
                                        <Form.Control required type="text" placeholder="Téléphone" />
                                        <Form.Control.Feedback type="invalid">Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                            </div>
                        </div>

                        <div className="w-100">
                            <h4 className="mt-5 w-100 text-center">INFORMATION DE PAIEMENT</h4>
                            <div className="d-flex flex-row w-100">
                                <Form.Group className="mx-2 my-2 w-100" controlId="validationCustom01">
                                    <Form.Control required type="text" placeholder="Numéro carte de crédit" />
                                    <Form.Control.Feedback type="invalid">Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="d-flex flex-row w-100 justify-content-between">
                                <Form.Group className="mx-2 my-2" controlId="validationCustom01">
                                    <Form.Control onBlur={(event)=>{handleChangeMois(event)}} required type="text" pattern="\d*" maxLength="2" max="12" min="1" placeholder="Mois d'expiration" />
                                    <Form.Control.Feedback type="invalid">Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mx-2 my-2" controlId="validationCustom01">
                                    <Form.Control onBlur={(event)=>{handleChangeAnnee(event)}} required type="text" pattern="\d*" maxLength='4' min='2023' placeholder="Année d'éxpiration" />
                                    <Form.Control.Feedback type="invalid">Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mx-2 my-2" controlId="validationCustom01">
                                    <Form.Control required type="text" pattern="\d*" maxLength='3' min='2023' placeholder="CVV" />
                                    <Form.Control.Feedback type="invalid">Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 border-primary' style={{width: '1px', height: '100%', border: '1px solid'}}></div>
                    <div className="w-50 mx-4">
                        <Table hover responsive className="border-dark">
                            <thead>
                                <tr className="border-0">
                                    <th className="text-center border-0" style={{width: '45%'}}></th>
                                    <th className="text-center border-0" style={{width: '5%'}}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {checkouts.current.products.map(item=>(
                                    <tr className="border-0">
                                        <td>
                                            <div className="d-flex">
                                                <div style={{height: '5rem', width: '10rem'}}>
                                                    <img src={item.image} alt="" style={{height: '5rem', width: '10rem', objectFit: 'contain'}}/>
                                                </div>
                                                <div className="d-flex flex-column justify-content-between">
                                                    <div>
                                                        <h5 className="mb-0">{item.name}</h5>
                                                        <span className='description my-0' style={{display: '-webkit-box', width: '100%', height: '25px', overflow:' hidden'}}>
                                                                    {item.description}
                                                        </span>
                                                    </div>
                                                    <div className="d-flex">
                                                        <div className="me-2 d-flex">
                                                            <span className="fw-bold">Couleur: </span><span className="mx-1" style={{color: item.color.hexCode}}>{item.color.name}</span><span className='px-2' style={{width: '15px', height: '20px', border: '1px solid', color: item.color.hexCode, backgroundColor: item.color.hexCode}}>C</span>
                                                        </div>
                                                        <div className="mx-2 d-flex">
                                                            <span className="fw-bold me-1">Qte: </span><span>{item.quantity}</span>
                                                        </div>
                                                        <div className="mx-2 d-flex">
                                                            <span className="fw-bold me-1">Prix: </span><span>{new Intl.NumberFormat().format(item.price)} $</span>
                                                        </div>
                                                        <div className= {(100 - (item.discountedPrice * 100 / item.price))!==0?'mx-2 text-danger d-flex':'d-none'}>
                                                            <span className="fw-bold me-1">Rabais: </span><span>{100 - (item.discountedPrice * 100 / item.price)} %</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <h5 className="d-flex flex-column justify-content-center align-items-center">
                                                <span className="text-dark">Total</span>
                                                <span>{new Intl.NumberFormat().format(item.discountedPrice * item.quantity)} $</span>
                                            </h5>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                    <tr className="active border-0 border-primary">
                                        <td className="fw-bold" >SOUS-TOTAL : </td>
                                        <td className="text-center"><h6 className="text-dark fw-bold">{new Intl.NumberFormat().format(checkouts.current.subTotal)} $</h6></td>
                                    </tr>
                                    <tr className="active border-0 border-primary">
                                        <td className="fw-bold" >TPS (5%) + TVQ (9.975%) : </td>
                                        <td className="text-center"><span className="fs-6">{new Intl.NumberFormat().format(checkouts.current.taxe)} $</span></td>
                                    </tr>
                                    <tr className="active border-0 border-primary">
                                        <td className="fw-bold"><h5 className="align-middle my-0 fw-bold">GRAND-TOTAL : </h5></td>
                                        <td className="text-center align-middle"><h4 className="align-middle my-0 "><Badge>{new Intl.NumberFormat().format(checkouts.current.grandTotal)} $</Badge></h4></td>
                                    </tr>
                            </tfoot>
                        </Table>
                    </div>
                </div>
            </div>
        
            <Alerts Etat={Alert.Etat} Type={Alert.Type} Titre={Alert.Titre}  Message={Alert.Message} onFermer= {onFermerAlert}/>

        </>
    )
}
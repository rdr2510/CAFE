import {Container, Nav, Navbar, Form, Button} from 'react-bootstrap';

import { useNavigate } from "react-router-dom";
import { GiCoffeeBeans } from "react-icons/gi";
import { BiSearchAlt } from "react-icons/bi";
import { useState, useEffect } from 'react';
import {RechercheProduits} from '../../Backends/Produits';
import Spinners from './Spinners';
import { Alerts } from '../Communs/Alerts';

export default function Heads({onSearch}) {
    const navigate= useNavigate();
    const [etatButton, setEtatButton] = useState(false);
    const [Alert, setAlert]=useState({Etat: false, Titre: '', Type: '', Message: ''});
    let [search, setSearch]= useState('');

    const searchProduits = RechercheProduits();

    useEffect(()=>{
        if (searchProduits.isError){
            setAlert({Etat: true, Titre: 'RECHERCHE PRODUIT - Error search products', Type: 'ERROR', Message: searchProduits.error.message});
            searchProduits.reset();
        } else if (searchProduits.isSuccess){
            onSearch(searchProduits);
            navigate('/Products/true/false/false');
            searchProduits.reset();
        }
    },[searchProduits, onSearch]);

    if (searchProduits.isLoading){
        return <Spinners Message={'Recherche en cours ...'} />
    }

    function onFermerAlert(){
        setAlert({Etat: false});
    }

    function handleClickSearch(){
        searchProduits.mutate({motcle: search});
        search= '';
        setSearch(search);
        setEtatButton(true);
    }

    function handleChangeSearch(event){
        setSearch(event.target.value);
        if (event.target.value === '' || event.target.value === ' '){
            setEtatButton(true);
        } else {
            setEtatButton(false);
        }
    }

    function handleKeyUp(event){
        event.preventDefault();
        if (event.keyCode === 13) {
            handleClickSearch();
        }
    }

    return (
        <>
                <Navbar sticky='top' variant= 'dark' expand='lg' className='py-0 px-0 my-sm-4 my-2'>
                    <Container fluid className='mx-0 px-0'>
                        <Navbar.Collapse className='d-flex justify-content-center justify-content-sm-between align-items-center'>
                            <Nav.Link onClick={()=>{navigate('/HOME')}} className='d-lg-flex d-none'>
                                <Navbar.Brand className='py-0 d-lg-flex d-none align-items-center ms-5'>
                                    <div className='d-flex'>
                                        <div className='px-2 py-1 bg-black' style={{border: '1px solid black', borderRight: 'none'}}>
                                            <GiCoffeeBeans className='text-light' style={{fontSize:'50px'}} />
                                        </div>
                                        <div className='px-4 py-1 bg-primary border border-primary d-flex align-items-center'>
                                            <h1 className='fw-bold my-0 text-light'>E-CAFE</h1>
                                        </div>
                                    </div>
                                </Navbar.Brand>
                            </Nav.Link>
                            <div className="d-flex ms-5 ms-lg-0">
                                <Form.Control onChange={(event)=>handleChangeSearch(event)} onKeyUp={(event)=>handleKeyUp(event)} value={search} type="search" placeholder="Recherche des produits" className="border-primary me-0 rounded-0" aria-label="Recherche"/>
                                <Button disabled= {etatButton?true:false} onClick={()=>handleClickSearch()} variant="outline-primary" className='rounded-0 ms-0'><BiSearchAlt className='text-black' style={{fontSize:"25px"}} /></Button>
                            </div>
                            <div className='me-5 d-sm-flex d-none flex-column align-items-center'>
                                <p className='my-0 fw-bold'>Service Client</p>
                                <h4 className='my-0'>+1 438 226 9031</h4>
                            </div>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Alerts Etat={Alert.Etat} Type={Alert.Type} Titre={Alert.Titre}  Message={Alert.Message} onFermer= {onFermerAlert}/>
        </>
    );
  }
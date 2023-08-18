import {Container, Nav, Navbar, NavDropdown, Badge} from 'react-bootstrap';

import { useNavigate } from "react-router-dom";
import { GiCoffeeBeans, GiCoffeeCup, GiHearts } from "react-icons/gi";
import { BsFillExclamationCircleFill, BsCart4 } from "react-icons/bs";
import { BiSolidUserCircle, BiSolidUserRectangle, BiCategoryAlt } from "react-icons/bi";
import { FiCoffee } from "react-icons/fi";
import { MdStyle, MdCoffeeMaker } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { CgToolbarBottom } from "react-icons/cg";
import { GetCategories } from '../../Backends/Produits';
import { Alerts } from './Alerts';
import { useState } from 'react';

import './Styles/headers.css';


export default function Header({panier, WishList, onMonProfil, onUserDisConnect, onChangeThemeStyle}) {
    const navigate= useNavigate();

    const [categories, setCategories] =  useState([]);
    const [Alert, setAlert]=useState({Etat: false, Titre: '', Type: '', Message: ''});
    
    const getCategories= GetCategories();
    if (getCategories.isError){
        setAlert({Etat: true, Titre: 'Error list all categories', Type: 'ERROR', Message: getCategories.error.message});
    } else if (getCategories.isSuccess){
        setCategories(getCategories.data);
    }

    const iconCategory=(name)=>{
        switch(name){
            case 'Café':
                return <FiCoffee className='fs-4 me-2'/>    
            case 'Machine':
                return <MdCoffeeMaker className='fs-4 me-2'/>    
            case 'Accessoires':
                return <CgToolbarBottom  className='fs-4 me-2'/>  

            default:
        }
    };

    function onFermerAlert(){
        setAlert({Etat: false});
    }

    return (
        <>
                <Navbar bg="primary" variant="dark" sticky='top' expand='lg' className='py-0 px-0 border-0'>
                    <Container fluid className='border-0'>
                        <Nav.Link onClick={()=>{navigate('/HOME')}}>
                            <Navbar.Brand className='py-0 my-2 d-flex d-lg-none align-items-center'>
                                <GiCoffeeBeans style={{fontSize:'50px'}} />
                                <h2 className='fw-bold my-0 mx-3 NavLink '>E-CAFE</h2>
                            </Navbar.Brand>
                        </Nav.Link>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="me-auto border-0">
                                <NavDropdown align='start' title={<span><BiCategoryAlt className="mx-2" style={{fontSize:'40px'}}/><span>CATÉGORIES</span></span>} className='bg-black mx-lg-5 px-lg-5'>
                                    {categories.map(item=>(
                                        <NavDropdown.Item onClick={()=>{navigate('/Products/'+item.id+'/null')}} key={item.id} data-toggle-second="tooltip" title= {item.description} data-placement="right" aria-haspopup="true" aria-expanded="false"  className='d-flex align-items-center w-100'>{iconCategory(item.name)} {item.name}</NavDropdown.Item>                                        
                                    ))}
                                </NavDropdown>
                                
                                    <Nav.Link onClick={()=>{navigate('/PRODUCTS')}} className='NavLink  mx-3 d-flex justify-content-start text-black align-items-center flex-wrap'><GiCoffeeCup className="mx-2" style={{fontSize:'40px'}}/>PRODUITS</Nav.Link>
                                    <Nav.Link onClick={()=>{navigate('/ABOUTS')}} className='NavLink d-flex justify-content-start align-items-center flex-wrap'><BsFillExclamationCircleFill className="mx-2" style={{fontSize:'40px'}} />A PROPOS</Nav.Link>
                                
                                <NavDropdown align='start' title={<span><GiCoffeeCup className="mx-2" style={{fontSize:'40px'}}/><span>CAFE</span></span>} className='bg-black mx-lg-5 px-lg-5'>
                                    <NavDropdown.Item  onClick={()=>{navigate('/CAFE')}} className='NavLink  d-flex justify-content-start text-black align-items-center flex-wrap '>CAFÉ</NavDropdown.Item >
                                    <NavDropdown.Item  onClick={()=>{navigate('/AJOUTCAFE')}} className='NavLink  d-flex justify-content-start text-black align-items-center flex-wrap '>AJOUTER UN NOUVEAU CAFÉ</NavDropdown.Item >
                                </NavDropdown>
                            
                            </Nav>
                            <Nav className="d-flex justify-content-start">
                                <Nav.Link disabled={WishList.length===0?true:false } onClick={()=>{navigate('/Wishlist/')}}  className='d-flex justify-content-start align-items-center flex-wrap'><Badge bg="black"><GiHearts className="mx-1 text-danger" style={{fontSize:'25px'}} /><span className='text-primary d-flex align-items-end justify-content-end'>{WishList.length}</span></Badge><span className='d-lg-none ms-2'>COUP DE COEUR</span></Nav.Link>
                                <Nav.Link disabled={panier===0?true:false } onClick={()=>{navigate('/Carts/')}} className='d-flex justify-content-start align-items-center flex-wrap'><Badge bg="black"><BsCart4 className="mx-1 text-ligth" style={{fontSize:'25px'}} /><span className='text-primary d-flex align-items-end justify-content-end'>{panier}</span></Badge><span className='d-lg-none ms-2'>PANIER</span></Nav.Link>
                                <NavDropdown align='end' title={<span><BiSolidUserCircle style={{fontSize:"40px"}} /><span className="d-lg-none">UTILISATEURS</span></span>} id="navbarScrollingDropdown" className='fw-bold mx-0 my-0'>
                                    <NavDropdown.Item disabled href="#" onClick={onMonProfil} className='d-flex align-items-center'><BiSolidUserRectangle className="me-2" style={{fontSize:'25px'}}/>Mon Profil</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#" onClick={onChangeThemeStyle} className='d-flex align-items-center'><MdStyle className="me-2" style={{fontSize:'25px'}} />Thème Style</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item disabled href="#" onClick={onUserDisConnect} className='fw-bold d-flex align-items-center'><IoLogOut className="me-2" style={{fontSize:'25px'}} />DéConnecter</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Alerts Etat={Alert.Etat} Type={Alert.Type} Titre={Alert.Titre}  Message={Alert.Message} onFermer= {onFermerAlert}/>
        </>
    );
  }
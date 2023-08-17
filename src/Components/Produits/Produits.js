import {Button, Card, Badge} from 'react-bootstrap';
import { BsCartPlus } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { GiHeartPlus } from "react-icons/gi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import './Styles/produits.css';
import { useNavigate } from "react-router-dom";

export default function ListProduits({lists}){
    const navigate= useNavigate();
    
    return(
        <>
            <div className='d-flex flex-row flex-wrap justify-content-evenly'>
                {lists.map(item=>(
                    <Card onClick={()=>{navigate('/ProductDetail/'+item.id)}} key={item.id} className='mx-2 my-3 border-0 border-top border-start border-primary border-3 fiche rounded-4' style={{ cursor: 'pointer', width: '16rem', height: '20rem', maxHeight: '20rem',
                                                                                                                                boxShadow: '15px 10px 15px 0px rgba(0,0,0,0.2)' }}>
                        <Card.Img className='d-flex align-items-start mt-2' variant="top" src= {item.image} style={{width: '100%', height: '40%', objectFit: 'contain'}} />
                        <Card.Body className='d-flex flex-column justify-content-between px-2 py-2'>
                            <Card.Title className='text-center fw-bold text-primary my-0 py-0' style={{height: '50px'}}>{item.name}</Card.Title>
                            <div className='text-center my-0 description' style={{display: '-webkit-box', maxWidth: '100%', height: '30px', overflow:' hidden'}}>
                                {item.description}
                            </div>
                            <div className='d-flex justify-content-center'>
                                <h5 className='my-0'><Badge className='bg-warning'><RiMoneyDollarCircleFill className='me-2' style={{fontSize:'1.5rem'}} />{new Intl.NumberFormat().format(item.price)} $</Badge></h5>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex justify-content-center'>
                                    <span className='fw-bold'>{item.category.name}</span>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <span style={{color: item.color.hexCode}}>{item.color.name}</span>
                                    <span className='px-2 ms-2' style={{border: '1px solid', color: item.color.hexCode, backgroundColor: item.color.hexCode,}}>C</span>
                                </div>
                            </div>
                                    
                            <div className='d-none justify-content-between'>
                                <Button style={{fontSize: '0.8rem'}} variant="primary" className='d-flex flex-column align-items-center'><GiHeartPlus className="text-danger" style={{fontSize:'1.5rem'}} /></Button>
                                <Button style={{fontSize: '0.8rem'}} variant='dark' className='d-flex flex-column align-items-center'><FiMoreHorizontal style={{color: 'white', fontSize:'1.5rem'}} /></Button>
                                <Button style={{fontSize: '0.8rem'}} variant="primary" className='d-flex flex-column align-items-center'><BsCartPlus className="text-light" style={{fontSize:'1.5rem'}} /></Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}   
            </div>
            
        </>
    )
}

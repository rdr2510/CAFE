import React,{useEffect, useState} from 'react';
import {Card, } from 'react-bootstrap';
import './Styles/produits.css';


const Cafe = () => {
    const[items,setItems]=useState([])
    useEffect(() => {
        getCafeData()
      
      }, [])
function getCafeData(){
   
        fetch("https://insta-api-api.0vxq7h.easypanel.host/coffees")
        .then(response=>{
            return response.json()
        })
        .then(data=>{
            setItems(data)
        })
    
}
  function deleteCafe(id){
      fetch(`https://insta-api-api.0vxq7h.easypanel.host/coffees/${id}`,{
        method:'DELETE'
      })
      .then((result)=>{
        result.json().then((resp)=>{
           console.warn(resp)
           getCafeData()
        })
      })
      }

    return (
     <div className='d-flex flex-row flex-wrap justify-content-evenly'>
      
     {items.map(item=>(
         <Card key={item.id} className='mx-2 my-3 border-0 border-top border-start border-primary border-3 fiche rounded-4' style={{ cursor: 'pointer', width: '16rem', height: '20rem', maxHeight: '20rem',
                                                                                                                     boxShadow: '15px 10px 15px 0px rgba(0,0,0,0.2)' }}>
             <Card.Img className='d-flex align-items-start mt-2' variant="top" src= {item.pictureUrl} style={{width: '100%', height: '40%', objectFit: 'contain'}} />
             <Card.Body className='d-flex flex-column justify-content-between px-2 py-2'>
                 <Card.Title className='text-center fw-bold text-primary my-0 py-0' style={{height: '50px'}}>{item.name}</Card.Title>
                 <div className='text-center my-0 description' style={{display: '-webkit-box', maxWidth: '100%', height: '80px', overflow:' hidden'}}>
                     {item.description}
                 </div>
            </Card.Body>
            <svg className='' onClick={()=>deleteCafe(item.id)} xmlns="http://www.w3.org/2000/svg" width="26" height="36" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
            </svg>
          
        </Card>
     ))}
    </div>
    );
};

export default Cafe;
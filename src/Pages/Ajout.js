import React, { useState} from 'react';
import { Container } from "react-bootstrap";
import {Form} from 'react-bootstrap';
import AjoutImage from '../Components/AjoutImage';

function Ajout()
{
  const [formvalue, setFormvalue]= useState({name:"",description:"", pictureUrl:"" });

  const handleInput =(e)=>{
    const { name, value}= e.target;
    setFormvalue({...formvalue, [name]:value});
   // console.log(formvalue);
  }
  const handleFormsubmit= async (e)=>{
    e.preventDefault();
   
   await fetch('https://insta-api-api.0vxq7h.easypanel.host/coffees', {
      method: 'POST', body: JSON.stringify({
      name:formvalue.name,
      description: formvalue.description,
      pictureUrl: formvalue.pictureUrl
    }),

      headers: { 'content-type': 'application/json; charset=utf-8' },
     
    });
   
    console.log(formvalue);
  }

    return(
        <React.Fragment>
             <Container>
          
            <h2 className=' pt-5 d-flex justify-content-center text-blue align-items-center flex-wrap '>
            AJOUTER VOTRE CAFÉ PREFERÉ

            </h2>
            
            <Form className='mx-auto d-flex justify-content-start align-items-center flex-wrap'style={{width:'100%'}} onSubmit={ handleFormsubmit}>            
              <div className="col-md-3">  
                <Form.Label className="form-label text-white">Name</Form.Label>              
                <Form.Control  type="text" name='name' value={formvalue.name} onChange={ handleInput}  className='form-control'  placeholder='Name...' />
              </div>

              <div className="col-md-3 m-1">  
                <Form.Label className="form-label text-white">Description</Form.Label>              
                <Form.Control   type="text" name='description' value={formvalue.description } onChange={ handleInput}  className='form-control'  placeholder='Description...' />
              </div>

              <div className="col-md-3">  
                <Form.Label className="form-label text-white">PictureUrl</Form.Label>              
                <Form.Control  type='text' name='pictureUrl' value={formvalue.pictureUrl} onChange={ handleInput}  className='form-control'  placeholder='PictureUrl...' />
              </div>
              <div className="col-md-2 m-1">  
                <label className="form-label text-white">Action</label>              
                <button className='form-control btn btn-success '>AJOUTER</button>
              </div>
            
              
               </Form>
              
            <AjoutImage/>
        </Container>
        </React.Fragment>
    );
}

export default Ajout;
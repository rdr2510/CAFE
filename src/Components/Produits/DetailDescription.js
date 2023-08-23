import Comments from './Comments';
import { useState, useEffect } from 'react';
import {GetComments, AddComment} from '../../Backends/Comments';
import Spinners from '../Communs/Spinners';
import { Alerts } from '../../Components/Communs/Alerts';
import { Button,  Modal, FloatingLabel, Form } from 'react-bootstrap';
import { LiaCommentSolid } from "react-icons/lia";
import { TfiComments } from "react-icons/tfi";
import { MdCancel } from "react-icons/md";
import { BiMessageAdd } from "react-icons/bi";
import { HiSave } from "react-icons/hi";

export function AjoutComment({Etat, Disabled, onAdd, onHide}) {
  const [inputComm, setInputComm]= useState('');
  
  function handleChange(event){
      if (event.target.value!==' '){
        setInputComm(event.target.value);
      }
  }

  return (
    <div>
          <Modal show={Etat} onHide={onHide} size='lg' centered backdrop="static" keyboard={true}>
              <Modal.Header closeButton>
                  <Modal.Title><BiMessageAdd className='me-2' style={{fontSize:"25px"}} />Nouveau Commentaire</Modal.Title>
              </Modal.Header>
      
              <Modal.Body>
                  <FloatingLabel controlId="floatingInput" label="Votre commentaire" className="mb-3">
                      <Form.Control disabled={Disabled} value={inputComm} onChange={(event)=>{handleChange(event)}} type="text-area" placeholder="Commentaire" rows= "5"/>
                  </FloatingLabel>
              </Modal.Body>
      
              <Modal.Footer>
                  <Button variant="secondary" onClick={()=>{onHide()}}><MdCancel className='me-2' style={{fontSize:"25px"}} />Annuler</Button>
                  <Button variant="primary" onClick={()=>{onAdd(inputComm)}} disabled={inputComm===''?true:Disabled} ><HiSave className='me-2' style={{fontSize:"25px"}} />Ajouter</Button>
              </Modal.Footer>
          </Modal>
    </div>
  );
}

export default function DetailDescription({id}) {

  const [comm, setComm]= useState([]);
  const [alert, setAlert]=useState({Etat: false, Titre: '', Type: '', Message: ''});
  const [modalComm, setCommModal]= useState({Etat: false, Disabled: false});

  const getComments= GetComments(id);
  const addComment= AddComment();

  useEffect(()=>{
    if (getComments.isError){
        setAlert({Etat: true, Titre: 'COMMENTS - Error get list comment', Type: 'ERROR', Message: getComments.error.message});
    } else if (getComments.isSuccess){
        setComm(getComments.data);
    }

    if (addComment.isError){
        setAlert({Etat: true, Titre: 'COMMENTS - Error add new comment', Type: 'ERROR', Message: addComment.error.message});
        addComment.reset();
      } else if (addComment.isSuccess){
        setAlert({Etat: true, Titre: 'COMMENTS - Ajout commentaire', Type: 'SUCCESS', Message: 'Ajout nouveau commentaire avec succés !'});
        setCommModal({Etat: false});
        getComments.refetch();
        addComment.reset();
    }

  }, [getComments, addComment, id]);

  function onFermerAlert(){
    setAlert({Etat: false});
  }

  function handleAdd(){
    setCommModal({Etat: true});
  }

  function handleFermer(){
    setCommModal({Etat: false});
  }

  function handleAjout(Comm){
     addComment.mutate({productId: id, content: Comm});
  }

  if (addComment.isLoading){
      modalComm.Disabled= true;
      //modalComm.Etat= true;
      //setCommModal(modalComm);
  }

  function handleRefresh(){
    getComments.refetch();
  }

  if (getComments.isLoading){
    return <Spinners />;
  }

  return (
        <>
          <div className='w-100'>
              <div className='d-flex justify-content-between'>
                <div className='my-0 py-4 px-3 fw-bold' style={{border: '2px solid var(--bs-secondary)', borderBottomColor: 'var(--bs-primary)', borderTopLeftRadius: '15px', borderTopRightRadius: '15px', width: 'fit-content'}}>
                <TfiComments className='me-2' style={{fontSize:"25px"}} />{'Commentaires ('+comm.length+')'}</div>
                <Button variant='dark' className='mt-3 mb-2' onClick={()=> handleAdd()}>
                  <LiaCommentSolid className='me-2' style={{fontSize:"25px"}} />Ajouter
                </Button>
              </div>
              <div className='w-100 border mb-4'/>
              <Comments comms={comm} onRefresh={handleRefresh}/>
          </div>

          <AjoutComment Etat={modalComm.Etat} onAdd={handleAjout} onHide={handleFermer}/>
        <Alerts Etat={alert.Etat} Type={alert.Type} Titre={alert.Titre}  Message={alert.Message} onFermer= {onFermerAlert}/>
        </>
  );
}
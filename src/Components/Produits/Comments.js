import { useState, useEffect } from 'react';
import { Alerts } from '../../Components/Communs/Alerts';
import { MdCommentsDisabled } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";
import { DeleteComment} from '../../Backends/Comments';
import { Alert, Button, Spinner  } from 'react-bootstrap';
import { ModalConfirmation } from "../../Components/Communs/DlgConfirmation";


export default function Comments({comms, onRefresh}){

    const [alert, setAlert]=useState({Etat: false, Titre: '', Type: '', Message: ''});
    const [Modal, setModal]= useState({Action:-1, Etat: false, Titre:'', Message:'',
                                        TxtBtnConfirmer:'', TxtBtnAnnuler:'', Type:'', Data: Object});
    const deleteComment= DeleteComment();

    useEffect(()=>{
        if (deleteComment.isError){
            setAlert({Etat: true, Titre: 'COMMENTAIRE - Error delete item comment', Type: 'ERROR', Message: deleteComment.error.message});
            deleteComment.reset();
        } else if (deleteComment.isSuccess){
            setAlert({Etat: true, Titre: 'COMMENTAIRE - Suppression Commentaire', Type: 'SUCCESS', Message: 'Suppression de commentaire avec succés !'});
            deleteComment.reset();
            onRefresh();
        }
    }, [deleteComment, Modal, onRefresh])

    function handleDelete(item){
        setModal({Action: 1, Etat: true, Type: 'ERROR', Titre: 'COMMENTAIRE - SUPPRESSION COMMENTAIRE...', 
        Message: 'Vous voulez vraiment supprimer cet avis n°'+item.id+' ?', TxtBtnConfirmer:'Supprimer', TxtBtnAnnuler: 'Annuler', Data: Object.assign({}, item)});
    }

    function handleModalConfirmer(Action){
        switch(Action){
            case 1: // suppression article
                deleteComment.mutate({productId: Modal.Data.id});
                break;
            default:
        }
        Modal.Action= 0;
        Modal.Etat= false;
        setModal(Modal);
    }

    function handleModalAnnuler(Action){
        setModal({Action: 0, Etat: false});
    }

    function onFermerAlert(){
        setAlert({Etat: false});
    }

    return (
        <>
            {comms.reverse().map(item=>(
                <Alert key={item.id} show={true} className='bg-secondary rounded-4'>
                    <Alert.Heading><FaRegCommentDots className='me-2' style={{fontSize:"25px"}} />Commentaire N° {item.id}</Alert.Heading>
                        <p className='text-primary'>{item.content}</p>
                        <hr className='border-primary'/>
                    <div className="d-flex justify-content-end">
                        <Button onClick={(event)=>handleDelete(item)} className='d-flex' variant={item.canBeDeleted?'outline-danger':'outline-secondary'} disabled={item.canBeDeleted?deleteComment.isLoading?true:false:true}>
                            <Spinner className={deleteComment.isLoading?'d-block':'d-none'} variant='dark' as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            <MdCommentsDisabled className= {deleteComment.isLoading?'d-none':'d-block me-2'} style={{fontSize:"25px"}} />
                            Supprimer
                        </Button>
                    </div>
                </Alert>
            ))}
            <ModalConfirmation Action={Modal.Action} Titre={Modal.Titre} Message={Modal.Message} TextBtnConfirmer={Modal.TxtBtnConfirmer} TextBtnAnnuler={Modal.TxtBtnAnnuler} Etat={Modal.Etat} Type={Modal.Type} onConfirmer={handleModalConfirmer} onAnnuler={handleModalAnnuler}/>
            <Alerts Etat={alert.Etat} Type={alert.Type} Titre={alert.Titre}  Message={alert.Message} onFermer= {onFermerAlert}/>
        </>
    );

}
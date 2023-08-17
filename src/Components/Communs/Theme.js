import {Form, Button, Modal} from 'react-bootstrap';

const Themes = [
    {id:0, value:'Bootswatch_bootstrap.min.css'},
    {id:1, value:'Cerulean_bootstrap.min.css'},
    {id:2, value:'Cosmo_bootstrap.min.css'},
    {id:3, value:'Cyborg_bootstrap.min.css'},
    {id:4, value:'Darkly_bootstrap.min.css'},
    {id:5, value:'Default_bootstrap.min.css'},
    {id:6, value:'Flatly_bootstrap.min.css'},
    {id:7, value:'Journal_bootstrap.min.css'},
    {id:8, value:'Litera_bootstrap.min.css'},
    {id:9, value:'Lumen_bootstrap.min.css'},
    {id:10, value:'Lux_bootstrap.min.css'},
    {id:11, value:'Materia_bootstrap.min.css'},
    {id:12, value:'Minty_bootstrap.min.css'},
    {id:13, value:'Morh_bootstrap.min.css'},
    {id:14, value:'Pulse_bootstrap.min.css'},
    {id:15, value:'Quartz_bootstrap.min.css'},
    {id:16, value:'Sandstone_bootstrap.min.css'},
    {id:17, value:'Simplex_bootstrap.min.css'},
    {id:18, value:'Sketchy_bootstrap.min.css'},
    {id:19, value:'Slate_bootstrap.min.css'},
    {id:20, value:'Solar_bootstrap.min.css'},
    {id:21, value:'Spacelab_bootstrap.min.css'},
    {id:22, value:'Superhero_bootstrap.min.css'},
    {id:23, value:'United_bootstrap.min.css'},
    {id:24, value:'Vapor_bootstrap.min.css'},
    {id:25, value:'Yeti_bootstrap.min.css'}
];

export default function StyleTheme({Style, onChangeTheme}) {
    return (
        <div className='d-flex justify-content-center align-items-center w-100'>
            <Form.Label htmlFor="theme" className='my-0 mx-2 text-nowrap text-primary fw-bold'>Théme Style:</Form.Label>
            <Form.Select id='theme' className='w-auto py-0 my-1' onChange={(e)=>{onChangeTheme(e)}} value={Style}>
                {Themes.map(item => (
                    <option key={item.id} value={item.value} >{item.value.slice(0, item.value.indexOf('_'))}</option>  
                ))}    
            </Form.Select>   
        </div>
  );
}

export function ModalStyleTheme({Etat, Style, onChangeTheme, onConfirmer, onAnnuler}){
    let Action= 2;
    return (
        <>
            <Modal show= {Etat} onHide={onAnnuler} backdrop="static" keyboard={true} centered>
                <Modal.Header className='bg-primary text-light' closeButton>
                    <Modal.Title ><h4>STYLE THÉME</h4></Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex'>
                    <StyleTheme Style= {Style} onChangeTheme={onChangeTheme}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{onAnnuler(Action)}}>Annuler</Button>
                    <Button variant='primary' onClick={()=>{onConfirmer(Action)}}>Choisir</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

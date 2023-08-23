import Spinner from 'react-bootstrap/Spinner';
import { GiCoffeeBeans } from "react-icons/gi";

export default function Spinners({Message}) {
    return (
        <div className='w-100 d-flex flex-column justify-content-center align-items-center' style={{height: '100vh'}}>
            <div className='d-flex mb-3'>
                <div className='px-2 py-1 bg-black' style={{border: '1px solid black', borderRight: 'none'}}>
                    <GiCoffeeBeans className='text-light' style={{fontSize:'50px'}} />
                </div>
                <div className='px-4 py-1 bg-primary border border-primary d-flex align-items-center'>
                    <h1 className='fw-bold my-0 text-light'>E-CAFE</h1>
                </div>
            </div>
            
            <Spinner animation="grow" variant='primary'/>

            <h5>{Message}</h5>
        </div>
    )
}
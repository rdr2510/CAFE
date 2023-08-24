import {  BsPatchCheckFill } from "react-icons/bs";

export default function Confirmation(){
    return(
        <>
            <div className="w-100 text-center">
                <BsPatchCheckFill className="me-2" style={{fontSize:"80px"}} />
                <h2>Votre achat a été bien confirmer avec succés!.</h2>               
            </div>
        </>
    )
}
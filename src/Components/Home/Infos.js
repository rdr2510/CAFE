import { BsCheckLg, BsInfoCircleFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { MdOutlineSupportAgent } from "react-icons/md";
export default function Infos(){
    return(
        <>
            <div className='mx-5 my-5 pb-4'>
                <h2 className='w-100 ps-2 text-primary' style={{borderBottomLeftRadius: '20px', borderBottom: '2px solid var(--bs-primary)', borderLeft: '2px solid var(--bs-primary)'}}><BsInfoCircleFill className="me-2 mb-2 text-dark" style={{fontSize:'40px'}}/>INFOS</h2>
                <div className="d-flex justify-content-between flex-column flex-lg-row flex-wrap my-4">
                    <div className="border py-4 px-4 fs-4 mx-4" style={{backgroundColor: 'var(--bs-secondary)'}}>
                        <BsCheckLg className='me-2 text-primary' style={{fontSize:'2rem'}} />
                        <span className="fw-bold">Produit de Qualité</span>
                    </div>
                    <div className="border py-4 px-4 fs-4 mx-4" style={{backgroundColor: 'var(--bs-secondary)'}}>
                        <FaShippingFast className='me-2 text-primary' style={{fontSize:'2rem'}} />
                        <span className="fw-bold">Livraison Gratuit</span>
                    </div>
                    <div className="border py-4 px-4 fs-4 mx-4" style={{backgroundColor: 'var(--bs-secondary)'}}>
                        <GiReturnArrow className='me-2 text-primary' style={{fontSize:'2rem'}} />
                        <span className="fw-bold">Retour sous 14 jours</span>
                    </div>
                    <div className="border py-4 px-4 fs-4 mx-4" style={{backgroundColor: 'var(--bs-secondary)'}}>
                        <MdOutlineSupportAgent className='me-2 text-primary' style={{fontSize:'2rem'}} />
                        <span className="fw-bold">Assistance 24/7</span>
                    </div>
                </div>
            </div>
        </>
    )
}
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { GiCoffeeCup, GiHearts } from "react-icons/gi";
import { BiCategoryAlt, BiSolidDetail } from "react-icons/bi";
import { IoIosColorPalette } from "react-icons/io";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdHome } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Navigation({nav}) {
  const navigate= useNavigate();

  function navToArray(navigation){
    let b= {name: '', path: '', active: false, icon: ''}
    let breadcrumd= [];
    for (const item of navigation){
        switch(item){
            case 'accueil':
                b= {}
                b.name= 'Accueil';
                b.path= '/Home';
                b.active= true;
                b.icon= <MdHome className="me-1 fs-4" />;
                breadcrumd.push(Object.create(b));
                break;
            case 'produits':
                b={}
                b.name= 'Produits';
                b.path= '/Products';
                b.active= true;
                b.icon= <GiCoffeeCup className="me-1 fs-4"/>;
                breadcrumd.push(Object.create(b));
                break;
            case 'wishlist':
                b={}
                b.name= 'Wishlists';
                b.path= '/Wishlists';
                b.active= true;
                b.icon= <GiHearts className="me-1 fs-4"/>;
                breadcrumd.push(Object.create(b));
                break;
            case 'detail':
                b={}
                b.name= 'Description';
                b.path= '/Description';
                b.active= true;
                b.icon= <BiSolidDetail className="me-1 fs-4"/>;
                breadcrumd.push(Object.create(b));
                break;
            case 'categories':
                b={}
                b.name= 'Catégories';
                b.path= '/Category';
                b.active= false;
                b.icon= <BiCategoryAlt className="me-1 fs-4"/>;
                breadcrumd.push(Object.create(b));
                break;
            case 'couleurs':
                b={}
                b.name= 'Couleurs';
                b.path= '/Colors';
                b.active= false;
                b.icon= <IoIosColorPalette className="me-1 fs-4"/>;
                breadcrumd.push(Object.create(b));
                break;
            case 'prix':
                b={}
                b.name= 'Prix';
                b.path= '/Prix';
                b.active= false;
                b.icon= <RiMoneyDollarCircleFill className="me-1 fs-4"/>;
                breadcrumd.push(Object.create(b));
                break;
            default:
        }
      }
      return breadcrumd;
  }  
  

  return (
    <Breadcrumb className='mx-4 my-4 align-middle w-100'>
        {navToArray(nav).map((item, index)=>(
            <Breadcrumb.Item key={index} active= {!item.active?true:index === navToArray(nav).length-1?true:false} className='border-0' onClick={()=>{navigate(item.path)}} > {item.icon} {item.name}</Breadcrumb.Item>
        ))}
    </Breadcrumb>
  );
}
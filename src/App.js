import { Routes, Route } from "react-router-dom";
import Heads from './Components/Communs/Heads';
import Header from './Components/Communs/Headers';
import Footer from './Components/Communs/Footers';

import {GetWishLists} from './Backends/Wishlist';
import { GetPaniers } from "./Backends/Carts";

import { ModalStyleTheme } from './Components/Communs/Theme';
import { Alerts } from './Components/Communs/Alerts';

import Home from './Pages/Home';
import Products from './Pages/Products';

import '../src/ThemeStyle/Bootswatch_bootstrap.min.css';
import Abouts from './Pages/Abouts';
import WishList from './Pages/WishList';
import Cafe from "./Pages/Cafe";
import Ajout from "./Pages/Ajout";
import { useEffect, useState } from 'react';
import ProductDetail from "./Pages/ProductDetail";
import Paniers from "./Pages/Paniers";

function App() {
  
    const [ThemeStyle, setThemeStyle]= useState('Cerulean_bootstrap.min.css');
    const [ModalStyle, setModalStyle]= useState({Etat: false, Theme:''});
    const [Alert, setAlert]=useState({Etat: false, Titre: '', Type: '', Message: ''});
    const [panier, setPanier] = useState(0);
    const [wishlist, setWishlist] = useState([]);
    const getPaniers= GetPaniers();
    if (getPaniers.isError){
        setAlert({Etat: true, Titre: 'PANIER - Error list cart', Type: 'ERROR', Message: getPaniers.error.message});
    } else if (getPaniers.isSuccess){
        setPanier(getPaniers.data.length);
    }

    const getWishLists= GetWishLists();
    if (getWishLists.isError){
        setAlert({Etat: true, Titre: 'WISHLIST - Error list wishlist', Type: 'ERROR', Message: getWishLists.error.message});
    } else if (getWishLists.isSuccess){
        setPanier(getWishLists.data.length);
    }

    useEffect(()=>{
        import ('./ThemeStyle/'+ThemeStyle);
    }, [ThemeStyle]);


    function handleChangeThemeStyle(){
        setModalStyle({Etat: true, Theme: ThemeStyle});
    }

    function handleModalChangeTheme(event){
        setModalStyle({Etat: true, Theme: event.target.value});
    }

    function handleModalConfirmer(Action){
        setModalStyle({Etat: false});
        setThemeStyle(ModalStyle.Theme);
        //setSessionTheme(ModalStyle.Theme);
        //window.location.reload(true);
        //window.location.assign(window.location.href);
    }

    function handleModalAnnuler(Action){
        setModalStyle({Etat: false});
    }

    function onFermerAlert(){
        setAlert({Etat: false});
    }

    function handlePanier(article){
        setPanier(article);
    }

    function handleWishList(article){
        setWishlist(article);
    }

    return (
        <>
                <Heads panier= {panier}/>
                <Header  panier={panier} WishList={wishlist} onChangeThemeStyle={handleChangeThemeStyle}/>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/Products" element={<Products />} />
                    <Route path="/Products/:CategoryId/:Search" element={<Products />} />
                    <Route path="/Wishlist" element={<WishList onWishList={handleWishList}/>} />
                    <Route path="/Carts" element={<Paniers onPanier= {handlePanier}/>} />
                    <Route path="/Abouts" element={<Abouts />} />
                    <Route path="/ProductDetail/:id" element={<ProductDetail WishList= {wishlist} onPanier= {handlePanier} onWishList={handleWishList}/>} />
                    <Route path="*" element={<Home />} />
                    <Route path="/CAFE" element={<Cafe/>}/>
                    <Route path="/AJOUTCAFE" element={<Ajout/>}/>
                </Routes>
                <Footer/>

                <Alerts Etat={Alert.Etat} Type={Alert.Type} Titre={Alert.Titre}  Message={Alert.Message} onFermer= {onFermerAlert}/>            
                <ModalStyleTheme Etat={ModalStyle.Etat} Theme={ModalStyle.Theme} onChangeTheme={handleModalChangeTheme} onConfirmer={handleModalConfirmer} onAnnuler={handleModalAnnuler}/>
        </>
    );
}

export default App;

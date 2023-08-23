import { useEffect, useState, createContext } from 'react';
import { Routes, Route } from "react-router-dom";
import '../src/ThemeStyle/Bootswatch_bootstrap.min.css';

import Heads from './Components/Communs/Heads';
import Header from './Components/Communs/Headers';
import Footer from './Components/Communs/Footers';

import { GetProduits, GetCategories } from './Backends/Produits';
import { GetWishLists } from './Backends/Wishlist';
import { GetPaniers } from "./Backends/Carts";

import { ModalStyleTheme } from './Components/Communs/Theme';
import { Alerts } from './Components/Communs/Alerts';

import Home from './Pages/Home';
import Products from './Pages/Products';
import WishList from './Pages/WishList';
import Cafe from "./Pages/Cafe";
import Ajout from "./Pages/Ajout";
import ProductDetail from "./Pages/ProductDetail";
import Paniers from "./Pages/Paniers";
import Abouts from './Pages/Abouts';
import Spinners from './Components/Communs/Spinners';
import { GetPromotions } from './Backends/promotions';
import Checkout from './Pages/Checkout';

export const ProductContext = createContext();
export const CategorieContext = createContext();
export const CartContext = createContext();
export const WishContext = createContext();
export const PromotionContext = createContext();

function App() {
  
    const [ThemeStyle, setThemeStyle]= useState('Cerulean_bootstrap.min.css');
    const [ModalStyle, setModalStyle]= useState({Etat: false, Theme:''});
    const [Alert, setAlert]=useState({Etat: false, Titre: '', Type: '', Message: ''});
    
    const [searchProduits, setSearchProduits]= useState([]);

    const getPaniers= GetPaniers();
    const getWishLists= GetWishLists();
    const getProduits= GetProduits();
    const getCategories= GetCategories();
    const getPromotions= GetPromotions();

    useEffect(()=>{
        import ('./ThemeStyle/'+ThemeStyle);

        if(getProduits.isError){
            setAlert({Etat: true, Titre: 'PRODUITS - Error list products', Type: 'ERROR', Message: getProduits.error.message});
        }

        if (getPaniers.isError){
            setAlert({Etat: true, Titre: 'PANIER - Error list cart', Type: 'ERROR', Message: getPaniers.error.message});
        }

        if (getWishLists.isError){
            setAlert({Etat: true, Titre: 'WISHLIST - Error list wishlist', Type: 'ERROR', Message: getWishLists.error.message});
        }

        if (getCategories.isError){
            setAlert({Etat: true, Titre: 'CATEGORY - Error list categories', Type: 'ERROR', Message: getCategories.error.message});
        }

        if (getPromotions.isError){
            setAlert({Etat: true, Titre: 'Error list all promotion', Type: 'ERROR', Message: getPromotions.error.message});            
        }

    }, [ThemeStyle, getProduits, getPaniers,  getWishLists, getCategories, getPromotions]);

    function handleSearch(produits){
        setSearchProduits(produits);
    }

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


    if (getProduits.isLoading){
        return <Spinners Message={'Chargement des données en cours..., Veuillez patienter s\'il vous plait.'}/>
    }

    if (getWishLists.isLoading){
        return <Spinners Message={'Chargement des données en cours..., Veuillez patienter s\'il vous plait.'}/>
    }

    if (getPaniers.isLoading){
        return <Spinners Message={'Chargement des données en cours..., Veuillez patienter s\'il vous plait.'}/>
    }

    if (getCategories.isLoading){
        return <Spinners Message={'Chargement des données en cours..., Veuillez patienter s\'il vous plait.'}/>
    }

    if (getPromotions.isLoading){
        return <Spinners Message={'Chargement des données en cours..., Veuillez patienter s\'il vous plait.'}/>
    }


    return (
        <>
            <ProductContext.Provider value={ getProduits } >
                <CartContext.Provider value={ getPaniers } >
                    <WishContext.Provider value={ getWishLists } >
                        <CategorieContext.Provider value={ getCategories } >
                            <Heads onSearch={handleSearch}/>
                            <Header onChangeThemeStyle={handleChangeThemeStyle}/>
                            <PromotionContext.Provider value={ getPromotions } >
                                <Routes>
                                    <Route index element={<Home />} />
                                    <Route path="/Products/:Search/:Categorie/:All" element={<Products SearchProduits={searchProduits} />} />
                                    <Route path="/ProductDetail/:id" element={<ProductDetail />} />
                                    <Route path="/Wishlist" element={<WishList />} />
                                    <Route path="/Carts" element={<Paniers />} />

                                    <Route path="/CAFE" element={<Cafe/>}/>
                                    <Route path="/AJOUTCAFE" element={<Ajout/>}/>

                                    <Route path="/Checkout" element={<Checkout/>}/>

                                    <Route path="/Abouts" element={<Abouts />} />
                                    <Route path="*" element={<Home />} />
                                </Routes>
                            </PromotionContext.Provider>
                            <Footer/>
                        </CategorieContext.Provider>
                    </WishContext.Provider>
                </CartContext.Provider>
            </ProductContext.Provider>

                <Alerts Etat={Alert.Etat} Type={Alert.Type} Titre={Alert.Titre}  Message={Alert.Message} onFermer= {onFermerAlert}/>            
                <ModalStyleTheme Etat={ModalStyle.Etat} Theme={ModalStyle.Theme} onChangeTheme={handleModalChangeTheme} onConfirmer={handleModalConfirmer} onAnnuler={handleModalAnnuler}/>
        </>
    );
}


export default App;

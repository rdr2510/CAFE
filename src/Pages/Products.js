import Navigation from "../Components/Produits/Navigation";
import ListProduits from "../Components/Produits/Produits";
import FiltrePrix from '../Components/Produits/FiltrePrix';
import FiltreCouleur from "../Components/Produits/FiltreCouleur";
import FiltreCategorie from "../Components/Produits/FiltreCategorie";
import { Alerts } from '../Components/Communs/Alerts';
import { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router';
import { ProductContext, PromotionContext } from '../App';

export default function Products({SearchProduits}){
    let prods= useRef([]);
    let prodsFilter =  useRef([]);
    let filter = useRef({category: [], color: [], price:{min:0, max:0}});
    const [naviger, setNaviger] = useState(['accueil', 'produits']);
    let paramQuery = useParams();
    const [Alert, setAlert]=useState({Etat: false, Titre: '', Type: '', Message: ''});
    const [FilterCategorie, setFilterCategorie]= useState(-1);
    const Promotions= useRef([]);

    const getProduits = useContext(ProductContext);
    const getPromotions= useContext(PromotionContext);

    let valueRef= useRef([]);
    
    function promote(produits){
        Promotions.current= [];
        for (const item of produits.data){
            const isExist = (element) => (element.productId === item.id);
            const index= getPromotions.data.findIndex(isExist);
            if (index ===-1){
                Promotions.current.push({data: item, promotion: 0});
            } else {
                Promotions.current.push({data: item, promotion: getPromotions.data[index].discountPercent});
            }
        }
    }

    useEffect(()=>{
        function isFilterAll(){
            if (filter.current.color.length ===0 && filter.current.category.length === 0 && filter.current.price.min === 0 && filter.current.price.max === 0){
                return true;
            } else return false;
        }

        if (paramQuery.Search === 'false' && paramQuery.Categorie === 'false' && paramQuery.All === 'true' && valueRef.current.length !== prodsFilter.current.length ){
            filter.current= {category: [], color: [], price:{min:0, max:0}};
            setNaviger(['accueil', 'produits']);
            getProduits.refetch();
            getPromotions.refetch();
            promote(getProduits);
            prods.current= Promotions.current.slice(0);
            prodsFilter.current= Promotions.current.slice(0);
            valueRef.current= prodsFilter.current.slice(0);
        } else if (paramQuery.Search === 'false' && isFilterAll() && paramQuery.Categorie === 'false'){
            setNaviger(['accueil', 'produits']);
            getProduits.refetch();
            getPromotions.refetch();
            promote(getProduits);
            prods.current= Promotions.current.slice(0);
            prodsFilter.current= Promotions.current.slice(0);
        } else if (paramQuery.Search === 'true' && paramQuery.All === 'false'){
            promote(SearchProduits);
            prods.current= Promotions.current.slice(0);
            prodsFilter.current= Promotions.current.slice(0);
        } else if (paramQuery.Categorie !== 'false'){
            promote(getProduits);
            prods.current= Promotions.current.slice(0);
            prodsFilter.current= Promotions.current.slice(0);
            setFilterCategorie(parseInt(paramQuery.Categorie));
            handleFilterCategory([parseInt(paramQuery.Categorie)]);
        }            
    }, [filter, paramQuery, prods, prodsFilter, Promotions, SearchProduits]);


    function onFermerAlert(){
        setAlert({Etat: false});
    }

    function filterColor(produit1, colors=[]){
        let produits2= [];

        if (colors.length > 0){
            for (const item of produit1){
                const isExist = (element) => element === item.data.color.id;
                const index= colors.findIndex(isExist);
                if (index !== -1){
                    produits2.push(item);
                }
            }
        } else produits2= produit1.slice(0);
        return produits2;
    }

    function filterPrice(produit1, price={min:0, max:0}){
        let produits2= [];

        if (price.min > 0 || price.max > 0){
            for (const item of produit1){
                if (price.min < item.data.price && item.data.price < price.max){
                    produits2.push(item);
                }
            }
        } else produits2= produit1.slice(0);

        return produits2;
    }

    function filterCategory(produit1, category=[]){
        let produits2= [];

        if (category.length > 0){
            for (const item of produit1){
                const isExist = (element) => element === item.data.category.id;
                const index= category.findIndex(isExist);
                if (index !== -1){
                    produits2.push(item);
                }
            }
        } else produits2= produit1.slice(0);
        return produits2;
    }


    function handleFilterCategory(filtre, filterManual){
        if (filterManual){
            setFilterCategorie(-1);
        }
        filter.current.category= filtre;
        
        prodsFilter.current= prods.current.slice(0);

        let p= filterCategory(prodsFilter.current.slice(0), filter.current.category);
        p= filterPrice(p.slice(0), filter.current.price);
        p= filterColor(p.slice(0), filter.current.color);

        const isExist = (element) => element === 'categories';
        const index= naviger.findIndex(isExist);
        if (index !== -1){
            if (filtre.length === 0){        
                naviger.slice(index, 1);
                setNaviger(naviger);
            }
        } else {
            if (filtre.length > 0){
                naviger.push('categories');
                setNaviger(naviger);
            }    
        }

        prodsFilter.current= p.slice(0);
    }

    function handleFilterPrice(filtre){
        filter.current.price.min= filtre.min;
        filter.current.price.max= filtre.max;

        prodsFilter.current= prods.current.slice(0);

        let p= filterPrice(prodsFilter.slice(0), filter.current.price);
        p= filterCategory(p.slice(0), filter.current.category);
        p= filterColor(p.slice(0), filter.current.color);

        const isExist = (element) => element === 'prix';
        const index= naviger.findIndex(isExist);
        if (index !== -1){
            if (filtre.min === 0 && filtre.max === 0){        
                naviger.slice(index, 1);
                setNaviger(naviger);
            }
        } else {
            if (filtre.min > 0 || filtre.max > 0){
                naviger.push('prix');
                setNaviger(naviger);
            }    
        }

        prodsFilter.current= p.slice(0);
    }

    function handleFilterColor(filtre){
        filter.current.color= filtre;

        prodsFilter.current= prods.current.slice(0);

        let p= filterColor(prodsFilter.slice(0), filter.current.color);
        p= filterPrice(p.slice(0), filter.current.price);
        p= filterCategory(p.slice(0), filter.current.category);

        const isExist = (element) => element === 'couleurs';
        const index= naviger.findIndex(isExist);
        if (index !== -1){
            if (filtre.length === 0){        
                naviger.slice(index, 1);
                setNaviger(naviger);
            }
        } else {
            if (filtre.length > 0){
                naviger.push('couleurs');
                setNaviger(naviger);
            }    
        }

        prodsFilter.current= p.slice(0);
    }

    return(
        <>
            <div style={{height: '100%'}}>
                <div style={{height: 'calc(100vh - 200px)', overflowY: 'scroll', overflowX: 'hidden'}}>
                    <Navigation nav={naviger} />
                    <div className="row mx-4">
                        <div className="col-lg-3 mx-0 px-0">
                            <FiltreCategorie onFilter={handleFilterCategory} FilterId={FilterCategorie} filterAll={paramQuery.All==='true'?true:false}/>
                            <FiltrePrix onFilter={handleFilterPrice} />
                            <FiltreCouleur onFilter={handleFilterColor} />
                        </div>
                        <div className="col-lg-9 mx-0 px-0">
                            <ListProduits lists= {prodsFilter.current} />
                        </div>
                    </div>
                </div>
            </div>

            <Alerts Etat={Alert.Etat} Type={Alert.Type} Titre={Alert.Titre}  Message={Alert.Message} onFermer= {onFermerAlert}/>
        </>
    )
}


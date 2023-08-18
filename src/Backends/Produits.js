import { useQuery } from 'react-query'
import axios from 'axios';

const urlBase = 'https://insta-api-api.0vxq7h.easypanel.host/';

export function GetProduits(){
    async function getProduits() {
        const { data } = await axios.get(urlBase+'products');
        return data;
    }
    return useQuery(['products'], getProduits);
}

export function GetProduit(id){
    async function getProduit() {
        const { data } = await axios.get(urlBase+'product/'+id);
        return data;
    }
    return useQuery(['products'], getProduit);
}

export function RechercheProduits(motcle){
    async function getProduits() {
        const { data } = await axios.get(urlBase+'products?search=' + motcle);
        return data;
    }
    return useQuery(['products'], getProduits);
}

export function GetCategories(){
    async function getCategories() {
        const { data } = await axios.get(urlBase+'product-categories');
        return data;
    }
    return useQuery(['category'], getCategories);
}

export function GetCouleurs(){
    async function getCouleurs() {
        const { data } = await axios.get(urlBase+'product-colors');
        return data;
    }
    return useQuery(['color'], getCouleurs);
}
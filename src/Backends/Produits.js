import { useQuery, useMutation } from 'react-query'
import axios from 'axios';

const urlBase = 'https://insta-api-api.0vxq7h.easypanel.host/';

export function GetProduits(){
    async function getProduits() {
        const { data } = await axios.get(urlBase+'products');
        return data;
    }
    return useQuery(['products'], getProduits);
}

export function GetProduit(){
    async function getProduit(id){
        const {data} = await axios.get(urlBase+'products/'+id);
        return data;
    }
    return useMutation(getProduit);
}

export function RechercheProduits(){
    async function getProduits({motcle}) {
        const { data } = await axios.get(urlBase+'products?search=' + motcle);
        return data;
    }
    return useMutation(getProduits);
}

export function GetCategories(){
    async function getCategories() {
        const response = await axios.get(urlBase+'products');
        let categories= [];
        if (response.status === 200){
            for (const item of response.data){
                const isExist = (element) => (element.id === item.category.id);
                const index= categories.findIndex(isExist);
                if (index === -1){
                    categories.push({id: item.category.id, name: item.category.name, image: item.image, description: item.category.description, checked: false, produits: [item.id]});
                } else {
                    const isExist = (element) => (element.id === item.id);
                    const i= categories[index].produits.findIndex(isExist);
                    if (i === -1){
                        categories[index].produits.push(item.id);
                    }
                }
            }
        }
        return categories;
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
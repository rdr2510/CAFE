import { useQuery, useMutation } from 'react-query'
import axios from 'axios';

const urlBase = 'https://insta-api-api.0vxq7h.easypanel.host/';

export function GetPaniers(){
    async function getPaniers() {
        const { data } = await axios.get(urlBase+'cart');
        return data;
    }
    return useQuery(['carts'], getPaniers);
}

export function UpdatePanier(){
    async function updatePanier({productId, quantity}){
        return await axios.patch(urlBase+'cart/modify-product-quantity/'+productId, {quantity: quantity});
    }
    return useMutation(updatePanier);
}

export function AddPanier(){
    async function addPanier({productId, quantity}){
        return await axios.post(urlBase+'cart/add-product', {productId: productId, quantity: quantity})
    }
    return useMutation(addPanier);
}

export function DeletePanier(){
    async function deletePanier(productId) {
        return await axios.delete(urlBase+'cart/remove-product/'+productId)
    }
    return useMutation(deletePanier);
}

export function ClearPanier(){
    async function clearPanier() {
        return await axios.delete(urlBase+'cart/clear');
    }
    return useMutation(clearPanier);
}

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

export async function UpdatePanier(productId, quantity){
    return useMutation(await axios.put(urlBase+'cart/modify-product-quantity/'+productId, {quantity: quantity}));
}

export async function AddPanier(productId, quantity){
    return useMutation(await axios.post(urlBase+'cart/add-product', {productId: productId, quantity: quantity}));
}

export async function DeletePanier(productId){
    return useMutation(await axios.delete(urlBase+'cart/remove-product/'+productId));
}

export async function ClearPanier(){
    return useMutation(await axios.delete(urlBase+'cart/clear'));
}

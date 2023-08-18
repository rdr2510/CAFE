import { useQuery, useMutation } from 'react-query'
import axios from 'axios';

const urlBase = 'https://insta-api-api.0vxq7h.easypanel.host/';

export function GetWishLists(){
    async function getWishLists() {
        const { data } = await axios.get(urlBase+'wishlist');
        return data;
    }
    return useQuery(['wishlist'], getWishLists);
}

export async function AddWishList(productId){
    return useMutation(await axios.post(urlBase+'wishlist/add-product/'+productId));
}

export async function DeleteWishList(productId){
    return useMutation(await axios.delete(urlBase+'wishlist/delete-product/'+productId));
}

export async function ClearWishList(){
    return useMutation(await axios.delete(urlBase+'wishlist/clear'));
}
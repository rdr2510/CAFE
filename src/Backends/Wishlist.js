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

export function AddWishList(){
    async function addWishlist({productId}){
        return await axios.post(urlBase+'wishlist/add-product', {productId: productId})
    }
    return useMutation(addWishlist);
}

export function DeleteWishList(){
    async function deleteWishList({productId}) {
        return await axios.delete(urlBase+'wishlist/delete-product/'+productId)
    }
    return useMutation(deleteWishList);
}

export function ClearWishList(){
    async function clearWishList() {
        return await axios.delete(urlBase+'wishlist/clear')
    }
    return useMutation(clearWishList);
}
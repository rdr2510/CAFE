import { useMutation, useQuery } from 'react-query'
import axios from 'axios';

const urlBase = 'https://insta-api-api.0vxq7h.easypanel.host/';

export function GetComments(productId){
    async function getComments(productId) {
        const {data}= await axios.get(urlBase+'comments?productId='+ productId);
        return data;
    }
    return useQuery(['comments', productId], ()=>getComments(productId));
}

export function AddComment(){
    async function addComment({productId, content}){
        return await axios.post(urlBase+'comments', {productId: productId, content: content})
    }
    return useMutation(addComment);
}

export function DeleteComment(){
    async function deleteComment({productId}) {
        return await axios.delete(urlBase+'comments/'+productId)
    }
    return useMutation(deleteComment);
}
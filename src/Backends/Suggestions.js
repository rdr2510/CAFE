import { useQuery, useMutation } from 'react-query'
import axios from 'axios';

const urlBase = 'https://insta-api-api.0vxq7h.easypanel.host/';

export function GetSuggestions(){
    async function getSuggestions() {
        const { data } = await axios.get(urlBase+'suggestions/recently-viewed-products');
        return data;
    }
    return useQuery(['suggestions'], getSuggestions);
}

export function DeleteSuggestions(){
    async function deleteSuggestions({productId}) {
        return await axios.delete(urlBase+'suggestions/recently-viewed-products/'+productId)
    }
    return useMutation(deleteSuggestions);
}
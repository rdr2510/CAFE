import { useQuery } from 'react-query'
import axios from 'axios';

const urlBase = 'https://insta-api-api.0vxq7h.easypanel.host/';

export function GetPromotions(){
    async function getPromotions() {
        const { data } = await axios.get(urlBase+'promotions');
        return data;
    }
    return useQuery(['promotions'], getPromotions);
}
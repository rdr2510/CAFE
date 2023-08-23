import { useQuery, useMutation } from 'react-query'
import axios from 'axios';

const urlBase = 'https://insta-api-api.0vxq7h.easypanel.host/';

export function GetCheckouts(){
    async function getCheckouts() {
        const { data } = await axios.get(urlBase+'checkout');
        return data;
    }
    return useQuery(['checkout'], getCheckouts);
}

export function AddCheckout(){
    async function addCheckout({
        contactEmail, contactName, contactFirstName, contactLastName,
        addressLine1, addressLine2, city, province, postalCode,
        contactPhone, creditCardNumber, creditCardExpirationMonth,
        creditCardExpirationYear, creditCardCvv, shippingMode,
        total, cartId}){
        return await axios.post(urlBase+'cart/add-product', {contactEmail: contactEmail,
            contactName: contactName,
            contactFirstName: contactFirstName,
            contactLastName: contactLastName,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            province: province,
            postalCode: postalCode,
            contactPhone: contactPhone,
            creditCardNumber: creditCardNumber,
            creditCardExpirationMonth: creditCardExpirationMonth,
            creditCardExpirationYear: creditCardExpirationYear,
            creditCardCvv: creditCardCvv,
            shippingMode: shippingMode,
            total: total,
            cartId: cartId})
    }
    return useMutation(addCheckout);
}
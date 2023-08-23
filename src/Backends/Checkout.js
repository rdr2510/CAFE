import { useQuery, useMutation } from 'react-query'
import axios from 'axios';

const urlBase = 'https://insta-api-api.0vxq7h.easypanel.host/';

export function GetCheckouts(){
    async function getCheckouts() {
        const { data } = await axios.get(urlBase+'checkout');
        let checkouts= {cartId: 0, products: [], subTotal: 0, taxe:0, grandTotal: 0};
        checkouts.cartId=  data.cartId;
        checkouts.products=  data.products.slice(0);
        checkouts.subTotal= 0;
        checkouts.taxe= 0;
        checkouts.grandTotal= 0;
        for (const item of data.products){
            checkouts.subTotal= checkouts.subTotal + (item.discountedPrice * item.quantity); 
        }
        checkouts.taxe= checkouts.subTotal * 14.975 / 100;
        checkouts.grandTotal= checkouts.subTotal + checkouts.taxe;
        return checkouts;
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
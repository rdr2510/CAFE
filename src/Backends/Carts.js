export class Carts{
    
    urlBase= '';

    constructor (urlBase){
       this.urlBase= urlBase; 
    }

    async getAll(){
        const url= this.urlBase+'cart';
        const response= await fetch(url, {method:'GET'});
        if (!response.ok) {
            const error= await response.json();
            throw error;
        }
        const carts= await response.json();
        return carts;
    }

    async update(productId, quantity){
        const url= this.urlBase+'cart/modify-product-quantity/'+ productId;
        const response= await fetch(url, {method: 'PATCH', body: JSON.stringify({quantity: quantity}), 
                                          headers: {'Content-type': 'application/json; charset=UTF-8'}
                                    });
        if (!response.ok) {
            const error= await response.json();
            throw error;
        }
    }

    async add(productId, quantity){
        const url= this.urlBase+'cart/add-product';
        const response= await fetch(url, {method: 'POST', body: JSON.stringify({productId: productId, quantity: quantity}), 
                        headers: {'Content-type': 'application/json; charset=UTF-8'}
                    });
        if (!response.ok) {
            const error= await response.json();
            throw error;
        }
    }

    async delete(id){
        const url= this.urlBase+'cart/remove-product/' + id;
        const response= await fetch(url, {method: 'DELETE'});
        if (!response.ok) {
            const error= await response.json();
            throw error;
        }
    }

    async clear(){
        const url= this.urlBase+'cart/clear';
        const response= await fetch(url, {method: 'DELETE'});

        if (!response.ok) {
            const error= await response.json();
            throw error;
        }
    }
}
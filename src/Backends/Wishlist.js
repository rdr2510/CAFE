export default class WishList{
    urlBase= '';

    constructor (urlBase){
       this.urlBase= urlBase; 
    }

    async getAll(){
        const url= this.urlBase+'wishlist';
        const response= await fetch(url, {method:'GET'});
        if (!response.ok) {
            const message = 'Ooops! Une erreur se produit, Code erreur: ' + response.status;
            throw new Error(message);
        }
        const wishlist= await response.json();
        return wishlist;
    }

    async add(productId){
        const url= this.urlBase+'wishlist/add-product';
        const response= await fetch(url, {method: 'POST', body: JSON.stringify({productId: productId}), 
                        headers: {'Content-type': 'application/json; charset=UTF-8'}
                    });
        if (!response.ok) {
            const error= await response.json();
            throw error;
        }
    }

    async delete(id){
        const url= this.urlBase+'wishlist/delete-product/' + id;
        const response= await fetch(url, {method: 'DELETE'});
        if (!response.ok) {
            const error= await response.json();
            throw error;
        }
    }

    async clear(){
        const url= this.urlBase+'wishlist/clear';
        const response= await fetch(url, {method: 'DELETE'});

        if (!response.ok) {
            const error= await response.json();
            throw error;
        }
    }
}
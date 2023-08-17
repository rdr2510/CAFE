export default class Suggestions{
    urlBase= '';

    constructor (urlBase){
       this.urlBase= urlBase; 
    }

    async getAll(){
        const url= this.urlBase+'suggestions/recently-viewed-products';
        const response= await fetch(url, {method:'GET'});
        if (!response.ok) {
            const error= await response.json();
            throw error;
        }
        const suggestions= await response.json();
        return suggestions;
    }

    async delete(id){
        const url= this.urlBase+'suggestions/recently-viewed-products/' + id;
        const response= await fetch(url, {method:'DELETE'});
        if (!response.ok) {
            const error= await response.json();
            throw error;
        }
    }
}
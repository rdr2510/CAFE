export default class Coffee{
    urlBase= '';
    

    constructor (urlBase){
       this.urlBase= urlBase; 
    }

    async getCoffee(){
        const url= this.urlBase+'coffees';
        const response= await fetch(url, {method:'GET'});
       
        if (!response.ok) {
            const error= await response.json();
            throw error;
        }
        const cafe= await response.json();
        console.log(cafe);
        return cafe;
       
    }
    
}
export class ItemCart {
    // Constructor publico para ser llamado desde cualquier parte del proyecto
    constructor(public productId:number,
                public productName:string,
                public quantity:number,
                public price:number) {}
    
    // Método para calcular el precio total del item en el carrito
    getTotalPriceItem(){
        return this.quantity * this.price;
    }
}

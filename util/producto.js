export default class Producto{
    #idProducto;
    #nombre;
    #precio;
    #category;
    #image;

    static #numInstancia = 0;
    constructor(n, p, c, i){
        this.#idProducto = "PROD-00"+Producto.#numInstancia++;
        this.#nombre = n;
        this.#precio = p;
        this.#category = c;
        this.#image = i;
    }

    get idProducto(){ return this.#idProducto }
    get nombre(){ return this.#nombre; };
    get precio(){ return this.#precio };
    get category(){ return this.#category }
    get image(){ return this.#image }

    set nombre(nuevoNombre){ this.#nombre = nuevoNombre };
    set precio(nuevoPrecio){ this.#nombre = nuevoPrecio };
    set category(nuevaCategory){ this.#nombre = nuevaCategory };
    set image(nuevaImage){ this.#nombre = nuevaImage };
}

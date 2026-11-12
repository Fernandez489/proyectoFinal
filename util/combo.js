export default class Combo{
    #idProducto;
    #nombre;
    #precio;
    #image;

    static #numInstancia = 0;
    constructor(n, p, i){
        this.#idProducto = "PROM-00"+Combo.#numInstancia++;
        this.#nombre = n;
        this.#precio = p;
        this.#image = i;
    }

    get idProducto(){ return this.#idProducto }
    get nombre(){ return this.#nombre; };
    get precio(){ return this.#precio };
    get image(){ return this.#image }

    set nombre(nuevoNombre){ this.#nombre = nuevoNombre };
    set precio(nuevoPrecio){ this.#nombre = nuevoPrecio };
    set image(nuevaImage){ this.#nombre = nuevaImage };
}
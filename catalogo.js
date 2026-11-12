import Combo from "./util/combo";
import Producto from "./util/producto";

/* const catalogData = [
    { 
        id: 'p1', 
        name: 'Pieza Individual', 
        price: 1800, 
        category: 'rolls', 
        image: './img/logo.jpeg' 
    },
    { 
        id: 'promo16', 
        name: 'Bandeja Individual 16 piezas', 
        price: 26000, 
        category: 'combos', 
        image: './img/bandeja.jpeg' 
    },
    { 
        id: 'promo30', 
        name: 'Promo 30 Piezas', 
        price: 37000, 
        category: 'combos', 
        image: './img/combo.jpeg' 
    }
];


const promoHighlights = [
    {
        id: 'promo16',
        name: 'Bandeja Individual 16 piezas',
        price: 26000,
        image: './img/bandeja.jpeg' 
    },
    {
        id: 'promo30',
        name: 'Promo 30 Piezas',
        price: 37000,
        image: './img/combo.jpeg' 
    }
]; */


let producto1 = new Producto('Pieza Individual', 1800, 'rolls', './img/logo.jpeg');

let combo1 = new Combo('Bandeja Individual 16 Piezas', 26000, 'combos', './img/bandeja.jpeg');
let combo2 = new Combo('Bandeja Individual 30 Piezas', 37000, 'combos', './img/combo.jpeg');

export const catalogo = [
    producto1,
    combo1,
    combo2
]

export const promos = [
    combo1,
    combo2
]
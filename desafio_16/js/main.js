// Definición de constantes y variables

const descuento=10;
const interes3=10;
const interes6=20;
const interes12=35;

let productos = [];

async function getProductos() {
        const URL = '../../js/data/data.json'
        const res = await fetch(URL)
        const data = await res.json()
        productos=data;
        return productos;
};

productos=getProductos();

let carrito = [];

let carritoGuardado = localStorage.getItem("Carrito");

// Si hay datos en storage, se actualizan las arrays. Aplicamos operador OR.

// carrito = JSON.parse(localStorage.getItem("Carrito")) || [];

if (carritoGuardado){
    carrito = JSON.parse(carritoGuardado);
} else {
    carrito = [];
}

// Ejecuto la impresión del carrito

renderCarrito();

let totalCarrito;
let tiposDeProductos;
let seleccion;
let producto;
let cantidad;
let forma_pago;
let cant_cuotas;
let pagoFinal;
let valor_cuota;
let mensaje_cuotas;
let resumen;
let input;


// Traigo elementos del HTML

const listaProductos = document.querySelector("#main");

const efeCuo = document.querySelector('#mediosDP');
const nroCuotas = document.querySelector('#cuotas');
const btnTotal = document.querySelector("#btnCalcularCompra");

const carritoHTML = document.querySelector("#carrito");

const borrarDeCarrito = document.querySelector("#lista-carrito");

const vaciarCarrito = document.querySelector("#vaciarCarrito");
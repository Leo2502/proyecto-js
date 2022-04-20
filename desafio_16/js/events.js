// Creo el evento y busco el botón para agregar producto al carrito

listaProductos.addEventListener("click", (e)=>{
    e.preventDefault();
    if(e.target.classList.contains("agregarCarrito")){
        seleccion=e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("id");
        cantidad=1
        agregarCarrito(e);


        // Actualizo el storage y meto los productos en el html en su pestaña

        guardarStorage("Carrito", JSON.stringify(carrito));
        renderCarrito();

        if (producto.stock>0){
            Toastify({
                text: "Agregado al carrito!",
                duration: 2000,
                position: 'center',
                style:{
                    background:'green',
                }
            }).showToast();
        }
    }  
});


// Selectores de pagos y cantidad de cuotas

efeCuo.addEventListener('change', (e) => {
    forma_pago=e.target.value;
    if(forma_pago=="cuotas"){
        nroCuotas.classList.remove("d-none");
        btnTotal.classList.add("d-none");
    } else if (forma_pago=="efectivo"){
        btnTotal.classList.remove("d-none");
        nroCuotas.classList.add("d-none");
    }
    if ((forma_pago!="cuotas")&&(forma_pago!="efectivo")){
        btnTotal.classList.add("d-none");
    }
    return forma_pago;
});

nroCuotas.addEventListener('change', (e) => {
    cant_cuotas=parseInt(e.target.value);
    if ((cant_cuotas===3)||(cant_cuotas===6)||(cant_cuotas===12)) {
        btnTotal.classList.remove("d-none");
    } else {
        btnTotal.classList.add("d-none");
    }
    return cant_cuotas
});


// Elimino un objeto del carrito

borrarDeCarrito.addEventListener("click", e=>{
    e.preventDefault();
    if(e.target.classList.contains("borrar-producto")){
        const productoId=e.target.getAttribute("id");
        carrito.forEach(producto=>{
            if(producto.nombre==productoId){
                let volverAStock=producto.cantidad;
                regresarStock(volverAStock, producto);
            }
        })
        carrito=carrito.filter(producto=>producto.nombre!==productoId);
        renderCarrito();
        guardarStorage("Carrito",carrito);
    }
})


// Botón para vaciar carrito

vaciarCarrito.addEventListener("click", e=>{
    e.preventDefault();
    carrito.forEach(producto=>{
        let volverAStock=producto.cantidad;
        regresarStock(volverAStock, producto);
    })
    carrito = [];
    renderCarrito();
    guardarStorage("Carrito","");
})


// Botón para calcular la compra realizada

btnTotal.addEventListener("click", calcularTotal);
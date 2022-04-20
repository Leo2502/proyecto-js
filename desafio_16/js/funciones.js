// Verificación de stock del producto seleccionado

function verStock(seleccion, e){
    producto = productos.find(producto=>producto.nombre==seleccion);
    if(producto.stock==0){


        // Muestro alerta en caso de que no haya stock

        Toastify({
            text: "Producto sin stock. Por favor, escoja otro",
            duration: 2000,
            position: 'center',
            style:{
                background:'red',
            }
        }).showToast();
        e.target.textContent="Sin Stock";
        e.target.parentElement.classList.add("productos__container__item--sin-stock");
    } else {

        
        // Si hay stock, devuelvo el producto

        return producto;
    }
}

// Después de todas las verificaciones se agregan los productos al carrito y se actualiza el stock

function agregarCarrito(e){
    verStock(seleccion, e);
    if (cantidad<=producto.stock){
        producto.stock-=1;
        producto.cantidad=1;

        
        // Creo nuevo objeto para agregar al carrito

        const productoCarrito={
            nombre:producto.nombre,
            precio:producto.precio,
            cantidad:producto.cantidad,
        }

        const {nombre,precio}=productoCarrito;


        // Verifico si existe para modificar la cantidad

        const existe = carrito.some(producto=>producto.nombre===nombre)
        if (existe){
            const buscarProducto = carrito.map(producto=>{
                if(producto.nombre==nombre){
                    producto.cantidad++;
                    producto.precio+=precio;
                    return producto;
                } else {
                    return producto;
                }
            });
            carrito=[...buscarProducto];
        } else {
            carrito=[...carrito, productoCarrito];
        }
    }
    console.log(carrito);
};


// Se agregan los productos a la pestaña de Carrito del html

function renderCarrito(){
    let pestanaCarrito = document.querySelector(".navbarDropdown-carrito");

    // Limpio la pestaña del html

    while(pestanaCarrito.firstChild){
        pestanaCarrito.removeChild(pestanaCarrito.firstChild);
    }

    // Recorro los objetos del carrito

    carrito.forEach(producto=>{
        const {nombre,precio,cantidad}=producto;

        let detalle = document.createElement("div");
        detalle.innerHTML = `<li><a class="dropdown-item">${cantidad} - ${nombre} - $${precio}</a></li>
                             <li><a style="font-size:0.75em" class="dropdown-item m-0 borrar-producto" href=# id="${nombre}">Eliminar</a></li>`;
        pestanaCarrito.appendChild(detalle);
    });
};


// Regresar el stock a los productos

function regresarStock(volverAStock, producto){
    productos.forEach(element=>{
        if(element.nombre==producto.nombre){
            element.stock+=volverAStock;
            console.log(productos);
        }
    })
}


// Cálculo de pago final al pagar en cuotas

function pagoTotal(cant_cuotas, totalCarrito){
    if (cant_cuotas==3){
        pagoFinal=totalCarrito*(1+(interes3/100));
    }else if (cant_cuotas==6){
        pagoFinal=totalCarrito*(1+(interes6/100));
    }else if(cant_cuotas==12){
        pagoFinal=totalCarrito*(1+(interes12/100));
    }
    return pagoFinal;
}


// Cálculo de valor de cada cuota para conocimiento del usuario

function valorCuota(cant_cuotas, pagoFinal){
    if (cant_cuotas==3){
        valor_cuota=pagoFinal/3;
    }else if (cant_cuotas==6){
        valor_cuota=pagoFinal/6;
    }else if(cant_cuotas==12){
        valor_cuota=pagoFinal/12;
    }
    return valor_cuota;
}

// Mensaje de % interés aplicado

function infoCuota(cant_cuotas){
    if (cant_cuotas==3){
        interesCuota="10%";
    }else if (cant_cuotas==6){
        interesCuota="20%";
    }else if(cant_cuotas==12){
        interesCuota="35%";
    }
    return interesCuota;
}


// Redonde de decimales a 2

function dosDecimales(redondear) {  
    return +(Math.round(redondear + "e+2")  + "e-2");
}


// Defino función para guardar los movimientos de los productos

const guardarStorage = (k, v) => { localStorage.setItem(k, v) };
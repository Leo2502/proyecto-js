// Cálculo final de productos en carrito

function calcularTotal(){

    totalCarrito=carrito.reduce((total,producto)=>total+producto.precio,0);
        if (forma_pago=="cuotas"){


            // Cálculo de pago si se hace en cuotas

            pagoFinal=pagoTotal(cant_cuotas, totalCarrito);
            pagoFinal=dosDecimales(pagoFinal);
            valor_cuota=valorCuota(cant_cuotas, pagoFinal);
            valor_cuota=dosDecimales(valor_cuota);
            interesCuota=infoCuota(cant_cuotas);
            resumen = `Su elección cuesta un total de $ ${totalCarrito}<br>Si usted pagara en ${cant_cuotas} ${forma_pago} el total por cuota sería de $ ${valor_cuota}<br><br>Su pago total con ${interesCuota} de interés sería de <strong>$ ${pagoFinal}</strong><br><br>Detalle de su compra:`;
        } else {
            pagoFinal=totalCarrito*(1-(descuento/100));
            pagoFinal=dosDecimales(pagoFinal);
            resumen =`Su elección cuesta un total de $ ${totalCarrito}<br>Si usted pagara en ${forma_pago} su pago total con ${descuento} % de descuento sería de <strong>$ ${pagoFinal}</strong><br><br>Detalle de su compra:`;
        }


        // Cambio de DOM

        let listadoProductos=document.querySelector("#main");
        listadoProductos.remove();
        let opciones = document.querySelector("#opciones");
        opciones.remove();


        // Mostramos la detalle de los productos seleccionados

        const titulo = document.querySelector("#Title");
        titulo.innerText="Calculo de compra"

        carritoHTML.style.padding="1em";

        let parrafo = document.createElement("p");
        parrafo.innerHTML= "Resumen: ";
        carritoHTML.appendChild(parrafo);

        let listado =document.createElement("p");
        listado.innerHTML=resumen;
        carritoHTML.appendChild(listado);

        carrito.forEach(producto=>{
            const {nombre,precio,cantidad}=producto;
            productos.forEach(elemento=>{
                if (elemento.nombre==nombre){
                    elemento.vendido=true;
                    elemento.cantidad=cantidad;
                }
            })
            let detalle = document.createElement("div");
            detalle.innerHTML = `<li>${cantidad} - ${nombre} - $${precio}</li>`;
            detalle.style.marginLeft="2em";
            carritoHTML.appendChild(detalle);
        });


        // Realizada la compra, vaciamos el carrito del storage

        guardarStorage("Carrito", "");
        guardarStorage("Productos", productos);
}
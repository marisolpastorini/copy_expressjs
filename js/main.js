//CARRITO
let anuncio = document.getElementById("infopromociones");

//----- PRINCIPAL --------- 
anuncio.innerHTML = "TODO LO QUE NECESITAS PARA PROMOCIONAR A TU NEGOCIO!";

window.onload = function () {
            // Variables
            let $items = document.querySelector('#items');
            let carrito = [];
            let total = 0;
            let $carrito = document.querySelector('#carrito');
            let $total = document.querySelector('#total');
            let $botonVaciar = document.querySelector('#boton-vaciar');

            // Funciones
            function renderItems() {
                for (let info of baseDeDatos) {

                    let miNodo = document.createElement('div');
                    miNodo.classList.add('card', 'col-sm-3','mt-3', 'ml-5');

                    let miNodoCardBody = document.createElement('div');
                    miNodoCardBody.classList.add('card-body');

                    let miNodoTitle = document.createElement('h5');
                    miNodoTitle.classList.add('card-title');
                    miNodoTitle.textContent = info['nombre'];

                    let miNodoImagen = document.createElement('img');
                    miNodoImagen.classList.add('img-fluid');
                    miNodoImagen.setAttribute('src', info['imagen']);

                    let miNodoPrecio = document.createElement('p');
                    miNodoPrecio.classList.add('card-text');
                    miNodoPrecio.textContent = '$' + info['precio'];

                    let miNodoBoton = document.createElement('button');
                    miNodoBoton.classList.add('btn', 'btn-secondary');
                    miNodoBoton.textContent = '+';
                    miNodoBoton.setAttribute('marcador', info['id']);
                    miNodoBoton.addEventListener('click', anyadirCarrito);

                    miNodoCardBody.appendChild(miNodoImagen);
                    miNodoCardBody.appendChild(miNodoTitle);
                    miNodoCardBody.appendChild(miNodoPrecio);
                    miNodoCardBody.appendChild(miNodoBoton);
                    miNodo.appendChild(miNodoCardBody);
                    $items.appendChild(miNodo);
                }
            }

            function anyadirCarrito () {
                carrito.push(this.getAttribute('marcador'))
                calcularTotal();
                renderizarCarrito();
            }

            function renderizarCarrito() {
                $carrito.textContent = '';
                let carritoSinDuplicados = [...new Set(carrito)];
                carritoSinDuplicados.forEach(function (item, indice) {
                    let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                        return itemBaseDatos['id'] == item;
                    });
                    let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
                        return itemId === item ? total += 1 : total;
                    }, 0);
                    let miNodo = document.createElement('li');
                    miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
                    miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} - $${miItem[0]['precio']}`;
                    let miBoton = document.createElement('button');
                    miBoton.classList.add('btn', 'btn-secondary', 'mx-5');
                    miBoton.textContent = 'X';
                    miBoton.style.marginLeft = '1rem';
                    miBoton.setAttribute('item', item);
                    miBoton.addEventListener('click', borrarItemCarrito);
                    miNodo.appendChild(miBoton);
                    $carrito.appendChild(miNodo);
                })
            }

            function borrarItemCarrito() {
                console.log()
                let id = this.getAttribute('item');
                carrito = carrito.filter(function (carritoId) {
                    return carritoId !== id;
                });
                renderizarCarrito();
                calcularTotal();
            }

            function calcularTotal() {
                total = 0;
                for (let item of carrito) {
                    let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                        return itemBaseDatos['id'] == item;
                    });
                    total = total + miItem[0]['precio'];
                }
                let totalDosDecimales = total.toFixed(2);
                $total.textContent = totalDosDecimales;
            }

            function vaciarCarrito() {
                carrito = [];
                renderizarCarrito();
                calcularTotal();
            }

            $botonVaciar.addEventListener('click', vaciarCarrito);

            renderItems();
        } 
   

// Buscar productos
$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myDIV .card*").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});


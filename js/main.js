// ***************************************************************************************************
// En este sector creamos las tarjetas con las fotos de los productos y las insertamos en el html.
// ***************************************************************************************************

class Producto {
    constructor(id,nombre,modelo,color,precio,categoria,cantidad,imagenURL){
        this.id = id;
        this.nombre = nombre;
        this.modelo = parseInt(modelo);
        this.color = color;
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        this.categoria = categoria;
        this.imagenURL = imagenURL;
    }
};


// Creamos los productos una vez que el usuario llenó el formulario e hizo click en el bonton GUARDAR PRODUCTO.
let productosGuardar = [
    { "cantidad": 20, "categoria": "Llantas", "color": "negro", "id": 1, "imagenURL": "../img/llantas/Llanta_trasera_8.png", "modelo": 2020, "nombre": "Llantas Trasera 8", "precio": 9000 },
    { "cantidad": 20, "categoria": "Carrocería", "color": "Rojo", "id": 2, "imagenURL": "../img/trompa/trompa_tierra_2015_roja.png", "modelo": 2022, "nombre": "Trompa", "precio": 4500},
    { "cantidad": 20, "categoria": "Carrocería", "color": "Blanca", "id": 3, "imagenURL": "../img/trompa/trompa_tierra_2015_blanca.png", "modelo": 2022, "nombre": "Trompa", "precio": 5000},
    { "cantidad": 20, "categoria": "Carrocería", "color": "negro", "id": 4, "imagenURL": "../img/corbata/corbata_2014_negro.png", "modelo": 2021, "nombre": "Corbata", "precio": 4000},
    { "cantidad": 20, "categoria": "llantas", "color": "negro", "id": 5, "imagenURL": "../img/llantas/Llanta_delantera_5.png", "modelo": 2021, "nombre": "Llantas Delantera 5", "precio": 8000}
];



// *****************************************************************************************************
// En la interfas de usuario creamos las funciones para crear producto, borrarlo, mostrar alertas, etc.
// *****************************************************************************************************

class UI {
    crearProducto(producto){
        const {id,nombre,modelo,color,precio,cantidad,categoria,imagenURL} = producto;
        const ProductosHTML = document.getElementById('ListaProdCreados');
        let contenedor = document.createElement("div");
        contenedor.innerHTML = `<image src="${imagenURL}" alt="${nombre}" width=100></image>
                                <div><strong>ID: </strong>${id}</div>
                                <div><strong>Categoría: </strong>${categoria}</div>
                                <div><strong>Nombre: </strong>${nombre}</div>
                                <div><strong>Modelo: </strong>${modelo}</div>
                                <div><strong>Color: </strong>${color}</div>
                                <div><strong>Precio: </strong>${precio}</div>
                                <div><strong>Cantidad: </strong>${cantidad}</div>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" id="${id}" name="borrar"></button>`;
        ProductosHTML.appendChild(contenedor);
        contenedor = contenedor.setAttribute("class","alert alert-dismissible alert-light ProdCreados");
    }
    crearListado(){
        listaProductosG.forEach(element => {
            const {id,nombre,modelo,color,precio,cantidad,categoria,imagenURL} = element;
            let contenedor = document.createElement("div");
            contenedor.innerHTML = `<image src="${imagenURL}" alt="${nombre}" width=100></image>
                                    <div><strong>ID: </strong>${id}</div>
                                    <div><strong>Categoría: </strong>${categoria}</div>
                                    <div><strong>Nombre: </strong>${nombre}</div>
                                    <div><strong>Modelo: </strong>${modelo}</div>
                                    <div><strong>Color: </strong>${color}</div>
                                    <div><strong>Precio: </strong>${precio}</div>
                                    <div><strong>Cantidad: </strong>${cantidad}</div>
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" id="${id}" name="borrar"></button>`;
            ListaProdHTML.appendChild(contenedor);
            contenedor = contenedor.setAttribute("class","alert alert-dismissible alert-light ProdCreados");
            }
        )
    };
    crearTarjeta(){
        listaProductosG.forEach(element => {
            const {id,nombre,modelo,color,precio,cantidad,categoria,imagenURL} = element;
            let contenedor = document.createElement("div");
            contenedor.innerHTML = `<div class="tarjeta">
                                        <div class="tarjeta2">
                                            <div id="${id}" class="carousel carousel-dark slide" data-bs-ride="carousel">
                                                <div class="carousel-inner">
                                                    <div class="carousel-item active">
                                                        <img src="${imagenURL}" class="d-block w-100" alt="${nombre}">
                                                        <div class="tarjeta__descripcion">
                                                            <h2>${nombre}</h2>
                                                            <div class="precio">
                                                                <h3>Precio:</h3>
                                                                <span>$${precio}</span>
                                                            </div>
                                                            <div class="color">
                                                                <h3>Color:</h3>
                                                                <span class="${color} activo"></span>
                                                            </div>
                                                            <a id = "comprar" href="#">Comprar</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
            mostrarProductoHTML.appendChild(contenedor);
            // contenedor = contenedor.setAttribute("class","alert alert-dismissible alert-light ProdCreados");
            }
        );
    };

    resetearFormulario(){
        document.getElementById('creaProducto__form').reset();
    }
    borrarProducto(contenedor){
        if (contenedor.name == "borrar"){
            contenedor.parentElement.remove()
        }
            // let productos = JSON.parse(localStorage.getItem("listaProductos"));
            // delete productos[contenedor.id];
            // localStorage.setItem("listaProductos",JSON.stringify(productos));
    }
    mostrarMensaje(mensaje,classCSS){
        const divMensaje = document.createElement('div');
        divMensaje.setAttribute("class",`alert alert-dismissible alert-${classCSS}`);
        divMensaje.appendChild(document.createTextNode(mensaje));
        // Para mostrar en pantalla
        const contMensaje = document.querySelector('.creaProducto');
        const fieldset = document.querySelector('.fieldset');
        contMensaje.insertBefore(divMensaje, fieldset);
        setTimeout(function (){
            document.querySelector('.alert').remove()
        },3000);
    }

    // procesarImagen(file){
    //     const docType = file.type;
    //     const validarExtension = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    //     validarExtension.includes(docType) ?  : mostrarMensaje('¡No ingresó una imagen!','primary')
    // }
}

// *****************************************************************************************************
// Capturamos los elementos desde el document y llamamos a UI para responder al usuario.
// *****************************************************************************************************
let listaProductosG = JSON.parse(localStorage.getItem("listaProductos"));

function CapturaDeForm (){
        formularioCaptura.addEventListener('submit', function(e){
            const id = productosGuardar.length + 1;
            const nombre = document.getElementById('nombreProducto').value;
            const modelo = document.getElementById('modeloProducto').value;
            const color = document.getElementById('colorProducto').value;
            const precio = document.getElementById('precioProducto').value;
            const categoria = document.getElementById('categoriaProducto').value;
            const cantidad = document.getElementById('cantidadProducto').value;
            const [archivoPATH] = document.getElementById('imagenProducto').files;
            
            // convertimos el archivo de imagen en una URL
            let imagenURL = "";
            
            archivoPATH && (imagenURL = URL.createObjectURL(archivoPATH));

            // utilizamos la interfaz de usuario para agregar los productos a la pantalla o mostrar mensajes.
            const ui = new UI();

            if( !nombre  || !modelo || !color || !precio || !categoria || !cantidad ){
                return ui.mostrarMensaje('¡Completa todos los campos!','primary')
            }
            // Creamos los objetos y los guardamos en un arreglo
            const productos = new Producto(id,nombre,modelo,color,precio,categoria,cantidad,imagenURL);
            productosGuardar.push(productos);

            localStorage.setItem("listaProductos",JSON.stringify(productosGuardar));

            ui.crearProducto(productos);

            ui.mostrarMensaje('¡Producto agregado correctamente!','success');
            
            // Enviamos a resetar el formulario, por ahora no lo uso porque me interesa que no lo haga.
            // ui.resetearFormulario(); 

            e.preventDefault();
        }
    )
};
// llamamo a la funcion CapturarDeForm
const formularioCaptura = document.getElementById('creaProducto__form');
formularioCaptura && CapturaDeForm ();

// llamamo a la funcion crearProducto
const ListaProdHTML = document.getElementById('ListaProd');
ListaProdHTML && new UI().crearListado();

// llamamo a la funcion crearTarjeta
let mostrarProductoHTML = document.getElementById('estructura_prod');
mostrarProductoHTML && new UI().crearTarjeta();


// Eliminamos los productos al hacer click en el boton borrar
const ProdCreados = document.getElementById('ListaProdCreados')
function borrarLista(){
    ProdCreados.addEventListener('click', function(e){
        console.log(e.target);
        const ui = new UI();
        ui.borrarProducto(e.target);
        ui.mostrarMensaje('¡Producto fue eliminado correctamente!','info');
        }
    )
}

ProdCreados && borrarLista();
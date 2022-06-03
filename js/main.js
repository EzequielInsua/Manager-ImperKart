// ***************************************************************************************************
// Creamos los productos con las fotos de los productos y las insertamos en el html.
// ***************************************************************************************************

// Creamos los productos una vez que el usuario llenó el formulario e hizo click en el bonton GUARDAR PRODUCTO.

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


// Variable donde tenemos precargados productos y vamos a guardar los productos anteriores.
document.addEventListener('DOMContentLoaded', () => {
    traerDatosJson();
})
let productosGuardar;
let listaProductosG;
const traerDatosJson = async () =>{
    let response = await fetch("../json/api.json");
    let data = await response.json();
    productosGuardar = data;
    localStorage.setItem("listaProductos",JSON.stringify(productosGuardar));
    listaProductosG = JSON.parse(localStorage.getItem("listaProductos"));
    
    const ListaProdHTML = document.getElementById('ListaProd');
    ListaProdHTML && new UI().crearListado(listaProductosG);

    const mostrarProductoHTML = document.getElementById('estructura_prod');
    mostrarProductoHTML && new UI().crearTarjeta(listaProductosG);

}

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
        contenedor.setAttribute("class","alert alert-dismissible alert-light ProdCreados");

        contenedor.addEventListener('click', function(e){
            const ui = new UI();
            ui.borrarProducto(e.target);
            }
        )
    }
    crearListado(data){
        console.log(data);
        data.forEach(element => {
            this.crearProducto(element);
            }
        )
    };
    crearTarjeta(data){
        console.log(data);
        const mostrarProductoHTML = document.getElementById('estructura_prod');
        data.forEach(element => {
            const {id,nombre,modelo,color,precio,cantidad,categoria,imagenURL} = element;
            let contenedor = document.createElement("div");
            contenedor.innerHTML = `<div class="tarjeta">
                                        <div class="tarjeta2">
                                            <div  class="carousel carousel-dark slide" data-bs-ride="carousel">
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
                                                                <span class="${color}"></span>
                                                            </div>
                                                            <a id="${id}" class="comprar" href="#">Comprar</a>
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
            swal({
                title: "¿Estás seguro?",
                text: "¡Una vez eliminado, no podrás recuperar este Producto!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
                swal(`Poof! ¡Tu Producto ha sido eliminado!`, {
                icon: "success",
                }
            );
            let productos = JSON.parse(localStorage.getItem("listaProductos"));
            let itemIndex = productos.findIndex( e => e.id == contenedor.id);
            productos.splice(itemIndex , 1);
            localStorage.setItem("listaProductos",JSON.stringify(productos));

            contenedor.parentElement.remove();
            } else {
                swal(`¡Tu Producto está a salvo!`);
            }
            });
            
            // let productos = JSON.parse(localStorage.getItem("listaProductos"));
            // delete productos[contenedor.id];

        }
    }

    // procesarImagen(file){
    //     const docType = file.type;
    //     const validarExtension = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    // }
}

// *****************************************************************************************************
// Capturamos los elementos desde el document y llamamos a UI para responder al usuario.
// *****************************************************************************************************
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
                return swal("¡Lo siento!", "¡Completa todos los campos, por favor!", "error");
            }
            // Creamos los objetos y los guardamos en un arreglo
            const productos = new Producto(id,nombre,modelo,color,precio,categoria,cantidad,imagenURL);
            ui.crearProducto(productos);
            productosGuardar.push(productos);
            localStorage.getItem("listaProductos",JSON.stringify(productosGuardar));
            swal("¡Gran Trabajo!", "El producto se guardó correctamente!", "success");
            
            // Enviamos a resetar el formulario, por ahora no lo uso porque me interesa que no lo haga.
            // ui.resetearFormulario(); 

            e.preventDefault();
        }
    )
};
// llamamo a la funcion CapturarDeForm
const formularioCaptura = document.getElementById('creaProducto__form');
formularioCaptura &&  CapturaDeForm ()

// // llamamo a la funcion crearProducto
// const ListaProdHTML = document.getElementById('ListaProd');
// ListaProdHTML && new UI().crearListado()

// // llamamo a la funcion crearTarjeta
// let mostrarProductoHTML = document.getElementById('estructura_prod');
// mostrarProductoHTML && new UI().crearTarjeta(productosGuardar);

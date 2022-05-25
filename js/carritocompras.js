document.getElementById('comprar')
    .addEventListener('click', function(e){
        const ui = new UI();
        ui.borrarProducto(e.target);
        ui.mostrarMensaje('¡Producto fue eliminado correctamente!','info');
    }
); 
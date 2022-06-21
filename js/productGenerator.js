class Product {

    constructor(id,name,model,color,price,category,amount,imageURL){
        this.id = id;
        this.name = name;
        this.model = parseInt(model);
        this.color = color;
        this.price = parseFloat(price);
        this.amount = parseInt(amount);
        this.category = category;
        this.imageURL = imageURL;
        this.added = false;
        this.quantity = 1;
    }

    create(){
        const captureForm = document.getElementById('productCreator__form');
        captureForm.addEventListener('submit', function(e){     
            const id = ProductList_LS.length + 1;
            const name = document.getElementById('productName').value;
            const model = document.getElementById('productModel').value;
            const color = document.getElementById('productColor').value;
            const price = document.getElementById('productPrice').value;
            const category = document.getElementById('productCategory').value;
            const amount = document.getElementById('productAmount').value;
            const [filePATH] = document.getElementById('productImage').files;

            // convertimos el archivo de imagen en una URL
            let imageURL = "";
            filePATH && (imageURL = URL.createObjectURL(filePATH));
            // imageURL = filePATH.mozFullPath;

            // utilizamos la interfaz de usuario para agregar los productos a la pantalla o mostrar mensajes.
            if( !name  || !model || !color || !price || !category || !amount ){
                return swal("¡Lo siento!", "¡Completa todos los campos, por favor!", "error");
            }
            
            // Creamos los objetos y los guardamos en un arreglo
            const product = new Product(id,name,model,color,price,category,amount,imageURL);
            console.log (product);
            console.log(ProductList_LS);
            ProductList_LS.push(product);
            console.log(ProductList_LS);
            localStorage.setItem("productList",JSON.stringify(ProductList_LS));
            new UI().showProduct(product);

            swal("¡Gran Trabajo!", "El producto se guardó correctamente!", "success");

            // Enviamos a resetar el formulario, por ahora no lo uso porque me interesa que no lo haga.
            document.getElementById('productCreator__form').reset();
            e.preventDefault();
            }
        );
    };

    delete(container){
        if (container.name == "delete"){
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
            let products = JSON.parse(localStorage.getItem("productList"));
            let itemIndex = products.findIndex( e => e.id == container.id);
            products.splice(itemIndex , 1);
            localStorage.setItem("productList",JSON.stringify(products));

            container.parentElement.parentElement.remove();
            } else {
                swal(`¡Tu Producto está a salvo!`);
            }
            });
        }
    }
};



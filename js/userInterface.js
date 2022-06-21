class UI {
    showCard(data){
        const ProductHTML = document.getElementById('productStructure');
        
        data.forEach(element => {
            const {id,name,color,price,imageURL} = element;
            let container = document.createElement("div");        
            container.innerHTML = `<div class="card_back">
                                        <div class="card2">
                                            <div  class="carousel carousel-dark slide" data-bs-ride="carousel">
                                                <div class="carousel-inner">
                                                    <div class="carousel-item active">
                                                        <img src="${imageURL}" class="d-block w-100" alt="${name}">
                                                        <div class="cardDescription">
                                                            <h2>${name}</h2>
                                                            <div class="price">
                                                                <h3>Precio:</h3>
                                                                <span>$${price}</span>
                                                            </div>
                                                            <div class="color">
                                                                <h3>Color:</h3>
                                                                <span class="${color}"></span>
                                                            </div>
                                                            <a id="${id}" name="comprar" class="comprar" href="#">Comprar</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
            ProductHTML.appendChild(container);
            container.addEventListener('click', function(e){
                new Card().productAdded(e.target);
                }
            )
            // contenedor = contenedor.setAttribute("class","alert alert-dismissible alert-light ProdCreados");
            }
        );
    }
    clearShowCard(){
        const ProductHTML = document.getElementById('productStructure');
        ProductHTML.innerHTML = '';
    }
    tableCreate(product){
        product.forEach(element => {
            const {id,name,model,color,price,amount,category,imageURL} = element;
            const ProductHTML = document.getElementById('tbody');
                let container = document.createElement("tr");
                container.innerHTML =  `
                                        <th scope="row"><image src="${imageURL}" alt="${name}" width=100></image></th>
                                        <td>${name}</td>
                                        <td>${model}</td>
                                        <td>${color}</td>
                                        <td>${price}</td>
                                        <td>${category}</td>
                                        <td>${amount}</td>
                                        <td>
                                            <button type="button" class="btn-close" data-bs-dismiss="alert" id="${id}" name="delete"></button>
                                        </td>`;
                ProductHTML.appendChild(container);
                container.addEventListener('click', function(e){
                    new Product().delete(e.target);
                    }
                )
        } );
    };
    showProduct(product){
        const {id,name,model,color,price,amount,category,imageURL} = product;
        const ProductHTML = document.getElementById('newProducts');
        let container = document.createElement("div");
        container.innerHTML = `<image src="${imageURL}" alt="${name}" width=100></image>
                                <div><strong>ID: </strong>${id}</div>
                                <div><strong>Categoría: </strong>${category}</div>
                                <div><strong>Nombre: </strong>${name}</div>
                                <div><strong>Modelo: </strong>${model}</div>
                                <div><strong>Color: </strong>${color}</div>
                                <div><strong>Precio: </strong>${price}</div>
                                <div><strong>Cantidad: </strong>${amount}</div>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" id="${id}" name="delete"></button>`;
        ProductHTML.appendChild(container);
        container.setAttribute("class","alert alert-dismissible alert-light productCreated");
        container.addEventListener('click', function(e){
            new Product().delete(e.target);
            }
        )
    }
}
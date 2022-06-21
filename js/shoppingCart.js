let emptyCard = document.querySelector('#emptyCard');
let checkout = document.querySelector('#checkout');
let totalHTML = document.querySelector("#total");
let search = document.querySelector("#search");

class Card{
    productAdded(container){
        if (container.name == "comprar"){
            swal(`¡El Producto fue agregado a tu lista de deseos!`);
            let productAddList = [];
            let products = JSON.parse(localStorage.getItem("productList"));
            let itemIndex = products.findIndex( e => e.id == container.id);
            let productAdd = products.splice(itemIndex , 1)[0];
            
            if (localStorage.getItem("LSproductAddList") === null){
                productAddList.push(productAdd);
                localStorage.setItem("LSproductAddList",JSON.stringify(productAddList));
                this.showlistProduct();
                this.totalCaluculate();
                console.log(JSON.parse(localStorage.getItem("LSproductAddList")));
            }
            else{
                JS_productAddList = JSON.parse(localStorage.getItem("LSproductAddList"));
                JS_productAddList.push(productAdd);
                localStorage.setItem("LSproductAddList",JSON.stringify(JS_productAddList));
                this.showlistProduct();
                this.totalCaluculate()
            }

        }
    }
    showlistProduct(){
        JS_productAddList = JSON.parse(localStorage.getItem("LSproductAddList"));
        if (JS_productAddList === null){
            return;
        }
        else{
            const ProductHTML = document.getElementById('tbody2');
            ProductHTML.innerHTML = '';
            JS_productAddList.forEach(element => {
            let container = document.createElement("tr");
            const {id,name,price,imageURL,amount,quantity} = element;
            container.innerHTML =  `
                                    <th scope="row"><image src="${imageURL}" alt="${name}" width=100></image></th>
                                    <td>${name}</td>
                                    <td>${price}</td>
                                    <td>
                                        <input id="quantity"
                                            type="number" 
                                            class="d-inline-block " 
                                            size="2" 
                                            value=${quantity} 
                                            min="0"
                                            onChange="new Card().setQuantity(value,${id})">
                                    </td>`;
            ProductHTML.appendChild(container);
            console.log(quantity);

                emptyCard.addEventListener('click', () => {
                    localStorage.removeItem("LSproductAddList");

                    this.showlistProduct(JS_productAddList);
                    this.totalCaluculate();
                    setTimeout(location.reload(), 100) ;
                });

                checkout.addEventListener('click', () => {
                    localStorage.removeItem("LSproductAddList");
                    this.showlistProduct();
                    this.totalCaluculate();
                    swal(`¡Tu compra fue realizada correctamente!`);
                    setTimeout(location.reload(), 3100) ;
                });
            } );
        }
    }
    searchProducts(){
        search.addEventListener("keyup", (event) => {
            event.target.matches("#search");
            console.log(event.target.value);
            const text = event.target.value.toLowerCase();
            console.log(text);
            let prodList
            if (text.length > 0){
                prodList = ProductList_LS.filter((e) => {
                return e.name.toLowerCase().indexOf(text) !== -1 });
                
            }
            else {
                prodList = ProductList_LS;
            }
            new UI().clearShowCard();
            new UI().showCard(prodList);
        });
        
    }
    setQuantity(value,id){
        let products = JSON.parse(localStorage.getItem("LSproductAddList"));
        let itemIndex = products.findIndex( e => e.id == id);
        let product = products.splice(itemIndex , 1)[0];
        product.quantity = value;
        products.push(product);
        localStorage.setItem("LSproductAddList",JSON.stringify(products));
        this.totalCaluculate();
    }
    totalCaluculate(){
        let total = 0;
        let products = JSON.parse(localStorage.getItem("LSproductAddList"));
        if (!products){    
            total = 0;
            totalHTML.textContent = total;
        }
        else{
            total = 0;
            products.forEach(element => {
                const {quantity,price} = element
                total += parseInt(quantity) * parseInt(price)
                console.log(total);
            }); 
            totalHTML.textContent = total;
            console.log(total);
        }
        console.log(total);
        
    }
}
new Card().searchProducts();

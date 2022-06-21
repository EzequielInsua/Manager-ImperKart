let productSave;
let ProductList_LS;
let JS_productAddList;

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("productList") === null) {
        JsonData();
        execute();
    }
    else {
        ProductList_LS = JSON.parse(localStorage.getItem("productList"));
        execute();
    };
})

const JsonData = async () =>{
    let response = await fetch("../json/api.json");
    let data = await response.json();
    productSave = data;
    localStorage.setItem("productList", JSON.stringify(productSave));
    ProductList_LS = JSON.parse(localStorage.getItem("productList"));
    execute();
}

const execute = async () =>{
    JS_productAddList = JSON.parse(localStorage.getItem("LSproductAddList"));

    const captureForm_HTML = document.getElementById('productCreator__form');
    captureForm_HTML && new Product().create();

    const ProductList_HTML =  document.getElementById('tbody');
    ProductList_HTML && new UI().tableCreate(ProductList_LS);

    const ProductAdd_HTML = document.getElementById('tbody2');
    ProductAdd_HTML && new Card().showlistProduct(JS_productAddList);
    ProductAdd_HTML && new Card().totalCaluculate();

    
    const ProductCards_HTML = document.getElementById('productStructure');
    ProductCards_HTML && new UI().showCard(ProductList_LS);
};

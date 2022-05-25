// *****************************************************************************************************
// Capturamos los clicks y escondemos o mostramos a partir de la existencia de una class
// *****************************************************************************************************

let sidebar = document.getElementById('sidebar');
function funSidebar (){
    document.getElementById('btn')
    .addEventListener('click', function(e){
        sidebar.classList.toggle("active");
        }
    );
    document.getElementById('buscar')
    .addEventListener('click', function(e){
        sidebar.classList.toggle("active");
        }
    );
}

sidebar && funSidebar();


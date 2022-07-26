let stockProductos = [  // Mi array de productos, con cada una de las tortas disponibles hasta ahora.
{id: 1, nombre: "Rogel", cantidad: 1, desc: "Torta con 8 capas de dulce de leche y abundante crema.", precio: 2700, img: './img/rogel.jpg'},
{id: 2, nombre: "Torta de Chocolate", cantidad: 1, desc: "Torta con 4 capas intercaladas de dulce de leche y crema.", precio: 1500, img: './img/torta-chocolate.jpg'},
{id: 3, nombre: "Number Cake", cantidad: 1, desc: "Torta de números, ideal para cumpleaños. Rellena de dulce de leche, bañada en crema y decorada con chocolates y oreos.", precio: 3500, img: './img/number-cake.jpg'},
{id: 4, nombre: "Chocotorta", cantidad: 1, desc: "Chocotorta de 2 pisos, decorada con bolitas de chocolate y oreos bañadas.", precio: 3000, img: './img/chocotorta.jpg'},
{id: 5, nombre: "Brownie", cantidad: 1, desc: "El clásico brownie con una textura y sabor increíbles.", precio: 2000, img: './img/brownie.jpg'},
{id: 6, nombre: "Torta Alta", cantidad: 1, desc: "Torta de 20 cm con relleno de bizcochuelo y dulce de leche.", precio: 4000, img: './img/torta-frutilla.jpg'},
{id: 7, nombre: "Torta Oreo", cantidad: 1, desc: "Torta rellena de crema oreo + dulce de leche y decorada con chocolates.", precio: 3100, img: './img/torta-decorada.jpg'},
{id: 8, nombre: "Torta Cabsha", cantidad: 1, desc: "Una torta con la mezcla perfecta entre chocolate y dulce de leche, con gusto al chocolate Cabsha.", precio: 1500, img: './img/cabsha.jpg'},
{id: 9, nombre: "Torta Red Velvet", cantidad: 1, desc: "Torta glaseada con crema y decorada con frutillas.", precio: 2500, img: './img/redvelvet.jpg'},
{id: 10, nombre: "Letter Cake", cantidad: 1, desc: "Torta de letras, rellena de dulce de leche, cubierta con chocolate y decorada con oreos y chocolates coloridos.", precio: 3000, img: './img/letter-cake.jpg'},
{id: 11, nombre: "Torta Chocolate Puro", cantidad: 1, desc: "Una torta hecha con chocolate ganash y rellena de más chocolate puro.", precio: 2000, img: './img/matilda.jpg'},
{id: 12, nombre: "Torta Matilda", cantidad: 1, desc: "La torta de la película Matilda, una bomba rellena de 3 capas de dulce leche y cubierta en chocolate.", precio: 3500, img: './img/matilda-dulce.jpg'},
{id: 13, nombre: "Box Alfajores", cantidad: 1, desc: "Caja con un mix de alfajores de cookies, coco, chocolate, nuez, pistacho, maizena y más. ", precio: 1800, img: './img/alfajores.jpg'},
{id: 14, nombre: "Huevos de pascua rellenos", cantidad: 1, desc: "Huevos de pascua de salted caramel, frutos rojos, chocotorta, oreo y más. ", precio: 1800, img: './img/huevos-todos.jpg'},
{id: 15, nombre: "Propuestas especiales", cantidad: 1, desc: "Propuestas para días especiales (día del padre, de la madre, pascuas, casamientos, navidad, de los enamorados y más). ", precio: 2000, img: './img/prop.jfif'},
{id: 16, nombre: "Macarons", cantidad: 1, desc: "Macarons hechos con harina de almendra y rellenos opcionales: dulce de leche, chocolate, limón, frutos rojos, y mucho más.", precio: 100, img: './img/macarons-ruth.jpg'},
]
 const contenedorProductos = document.getElementById('contenedor-productos')
 const contenedorCarrito = document.getElementById('carrito-contenedor')
 const botonVaciar = document.getElementById('vaciar-carrito')
 const contadorCarrito = document.getElementById('contadorCarrito')
 const cantidad = document.getElementById('cantidad')
 const precioTotal = document.getElementById('precioTotal')
 const cantidadTotal = document.getElementById('cantidadTotal')     //Traje todos los elementos del HTML 
 
let carrito = []  //Array vacío al cual pushearé mis productos 
 
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))  //Si el usuario renueva la sesión, 
        actualizarCarrito()                                   //sus datos de compra quedaron cargados en mi localstorage
    }
})

 botonVaciar.addEventListener('click', () => {  //Advierto al cliente si quiere o no vaciar el carrito
    
     Swal.fire({
        title: '¿Seguro querés eliminar todos los elementos del carrito?',
        text:"Si borrás los elementos pero no elegís otros, igualmente tu compra quedará guardada al recargar la página.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Dejar el carrito como está',
        confirmButtonText: 'Si, borrar mis elementos',
        
      }).then((result) => {
          if (result.isConfirmed) {   
          carrito.length = 0;
          actualizarCarrito();
          Swal.fire(
            '',
            'Se eliminaron todos los elementos de tu carrito.',
            'success'
          )
        } else if (result.isDenied) {}
      })
    
 })
 
 stockProductos.forEach((producto) => { //Por cada una de mis tortas en el Array, muestro en el DOM una card al cliente
     const div = document.createElement('div')
     div.classList.add('producto')
     div.innerHTML = `
     <img src=${producto.img} alt= "" class="cardimagen">
     <h3 id="cardName">${producto.nombre}</h3>
     <p>${producto.desc}</p>   
     <p class="precioProducto">Precio: $${producto.precio}</p>
     <button id="agregar${producto.id}" class="boton-agregar">Agregar al carrito <i class="fas fa-shopping-cart"></i></button>
     `
     contenedorProductos.appendChild(div)
     const boton = document.getElementById(`agregar${producto.id}`)
     
 
     boton.addEventListener('click', () => { //Si el cliente agrega un producto, le aviso mediante una alerta
         agregarAlCarrito(producto.id)
            Toastify({
            text:"El producto se agregó al carrito correctamente",
            duration:1000 ,
            gravity: "top", 
            position: "left", 
             }).showToast(); 
        })
 })
 
 const agregarAlCarrito = (prodId) => { //Chequea si el producto ya existe en el carrito, para que no se repita si lo agrego + de 1 vez
    const existe = carrito.some (prod => prod.id === prodId) 
        if (existe){ 
        const prod = carrito.map (prod => { 
        if (prod.id === prodId){
                prod.cantidad++
            }
        })
    }   else { 
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
 
    actualizarCarrito() 
}



 const eliminarDelCarrito = (prodId) => { //Con el metodo splice puedo eliminar el producto que se desee obtieniendo su indice  
     const item = carrito.find((prod) => prod.id === prodId)
     const indice = carrito.indexOf(item) 
     carrito.splice(indice, 1) 
     actualizarCarrito() 
     console.log(carrito)
 }
 
 const actualizarCarrito = () => {  //Lo que se mostrará en la ventana modal del DOM, una vez que abramos el ícono de carrito 
         contenedorCarrito.innerHTML = "" 
         carrito.forEach((prod) => {
         const div = document.createElement('div')
         div.className = ('productoEnCarrito')
         div.innerHTML = `
         <img src=${prod.img} alt "" class="imgventana">
         <p class="nombreEnCarrito">${prod.nombre}</p>
         <p class="nombreEnCarrito">Precio: $${prod.precio}</p>
         <p class="nombreEnCarrito">Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
         <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
         `
 
         contenedorCarrito.appendChild(div)
         
         localStorage.setItem('carrito', JSON.stringify(carrito))
 
     })
   
     contadorCarrito.innerText = carrito.length 
     console.log(carrito)
     precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
   

 }
 //Ventana modal que abre el carrito 
 const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
 const botonAbrir = document.getElementById('boton-carrito')
 const botonCerrar = document.getElementById('carritoCerrar')
 const modalCarrito = document.getElementsByClassName('modal-carrito')[0]
 
 
 botonAbrir.addEventListener('click', ()=>{
     contenedorModal.classList.toggle('modal-active')
 })
 botonCerrar.addEventListener('click', ()=>{
     contenedorModal.classList.toggle('modal-active')
 })
 
 contenedorModal.addEventListener('click', (event) =>{
     contenedorModal.classList.toggle('modal-active')
 
 })
 modalCarrito.addEventListener('click', (event) => {
     event.stopPropagation() 
 })

let finalizarcompra = document.querySelector("#finalizar_compra"); 
finalizarcompra.addEventListener('click' , (e) =>{
    if (carrito.length > 0 ) {
      carrito.length = 0 
      actualizarCarrito()        
      Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Gracias por tu compra!!',
      text: 'Podés buscar tu pedido en nuestra dirección',
      showConfirmButton: false,
      timer: 6000
    })
    }
    })

//La parte de propuestas especiales, aunque estéticamente es igual al resto (porque reutilicé sus clases), está inyectada desde
// un array de objetos proveniente de un archivo .json que cree yo. 
let propuestas = document.querySelector("#propuestas")
const productosEnJson = async () => {
            let resp = await fetch("./desafio.json") // Utilizo async/awuati para luego inyectar mi archivo JSON
            const data = await resp.json()
            data.forEach((propuesta) => { 
            const cadauna = document.createElement("div")  //Creo un div por c/u de los elementos que traigo del array en el archivo JSON 
            cadauna.className = ('prodjson')  //Les agrego clases e IDs para estilizarlos
            cadauna.innerHTML = `    
            <img src=${propuesta.img} alt= "" class="imgPropuesta">
            <h4 id="cardName">${propuesta.nombre}</h4>        
            <p class="ni">Precio: $${propuesta.precio}</p>
            <p>Opciones: <br/>${propuesta.descripcion} </p>
            `
            propuestas.append(cadauna)})                        //Los inyecto en div ya existente en el HTML 
}
productosEnJson();
                                                                                   


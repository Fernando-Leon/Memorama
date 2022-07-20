let playPlace = document.getElementById("container"); // <div> que contiene las cartas
let infoPlayer = document.getElementById("info-player");// <div> que contiene informacion (tiempo, cartas encontradas, intentos etc)
playPlace.style.display = "none";
infoPlayer.style.display = "none";
let congratsText = document.getElementById("congratsText"); // <h3> elemento que muestra mensaje cundo termine el juego 
let intentsItem = document.getElementById("intent"); // <p> - Elemento que contiene el numero de intentos 
let correctCartsItem = document.getElementById("correctCarts"); // <p> - Elemento que contiene el numero de cartas encontradas
var score = 0; // Puntaje (numero de cartas encontradas)
var intents = 0; // Intentos (numero total de intentos)

//Lista de direccion de imagenes (se puede poner el numero de cartas que se necesite) 
const imagList = ["IMGS/bit.png", "IMGS/html.png", "IMGS/css.png", "IMGS/js.png", "IMGS/git.png", "IMGS/java.png", "IMGS/linux.png", "IMGS/react.png", "IMGS/python.png", "IMGS/vscode.png"];

/*Function que genera una lista de direccion de imagenes aleatorias 
ejempo:
listaDirecciones = ["imagen1.jpg", "imagen2.jpg", "imagen3.jpg"]
listaDireccionesAleatorias = ["imagen3.jpg", "imagen1.jpg", "imagen2.jpg", "imagen2.jpg", "iamgen3.jpg", "imagen1.jpg"]
*/
const randomsImgs = () => {
    var listCartsDirection = [];
    for(let i = 0; i < imagList.length*2; i++) {
        let src = imagList[Math.floor((Math.random() * ((imagList.length - 1) - 0 + 1)))];
        let elementCount = null;

        for(let j = 0; j < listCartsDirection.length; j++) {
            (src === listCartsDirection[j]) ? elementCount += 1 : elementCount = elementCount
        }

        (elementCount < 2) ? listCartsDirection.push(src): i--;

        elementCount = null
    }
    return listCartsDirection;
}

function createTable(){ //Crea el tablero donde estaran las cartas (playPlace) y la informacion de partida (infoPlayer) 
    playPlace.style.display = 'grid';
    infoPlayer.style.display = 'grid';
    let fragment = document.createDocumentFragment();
    let listImageRandos = randomsImgs();
    
    for (let i = 0; i < imagList.length*2; i++) {
        let item = document.createElement("DIV");
        let img = document.createElement("IMG");
    
        item.setAttribute("class", "div-container-carts div-container-hovered")
        img.setAttribute("id",`cart-${i+1}`)
        item.setAttribute("onclick", `intentPlayer("cart-${i+1}", "${listImageRandos[i]}")`);
        img.src = listImageRandos[i];
        img.setAttribute("class", "carts");
        img.style.visibility = "hidden";
    
        item.appendChild(img);
        fragment.appendChild(item);
    }
    
    playPlace.appendChild(fragment)
    intentsItem.innerHTML = `INTENTOS: ${intents}`;
    correctCartsItem.innerHTML = `CARTAS ENCONTRADAS: ${score}`;
}

// Funcion para que se ejecuta cauando el jugador da click sobre una carta
var counter = 0; //veces que el jugador a dado click sobre las cartas
var cartsComparative = [] // Array el cual contendra las direcciones de 2 cartas
var idArrayCarts = [] // Array que tendra el id de 2 cartas

function intentPlayer(idCart, getSrc){
    if(counter < 2){
        counter++;
        viewCart(idCart);  // muestra la carta seleccionada
        cartsComparative.push(getSrc);
        idArrayCarts.push(idCart);
    }
    if(counter === 2){ 
        (cartsComparative[0] !== cartsComparative[1]) ? window.setTimeout(hiddenCarts, 500, idArrayCarts) : correctCarts(idArrayCarts);
        counter = 0
        cartsComparative = [], idArrayCarts = []
        intents++
        intentsItem.innerHTML = `INTENTOS: ${intents}`
    }
    (score === imagList.length) ? showMessageWinner(): console.log("S/N");
}

const viewCart = id => document.getElementById(id).style.visibility = "visible"; //Funcion para mostart la carta seleccionada

function hiddenCarts(idCarts){ //Funcion para ocultar las 2 cartas cuando estas no sean iguales
    document.getElementById(idCarts[0]).style.visibility = "hidden";
    document.getElementById(idCarts[1]).style.visibility = "hidden";
}

function correctCarts(idArrayCarts){ //Funcion para desacticar el evento onclick cuando las 2 cartas sean iguales
    let cart1 = document.getElementById(idArrayCarts[0]).parentNode;
    let cart2 = document.getElementById(idArrayCarts[1]).parentNode;
    cart1.setAttribute("onclick", "");
    cart2.setAttribute("onclick", "");
    cart1.classList.remove('div-container-hovered');
    cart2.classList.remove('div-container-hovered');
    score++;
    correctCartsItem.innerHTML = `CARTAS ENCONTRADAS: ${score}`;
}

//Acciones del boton para: iniciar juego, reiniciar juego y volver a jugar
var statusButton = "Play";
var buton = document.getElementById("btnAccion") ;
var auTimer = 0;

function acctionButton(){
    if(statusButton === "Play"){
        statusButton = "Reload";
        buton.innerHTML = "REINICIAR JUEGO";
    }else if(statusButton === "Reload"){
        statusButton = "Play";
    }

    while (playPlace.firstChild) { playPlace.removeChild(playPlace.firstChild) } //Eimina la tabla actual
    createTable(); //Genera una nueva tabla aleatoria

    if(auTimer === 0){
        auTimer = 1
    }else if(auTimer === 1){
        stopTime()
        restart()
    }
    window.onload = startCronometer()
    congratsText.innerHTML = ""
    score = 0, intents = 0;
    intentsItem.innerHTML = `INTENTOS: ${intents}`;
    correctCartsItem.innerHTML = `CARTAS ENCONTRADAS: ${score}`;
}

function showMessageWinner(){ //Mensaje cuando el jugador complete el juego
    congratsText.innerHTML = "FELICIDADES HAS ENCONTRADO TODAS LAS CARTAS";
    statusButton = "Play";
    buton.innerHTML = "VOLVER A JUGAR";
    score = 0, intents = 0;
    stopTime();
}
//Cronometro -- Codigo tomado y modificado:  https://francescricart.com/ejercicio-js-crear-un-cronometro-con-javascript/
function startCronometer(){ // Funcion para iniciadora de cronometro 
    h = 0, m = 0, s = 0;
    document.getElementById("hms").innerHTML="TIEMPO: 00h : 00m : 00s";
    addTime();
}

const addTime = () =>  id = setInterval(write, 1000); // Funcion que llama a la funcion write() a cada segundo

function write(){ // Funcion que escribe el tiempo 
    var hAux, mAux, sAux;
    s++;
    if (s>59){m++;s=0;}
    if (m>59){h++;m=0;}
    if (h>24){h=0;}
    if (s<10){sAux="0"+s;}else{sAux=s;}
    if (m<10){mAux="0"+m;}else{mAux=m;}
    if (h<10){hAux="0"+h;}else{hAux=h;}
    document.getElementById("hms").innerHTML = `TIEMPO: ${hAux}h : ${mAux}m : ${sAux}s`;
}

function restart(){ //Funcion para reineiciar el Tiempo
    clearInterval(id);
    document.getElementById("hms").innerHTML="TIEMPO: 00h : 00m : 00s";
    h = 0; m = 0; s = 0;
}

const stopTime = () => clearInterval(id); //Funcion para detener el tiempo
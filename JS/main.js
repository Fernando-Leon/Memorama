let playPlace = document.getElementById("container");
let infoPlayer = document.getElementById("info-player");
playPlace.style.display = "none";
infoPlayer.style.display = "none";
let congratsText = document.getElementById("congratsText");
let intentsItem = document.getElementById("intent");
let correctCartsItem = document.getElementById("correctCarts");
var score = 0;
var intents = 0;

// Lista de conceptos con definiciones
const conceptsList = [
    { concept: "Vector Gradiente", definition: "Vector que indica la dirección de mayor incremento de una función y cuya magnitud muestra la tasa de cambio." },
    { concept: "Símbolo de gradiente (∇)", definition: "Operador diferencial que aplica a una función escalar y genera el vector gradiente." },
    { concept: "Derivada Direccional", definition: "La tasa de cambio de una función en una dirección específica, calculada a partir del vector gradiente." },
    { concept: "Cálculo del gradiente", definition: "∇f = (∂f/∂x, ∂f/∂y, ∂f/∂z) (para una función f en 3D)" },
    { concept: "Cálculo de la derivada direccional", definition: "Dᵥf = ∇f • v (donde ∇f es el gradiente y v el vector unitario en la dirección deseada)" },
    { concept: "Vector Unitario", definition: "Vector con magnitud 1 que indica dirección sin alterar el tamaño." }
];

// Genera una lista aleatoria de cartas con concepto y definición
const randomConcepts = () => {
    var listCartsDirection = [];
    conceptsList.forEach(concept => {
        listCartsDirection.push({ type: "concept", text: concept.concept, pair: concept.concept });
        listCartsDirection.push({ type: "definition", text: concept.definition, pair: concept.concept });
    });

    // Mezclar las cartas
    return listCartsDirection.sort(() => Math.random() - 0.5);
}

function createTable() {
    playPlace.style.display = 'grid';
    infoPlayer.style.display = 'grid';
    let fragment = document.createDocumentFragment();
    let randomConceptList = randomConcepts();
    
    for (let i = 0; i < randomConceptList.length; i++) {
        let item = document.createElement("DIV");
        let cardText = document.createElement("DIV");
    
        item.setAttribute("class", "div-container-carts div-container-hovered");
        cardText.style.textAlign = "center";
        cardText.style.padding = "1px";
        cardText.style.padding = "flex";
        cardText.style.justifyContent = "center";
        cardText.style.alignContent = "center";
        cardText.setAttribute("id", `cart-${i+1}`);
        item.setAttribute("onclick", `intentPlayer("cart-${i+1}", "${randomConceptList[i].pair}", "${randomConceptList[i].type}")`);
        
        cardText.innerHTML = `<strong>${randomConceptList[i].text}</strong>`;
        cardText.style.visibility = "hidden";
    
        item.appendChild(cardText);
        fragment.appendChild(item);
    }
    
    playPlace.appendChild(fragment);
    intentsItem.innerHTML = `INTENTOS: ${intents}`;
    correctCartsItem.innerHTML = `CARTAS ENCONTRADAS: ${score}`;
}

var counter = 0;
var cartsComparative = [];
var idArrayCarts = [];

function intentPlayer(idCart, pair, type) {
    if (counter < 2) {
        counter++;
        viewCart(idCart);
        cartsComparative.push({ pair, type });
        idArrayCarts.push(idCart);
    }
    if (counter === 2) {
        if (cartsComparative[0].pair === cartsComparative[1].pair && cartsComparative[0].type !== cartsComparative[1].type) {
            correctCarts(idArrayCarts);
        } else {
            window.setTimeout(hiddenCarts, 500, idArrayCarts);
        }
        counter = 0;
        cartsComparative = [];
        idArrayCarts = [];
        intents++;
        intentsItem.innerHTML = `INTENTOS: ${intents}`;
    }
    if (score === conceptsList.length) {
        showMessageWinner();
    }
}

const viewCart = id => document.getElementById(id).style.visibility = "visible";

function hiddenCarts(idCarts) {
    document.getElementById(idCarts[0]).style.visibility = "hidden";
    document.getElementById(idCarts[1]).style.visibility = "hidden";
}

function correctCarts(idArrayCarts) {
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

//Cronometro -- Codigo tomado y modificado: https://francescricart.com/ejercicio-js-crear-un-cronometro-con-javascript/
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

const stopTime = () => clearInterval(id); //Funcion para detener el tiempo.

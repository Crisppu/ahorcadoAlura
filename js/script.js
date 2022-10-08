let palabras = ["ALURA", "AHORCADO", "ORACLE", "HTML", "CSS", "JAVASCRIPT"];




function agregarPalabra(palabraNueva) {
    if(palabraNueva.value != ""){
        palabras.push(palabraNueva.value.toUpperCase());
        textAreaValue.value = "";
        return true;
    } else{
        return false;
    }
}

let tablero = document.getElementById("horca").getContext("2d");

function ahorcado() {
    
    let letras = [];
    let palabraCorrecta = "";
    let errores = 9;

function escojerPalabraSecreta() {
    var palabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabraSecreta = palabra;
    // console.log(palabraSecreta);
    return palabraSecreta;
}

function dibujarLineas() {
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.strokeStyle = "#0A3871";
    tablero.beginPath();

    var ancho = 600/palabraSecreta.length;
    for(let i = 0; i < palabraSecreta.length; i++){
        tablero.moveTo(500 + (ancho * i), 700);
        tablero.lineTo(550 + (ancho * i), 700);
    }
    tablero.stroke();
    tablero.closePath();

}dibujarLineas(escojerPalabraSecreta());

function escribirLetraCorrecta(posicion) {
    tablero.font = "52px Inter";
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#0A3871";

    var ancho = 600/palabraSecreta.length;
    tablero.fillText(palabraSecreta[posicion],505 + (ancho * posicion), 680);
}

function escribirLetraIncorrecta(letra, erroresLeft) {
    tablero.font = "45px Inter";
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#495057";

    tablero.fillText(letra, 535 +(40 * (10 - erroresLeft)), 780, 40);
}

function verficarLetraClicada(key) {
    if (letras.length < 1 || letras.indexOf(key) < 0){
        letras.push(key);
        return false;
    } else {
        letras.push(key);
        return true;
    }
}

function adicionarLetraCorrecta(index) {
    palabraCorrecta += palabraSecreta[index].toUpperCase();
}

function adicionarLetraIncorrecta(letter) {
    if (palabraSecreta.indexOf(letter) <= 0){
        if(errores === 9){
            dibujarPoste();
        }
        if(errores === 8){
            dibujarPosteDos();
        }
        if(errores === 7){
            dibujarPosteTres();
        }
        if(errores === 6){
            dibujarCabeza();
        }
        if(errores === 5){
            dibujarTorso();
        }
        if(errores === 4){
            dibujarBrazo();
        }
        if(errores === 3){
            dibujarBrazoDos();
        }
        if(errores === 2){
            dibujarPierna();
        }
        if(errores === 1){
            dibujarPiernaDos();
        } 
        if (errores === 0){
            alert("PERDISTE!!! la palabra secreta era: " + palabraSecreta);
        }
        errores -= 1;       
    }
    
}

 

        document.onkeydown = (e) => {
            var codigo = e.which || e.keyCode;
            if(codigo >= 65 && codigo <= 90){

                let letra = e.key.toUpperCase();
                if(!verficarLetraClicada(e.key)){
                    // console.log(letras);
                    if(palabraSecreta.includes(letra)){
                        // console.log(letra);
                        adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
                        for(let i = 0; i < palabraSecreta.length; i++){
                            if(palabraSecreta[i] === letra){
                                escribirLetraCorrecta(i); 
                                if (palabraCorrecta.length == palabraSecreta.length){
                                    alert("HA GANADO!!!");
                                }
                            } 
                            
                        }
                    } else {
                        if (!verficarLetraClicada(e.key)) return 
                        // console.log(letras);
                        adicionarLetraIncorrecta(letra)
                        escribirLetraIncorrecta(letra, errores);
                    }
                }
            }           
        };
            
}

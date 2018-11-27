const {beings, Being} = require('./terrainmap/beings');

let posX = Number.parseInt(INIT.y);
let posY = Number.parseInt(INIT.x);

let totalCost = 0;
let p1ayerName = require('electron').remote.getGlobal('being').name;
let p1 = beings[beings.findIndex(x => x.name === p1ayerName)];

let ctx = layer2.getContext("2d");

image.src = './icons/face.png';
image.width = TILELONG;
image.height = TILEALT;
ctx.drawImage(image, (posX)*TILELONG , (posY)*TILEALT, TILELONG, TILEALT);


function keyUpHandler(event) {
    if(event.keyCode === 39) {
        console.log('Right');
        actualizarPosicion('R');
    }
    else if(event.keyCode === 37) {
        console.log('Left');
        actualizarPosicion('L');
    }
    if(event.keyCode === 40) {
        console.log('Down');
        actualizarPosicion('D');
    }
    else if(event.keyCode === 38) {
        console.log('Up');
        actualizarPosicion('U');
    }
}

function pintarCelda(x, y){
    let ctx = canvas.getContext('2d');
    let celda = mapa[y][x];
    switch (celda) {
        case '0':
            ctx.fillStyle = COLORES.BLACK;
            break;

        case '1':
            ctx.fillStyle = COLORES.BROWN;
            break;

        case '2':
            ctx.fillStyle = COLORES.BLUE;
            break;

        case '3':
            ctx.fillStyle = COLORES.YELLOW;
            break;

        case '4':
            ctx.fillStyle = COLORES.GREEN;
            break;

        case '5':
            ctx.fillStyle = COLORES.VIOLET;
            break;

        case '6':
            ctx.fillStyle = COLORES.WHITE;
            break;
        default:
            ctx.fillStyle = 'rgb(0, 0, 0)';
    }
    ctx.fillRect((x+1)*TILELONG, (y+1)*TILEALT, TILELONG, TILEALT);
    ctx.strokeRect((x+1)*TILELONG, (y+1)*TILEALT, TILELONG, TILEALT);
}

function quitarNiebla(x, y){
    let ctxl = layer1.getContext('2d');
    ctxl.clearRect(x*TILELONG, y*TILEALT, TILELONG, TILEALT);
    ctxl.clearRect((x+1)*TILELONG, y*TILEALT, TILELONG, TILEALT);
    ctxl.clearRect((x-1)*TILELONG, y*TILEALT, TILELONG, TILEALT);
    ctxl.clearRect(x*TILELONG, (y+1)*TILEALT, TILELONG, TILEALT);
    ctxl.clearRect(x*TILELONG, (y-1)*TILEALT, TILELONG, TILEALT);
}

function limpiarJugador(x, y) {
    let ctx2 = layer2.getContext('2d');
    ctx2.clearRect((x)*TILELONG, (y)*TILEALT, TILELONG, TILEALT);
}

function contarCosto(x, y) {

    let cost = document.getElementById('cost');
    let value = mapa[y][x];
    for (being of beings) {
        if (p1.name === being.name) {
            switch (value) {
                case '0':
                    totalCost += being.mountain;
                    break;

                case '1':
                    totalCost += being.land;
                    break;

                case '2':
                    totalCost += being.water;
                    break;

                case '3':
                    totalCost += being.sand;
                    break;

                case '4':
                    totalCost += being.forest;
                    break;

                case '5':
                    totalCost += being.swamp;
                    break;

                case '6':
                    totalCost += being.snow;
                    break;

            }
        }
    }
    cost.innerText = totalCost;
}

function terrenoValido(x, y){
    let value = mapa[y][x];
    switch (value){
        case '0':
            return p1.mountain !== -1;

        case '1':
            return p1.land !== -1;

        case '2':
            return p1.water !== -1;


        case '3':
            return p1.sand !== -1;


        case '4':
            return p1.forest !== -1;


        case '5':
            return p1.swamp !== -1;


        case '6':
            return p1.snow !== -1;

    }

}

function actualizarPosicion(dir){
    let ctx = layer2.getContext('2d');
    limpiarJugador(posX, posY);
    switch (dir){
        case 'R':
            if( posX === mapa[0].length - 1 ){
                posX = posX;
            }else{
                if(terrenoValido(posX+1, posY)){
                    posX += 1;
                    contarCosto(posX, posY);
                }
            }
            break;

        case 'L':
            if( posX === 0){
                posX = posX;
            }else{
                if(terrenoValido(posX-1, posY)){
                    posX -= 1;
                    contarCosto(posX, posY);
                }
            }
            break;

        case 'D':
            if( posY === mapa.length - 1){
                posY = posY;
            }else{
                if(terrenoValido(posX, posY+1)){
                    posY += 1;
                    contarCosto(posX, posY);
                }
            }
            break;

        case 'U':
            if( posY === 0){
                posY = posY;
            }else{
                if(terrenoValido(posX, posY-1)){
                    posY -= 1;
                    contarCosto(posX, posY);
                }
            }
            break;
    }

    quitarNiebla(posX, posY);
    ctx.drawImage(image, (posX)*TILELONG, (posY)*TILEALT, TILELONG, TILEALT);

}

document.addEventListener('keyup', keyUpHandler, false);


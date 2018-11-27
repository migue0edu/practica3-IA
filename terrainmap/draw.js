const TILELONG = require('electron').remote.getGlobal('tilelong');
const TILEALT = require('electron').remote.getGlobal('tilealt');
const COLORES = require('electron').remote.getGlobal('colores');
const INIT = require('electron').remote.getGlobal('initialPos');
const END = require('electron').remote.getGlobal('endPos');
let mapa = require('electron').remote.getGlobal('mapa');


function draw() {
    let canvas = document.getElementById('canvas');

    if (canvas.getContext) {

        let ctx = canvas.getContext('2d');
        ctx.fillStyle = "rgba(59, 62, 64, 0.5)";
        ctx.fillRect(0, 0, TILELONG, TILEALT);
        ctx.font = "20px Arial";

        for(let i=0; i < mapa.length; i++){
            ctx.fillStyle = "rgba(59, 62, 64, 0.5)";
            ctx.fillRect(0, (i+1)*TILEALT, TILELONG, TILEALT);
            ctx.fillStyle = "rgb(0,0,0)";
            if(i < 10)
                ctx.fillText(i,TILELONG/4, (i+2)*TILEALT);
            else
                ctx.fillText(i,0, (i+2)*TILEALT);
        }

        let chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                     'U', 'V', 'W', 'X', 'Y', 'Z'];

        for(let i=0; i < mapa[0].length; i++){
            ctx.fillStyle = "rgba(59, 62, 64, 0.5)";
            ctx.fillRect((i+1)*TILELONG, 0, TILELONG, TILEALT);
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillText(chars[i],(i+1)*TILELONG + (TILELONG/3), TILEALT - 3);
        }

        for(let i =0; i < mapa.length; i++){
            for (let j = 0; j < mapa[i].length; j++) {
                switch (mapa[i][j]){
                    case '0': ctx.fillStyle = COLORES.BLACK;
                            break;

                    case '1': ctx.fillStyle = COLORES.BROWN;
                            break;

                    case '2': ctx.fillStyle = COLORES.BLUE;
                            break;

                    case '3': ctx.fillStyle = COLORES.YELLOW;
                            break;

                    case '4': ctx.fillStyle = COLORES.GREEN;
                            break;

                    case '5': ctx.fillStyle = COLORES.VIOLET;
                        break;

                    case '6': ctx.fillStyle = COLORES.WHITE;
                        break;

                    default: ctx.fillStyle = 'rgb(0, 0, 0)';
                }
                ctx.fillRect((j+1)*TILELONG, (i+1)*TILEALT, TILELONG, TILEALT);
                ctx.strokeRect((j+1)*TILELONG, (i+1)*TILEALT, TILELONG, TILEALT);
            }
        }
        let image = document.getElementById("source");
        image.src = 'icons/face.png';
        image.width = TILELONG;
        image.height = TILEALT;
        let ctx2 = layer2.getContext('2d');
        ctx2.drawImage(image, (Number.parseInt(INIT.y))*TILELONG, (Number.parseInt(INIT.x))*TILEALT, TILELONG, TILEALT);
    }
}

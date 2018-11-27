let obtenerTipoTerreno = () =>{
    let numx = document.getElementById('cordX');
    let numy = document.getElementById('cordY');
    let resp = document.getElementById('tipoTerreno');

    let x = numx.value;
    let y = numy.value;
    switch (mapa[x][y]){
        case '0': resp.innerText = 'Mountain';
                  break;

        case '1': resp.innerText = 'Land';
                  break;

        case '2': resp.innerText = 'Water';
                  break;

        case '3': resp.innerText = 'Sand';
                  break;

        case '4': resp.innerText = 'Forest';
                  break;

        case '5': resp.innerText = 'Swamp';
            break;

        case '6': resp.innerText = 'Snow';
            break;

        default: resp.innerText = 'Wall';
    }
};

let actualizarTipoTerreno = () =>{
    let numx = document.getElementById('cordX');
    let numy = document.getElementById('cordY');
    let nuevoTerreno = document.getElementById('newTerrain');

    let x = numx.value;
    let y = numy.value;
    let terreno = nuevoTerreno.value;

    let canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        switch (terreno) {
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
        mapa[x][y] = terreno;
        obtenerTipoTerreno();
        ctx.fillRect((Number.parseInt(y)+1)*TILELONG, (Number.parseInt(x)+1)*TILEALT, TILELONG, TILEALT);
        ctx.strokeRect((Number.parseInt(y)+1)*TILELONG, (Number.parseInt(x)+1)*TILEALT, TILELONG, TILEALT);
    }
};
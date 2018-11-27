//---------------Configuracion elementos parte inferior--------------

let leftB = document.querySelector('#LeftButton');
let rightB = document.querySelector('#RightButton');
let upB = document.querySelector('#UpButton');
let downB = document.querySelector('#DownButton');
let clearB = document.querySelector('#ClearButton');

let labels = document.querySelectorAll('label');

let dirCount = 0;
let priority = [];
let active = false;
let solutionTree;
let movement = 0;
let solving = 0;



//---------------Configuracion de estilos---------------------------
document.querySelector('body').style.background = '#E8E2FB' ;

leftB.style.fontWeight = 'bold';
leftB.style.fontSize = '18px';
rightB.style.fontWeight = 'bold';
rightB.style.fontSize = '18px';
upB.style.fontWeight = 'bold';
upB.style.fontSize = '18px';
downB.style.fontWeight = 'bold';
downB.style.fontSize = '18px';

//---------------Funciones de los elementos---------------------------

let actualizarPrioridad = (direccion) =>{
    if(dirCount < 4){
        dirCount++;
        priority.push(direccion);
        switch (direccion){
            case 'Up':
                upB.innerHTML += ` ${dirCount}°`;
                break;
            case 'Down':
                downB.innerHTML += `${dirCount}°`;
                break;
            case 'Left':
                leftB.innerHTML += `${dirCount}°`;
                break;
            case 'Right':
                rightB.innerHTML += `${dirCount}°`;
                break;

        }
    }
};

let borrarPrioridad = () => {
    dirCount = 0;
    priority.splice(0, priority.length);
    upB.innerHTML = upB.innerHTML.split('</i>')[0];
    downB.innerHTML = downB.innerHTML.split('</i>')[0];
    leftB.innerHTML = leftB.innerHTML.split('</i>')[0];
    rightB.innerHTML = rightB.innerHTML.split('</i>')[0];
};

let resolver = (modo) => {

    clearB.disabled = !clearB.disabled;
    incrementT.disabled =  !incrementT.disabled;
    initialDepthT.disabled = !initialDepthT.disabled;
    document.querySelector('#mapInfo').disabled = !document.querySelector('#mapInfo').disabled;

    if(active){
        clearInterval(solving);
        active = false;
        return;
    }

    if(priority.length < 4){
        M.toast({html: 'Priority is incomplete!'});
        return;
    }
    if(method.value === 'Iterative'){
        if(initialDepthT.value === '0' || incrementT.value === '0'){
            M.toast({html: 'Values can\'t be zero.!'});
            return;
        }
        if(!solving) {
            initialDepth = Number.parseInt(initialDepthT.value);
            increment = Number.parseInt(incrementT.value);
        }
    }

    require('electron').remote.getGlobal('mode').mode = modo;

    if(modo === 'Step'){
        active = true;
        nodeMode.disabled = !nodeMode.disabled;
        solving = setInterval(solveMaze,350, modo, method.value);
    }
    if(modo === 'Node'){
        active = true;
        stepMode.disabled = !stepMode.disabled;
        solving = setInterval(solveMaze, 350, 'Step', method.value);
    }
    active = true;
};

let solveMaze = (mode, method) => {
    let result;

    //Inicialización del arbol
    if(!solutionTree){
        solutionTree = new Tree();
        solutionTree.addNode('root',`${INIT.y}${chars[INIT.x]}`);
        actNode = `${INIT.y}${chars[INIT.x]}`;
        lastNode = 'root';
        lastSet.push(`${INIT.y}${chars[INIT.x]}`);
    }

    if(method === 'Depth'){
        if(!solutionTree.solved){
            if(mode === 'Step'){
                console.log(priority[movement]);
                if(!actualizarPosicion(priority[movement].charAt(0))){
                    movement++;
                    if (movement > 3){
                        movement = 0;
                        //Crea nodo y regresar al nodo anterior.
                        if(solutionTree.findNode(`${posY}${chars[posX]}`)){
                            actNode = lastNode;
                            result = solutionTree.findNode(actNode);
                            lastNode = solutionTree.getCoordsofNode(result.node.father);
                        }
                        else{
                            solutionTree.addNode(actNode, `${posY}${chars[posX]}`);
                        }
                        datamap[posY][posX] = 'ov';
                        limpiarJugador(posX, posY);
                        result = solutionTree.findNode(actNode);
                        posX = solutionTree.getValueCoords(result.index).x;
                        posY = solutionTree.getValueCoords(result.index).y;
                        nuevaPosicionActual(posX, posY);
                        actualizarJugador(posX, posY);

                    }
                }
                else{
                    movement = 0;
                    if(datamap[posY][posX].includes('o')){
                        //Añade nodo al arbol y actualiza nodo actual y anterior.
                        solutionTree.addNode(actNode, `${posY}${chars[posX]}`);
                        lastNode = actNode;
                        actNode = `${posY}${chars[posX]}`;
                    }
                }
            }
            if(mode === 'Node'){

            }

        }
    }

    if(method === 'Breath'){
        if(!solutionTree.solved){
            if(mode === 'Step'){
                if(lastIndex < lastSet.length){
                    if(dirs < 4){
                        if(actualizarPosicion(priority[movement].charAt(0))){
                            movement = 0;
                            if(datamap[posY][posX].includes('o')){
                                solutionTree.addNode(lastSet[lastIndex], `${posY}${chars[posX]}`);
                                newSet.push(`${posY}${chars[posX]}`);
                                dirs++;
                                movement = dirs;
                                changed = true;
                            }
                        }
                        else{
                            movement++;
                            if(lastSet[lastIndex] === `${posY}${chars[posX]}`){ //Comprueba si esta en la posición del nodo.
                                dirs++;
                            }
                            if(movement > 3){
                                if(lastSet[lastIndex] !== `${posY}${chars[posX]}`) {
                                    solutionTree.addNode(lastSet[lastIndex], `${posY}${chars[posX]}`);
                                    datamap[posY][posX] = 'ov';
                                    dirs++;
                                    movement = dirs;
                                    changed = true;
                                }
                            }
                        }
                        if(changed && dirs < 4){ //Si llego a un nodo nuevo, regresa a la posición del nodo actual.
                            limpiarJugador(posX, posY);
                            posY = Number.parseInt(lastSet[lastIndex].charAt(0));
                            posX = Number.parseInt(chars.indexOf(lastSet[lastIndex].charAt(1)));
                            nuevaPosicionActual(posX, posY);
                            actualizarJugador(posX, posY);
                            changed = false;
                        }
                    }
                    else{
                        lastIndex++;
                        dirs = 0;
                        movement = 0;
                    }
                }
                else{
                    lastSet = newSet.slice();
                    newSet.splice(0, newSet.length);
                    lastIndex = 0;
                    limpiarJugador(posX, posY);
                    posY = Number.parseInt(lastSet[0].charAt(0));
                    posX = Number.parseInt(chars.indexOf(lastSet[0].charAt(1)));
                    nuevaPosicionActual(posX, posY);
                    actualizarJugador(posX, posY);
                    changed = false;
                }
            }
        }

    }

    if(method === 'Iterative'){
        if(!solutionTree.solved){
            if(mode === 'Step'){
                if(lastIndex < lastSet.length){
                    if(dirs < 4){
                        if(!actualizarPosicion(priority[movement].charAt(0))){
                            movement++;
                            if(lastSet[lastIndex] === `${posY}${chars[posX]}`){ //Comprueba si esta en la posición del nodo.
                                dirs++;
                                //console.log(`${dirs} , ${lastSet[lastIndex]} , [${posX},${posY}] , ${movement - 1}, ${actDepth}`);
                            }
                            else{
                                if (movement > 3){
                                    movement = 0;
                                    //Crea nodo y regresar al nodo anterior.
                                    if(solutionTree.findNode(`${posY}${chars[posX]}`)){
                                        actNode = lastNode;
                                        result = solutionTree.findNode(actNode);
                                        lastNode = solutionTree.getCoordsofNode(result.node.father);
                                        actDepth--;
                                        if(actDepth === 0){
                                            movement = dirs;
                                            console.log(`d -> m: ${movement}`);
                                        }
                                    }
                                    else{
                                        solutionTree.addNode(actNode, `${posY}${chars[posX]}`);
                                    }
                                    datamap[posY][posX] = 'ov';
                                    limpiarJugador(posX, posY);
                                    result = solutionTree.findNode(actNode);
                                    posX = solutionTree.getValueCoords(result.index).x;
                                    posY = solutionTree.getValueCoords(result.index).y;
                                    nuevaPosicionActual(posX, posY);
                                    actualizarJugador(posX, posY);
                                    if(actDepth === 0){
                                        movement = dirs;
                                        console.log(`d -> m: ${movement}`);
                                    }
                                }
                            }
                        }
                        else{
                            movement = 0;
                            if(datamap[posY][posX].includes('o')){
                                //Añade nodo al arbol y actualiza nodo actual y anterior.
                                solutionTree.addNode(actNode, `${posY}${chars[posX]}`);
                                lastNode = actNode;
                                actNode = `${posY}${chars[posX]}`;
                                actDepth++;
                            }
                            if(actDepth === initialDepth){
                                newSet.push(actNode);
                                actNode = lastNode;
                                result = solutionTree.findNode(actNode);
                                lastNode = solutionTree.getCoordsofNode(result.node.father);
                                datamap[posY][posX] = 'ov';
                                limpiarJugador(posX, posY);
                                result = solutionTree.findNode(actNode);
                                posX = solutionTree.getValueCoords(result.index).x;
                                posY = solutionTree.getValueCoords(result.index).y;
                                nuevaPosicionActual(posX, posY);
                                actualizarJugador(posX, posY);
                                actDepth--;
                                if(actDepth === 0){
                                    movement = dirs;
                                    console.log(`d -> m: ${movement}`);
                                }
                            }
                        }
                    }
                    else{
                        lastIndex++;
                        dirs = 0;
                        movement = 0;
                        if(lastIndex < lastSet.length){
                            actNode = lastSet[lastIndex];
                            result = solutionTree.findNode(actNode);
                            limpiardesicion(posX,posY);
                            limpiarJugador(posX, posY);
                            lastNode = solutionTree.getCoordsofNode(result.node.father);
                            posY = Number.parseInt(lastSet[lastIndex].charAt(0));
                            posX = Number.parseInt(chars.indexOf(lastSet[lastIndex].charAt(1)));
                            nuevaPosicionActual(posX, posY);
                            actualizarJugador(posX, posY);
                        }
                        actDepth = 0;
                    }
                }
                else{
                    lastSet = newSet.slice();
                    newSet.splice(0, newSet.length);
                    lastIndex = 0;
                    limpiardesicion(posX,posY);
                    limpiarJugador(posX, posY);
                    posY = Number.parseInt(lastSet[0].charAt(0));
                    posX = Number.parseInt(chars.indexOf(lastSet[0].charAt(1)));
                    nuevaPosicionActual(posX, posY);
                    actualizarJugador(posX, posY);
                    lastNode = lastSet[0];
                    actNode = lastNode;
                    initialDepth = increment;
                    actDepth = 0;
                    dirs = 0;
                    movement = 0;
                }
            }
        }
    }

    if(esFinal(posX, posY)){
        finalNode = `${posY}${chars[posX]}`;
        if(!solutionTree.solved) {
            M.toast({html: 'The end has been reached!'});
            switch (method) {
                case 'Step':
                    solutionTree.addNode(actNode, `${posY}${chars[posX]}`);
                    break;

                case 'Breath':
                    solutionTree.addNode(lastSet[lastIndex], `${posY}${chars[posX]}`);
                    break;

                case 'Iterative':
                    solutionTree.addNode(actNode, `${posY}${chars[posX]}`);
                    break;
            }
        }
        solutionTree.setSolved();
    }

    // noinspection JSAnnotator
    require('electron').remote.getGlobal('solutionTree').tree = solutionTree;
};
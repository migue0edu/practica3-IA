const {app, BrowserWindow, Menu, dialog} = require('electron');
const {TILES, TILEALT, TILELONG, COLORES, MAZE} = require('./misc/tiles');
const {leerArchivo} = require('./misc/mapa');

let file = 'mapa.txt';
global.mapa = leerArchivo(file);
global.colores = COLORES;
global.tilealt = TILEALT;
global.tilelong = TILELONG;
global.tipo = 'terrainmap';
global.initialPos = {x: 0, y:0};
global.endPos = {x:0, y:0};
global.being = {name: ''};


let win;
let child;
let child2;

const template = [
    {
        label: 'Load file',
        click(){
            console.log(dialog.showOpenDialog({properties: ['openFile']}));
            global.mapa = leerArchivo(dialog.showOpenDialog({properties: ['openFile']})[0]);
            instanceChild();
            instanceChild2();
            child.show();
            child.on('close', () => {
                if(global.tipo === 'terrainmap'){
                    child2.show();
                }
                else{
                    win.reload();
                }
            });

        }
    },
    {
        label: 'Reload',
        click(){
            win.reload();
        }
    },
    {
        label: 'Console',
        role: 'toggleDevTools'
    }

];

function instanceChild(){
    child = new BrowserWindow({width: 450, height: 221, parent: win, modal: true, show: false});
    child.loadFile('dialogs/posInicial.html');
    child.setAutoHideMenuBar(true);
    child.setMenuBarVisibility(false);
}
function instanceChild2() {
    child2 = new BrowserWindow({width: 450, height: 221, parent: win, modal: true, show: false});
    child2.loadFile('dialogs/seleccionarSer.html');
    child2.setMenuBarVisibility(false);
}

function createWindow () {
    win = new BrowserWindow({width: 900, height: 610, resizable: false, show: false});
    win.loadFile('terrainmap.html');
    instanceChild();
    instanceChild2();

    win.once('ready-to-show', () => {
        Menu.setApplicationMenu(Menu.buildFromTemplate(template));
        win.show();
    });
    child.on('ready-to-show', () => {
        child.show();
    });
    child.on('closed', () => {
        if(global.tipo === 'terrainmap'){
            child2.show();
        }
        else{
            win.reload();
        }
        console.log(`Start: [ x: ${global.initialPos.y}, y: ${global.initialPos.x} ]`);
        console.log(`End: [ x: ${global.endPos.y}, y: ${global.endPos.x} ]`);
    });
    child2.on('closed', ()=> {
        win.reload();
        console.log(`Player ${global.being.name}`);
    });

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});

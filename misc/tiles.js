//-------Colores terrnos----------------
const GREEN =  'rgb(24, 173, 39)';
const BLUE =  'rgb(0, 133, 249)';
const BLACK = 'rgb(66, 66, 66)';
const YELLOW = 'rgb(255, 236, 153)';
const BROWN = 'rgb(229, 173, 61)';
const WHITE = 'rgb(225, 236, 239)';
const VIOLET = 'rgb(178, 161, 199)';
//--------Colores Laberinto-------------
const WALL = 'rgb(43, 43, 43)';
const ROAD = 'rgb(247, 189, 141)';

const TILELONG = 35;
const TILEALT = 20;

/*----------------------------
    MOUNTAIN = 0;
    LAND = 1;
    WATER = 2;
    SAND = 3;
    FOREST = 4;
------------------------------*/

const COLORES = {
    'GREEN': GREEN,
    'BLUE': BLUE,
    'BLACK': BLACK,
    'YELLOW': YELLOW,
    'BROWN': BROWN,
    'WHITE': WHITE,
    'VIOLET': VIOLET
};

const TILES = {
    'mountain': {'value': 0, 'color': BLACK},
    'land': {'value': 1, 'color': BROWN},
    'water': {'value': 2, 'color': BLUE},
    'sand': {'value': 3, 'color': YELLOW},
    'forest': {'value':4, 'color': GREEN},
    'swamp': {'value':5, 'color': WHITE},
    'snow': {'value':6, 'color': VIOLET}
};

const MAZE = {
    'WALL': WALL,
    'ROAD': ROAD
};

module.exports = {
    GREEN,
    BLUE,
    BLACK,
    YELLOW,
    BROWN,
    TILEALT,
    TILELONG,
    TILES,
    COLORES,
    MAZE
};

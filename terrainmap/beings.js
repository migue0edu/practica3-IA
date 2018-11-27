let costos = {
    mountain: 0,
    land: 0,
    water: 0,
    sand: 0,
    forest: 0,
    swmap: 0,
    snow: 0
}

class  Being {
    constructor(name, costos){
        this.name = name;
        this.mountain = costos.mountain;
        this.land = costos.land;
        this.water = costos.water;
        this.sand = costos.sand;
        this.forest = costos.forest;
        this.swamp = costos.swamp;
        this.swow = costos.snow;
    }
}

let beings = [];

costos.mountain = -1;
costos.land = 1;
costos.water = 2;
costos.sand = 3;
costos.forest = 4;
costos.swamp = 5;
costos.snow = 6;

beings.push( new Being('Human', costos));

costos.land = 2;
costos.water = 4;
costos.forest = 1;
costos.snow = -1;
beings.push(new Being('Monkey',costos));

costos.mountain = -1;
costos.water = 1;
costos.sand = -1;
costos.forest = 3;
costos.swamp = 2;
beings.push(new Being('Octopus', costos));

costos.mountain = 15;
costos.land = 4;
costos.water = -1;
costos.forest = 5;
costos.snow = 3;
beings.push( new Being('Sasquatch', costos));


module.exports = {
    Being,
    beings
};
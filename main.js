var roleharvester = require('role.harvester');
var roleupgrader = require('role.upgrader');
var rolebuilder = require('role.builder');
var roledefender = require('role.defender');
var rolehauler = require('role.hauler');

function filterfunc(role) = _.filter(Game.creeps, (creep) => creep.memory.role == role);

module.exports.loop = function () {
    for( var name in Game.creeps ) {
        var role = creep.memory.role;
        var runfunc = str.concat('role', role);
        runfunc.run(creep);
    }
    
    var home = Game.spawns['Spawn1'];
    var harvesterSpec = [WORK, MOVE];
    var haulerSpec = [CARRY, MOVE];
    var workerSpec = [WORK, CARRY, MOVE]; // for Builders and Upgraders
    var defenderSpec = [TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, MOVE, ATTACK, MOVE];
    
    if ( Object.keys(harvesters).length < 4 ) {
        var newName = 'Harvester ' + Game.time
        home.spawnCreep(workerSpec, newName, { memory: { role: 'harvester' } } );
    } else if ( Object.keys(upgraders).length < 2 ) {
        var newName = 'Upgrader ' + Game.time
        home.spawnCreep(workerSpec, newName, { memory: { role: 'upgrader' } } );
    } else if ( Object.keys(builders).length < 2 ) {
        var newName = 'Builder ' + Game.time
        home.spawnCreep(workerSpec, newName, { memory: { role: 'builder' } } );
    } else if ( Object.keys(defenders).length < 2 ) {
        var newName = 'Defender ' + Game.time
        home.spawnCreep(defenderSpec, newName, { memory: { role: 'defender' } } );
    }
};

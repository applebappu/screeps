var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleDefender = require('role.defender');

module.exports.loop = function () {

    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for( var name in Game.creeps ) {
        var creep = Game.creeps[name];
        if( creep.memory.role == 'harvester' ) {
            roleHarvester.run(creep);
        }
        if( creep.memory.role == 'upgrader' ) {
            roleUpgrader.run(creep);
        }
        if( creep.memory.role == 'builder' ) {
            roleBuilder.run(creep);
        }
        if ( creep.memory.role == 'defender' ) {
            roleDefender.run(creep);
        }
    }
    
    var home = Game.spawns['Spawn1'];
    var workerSpec = [WORK, CARRY, MOVE, MOVE];
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    
    var defenderSpec = [TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, MOVE, ATTACK, MOVE];
    var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
    
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

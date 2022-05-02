var roleHarvester = require('role.harvester');
var roleHauler = require('role.hauler');
var roleUpgrader = require('role.upgrader');
var roleBootstrapper = require('role.bootstrapper');

var home = Game.spawns['Spawn1']

module.exports.loop = function() {
	for ( var creepName in Memory.creeps ) {
		if ( !Game.creeps[creepName] ) {
			delete Memory.creeps[creepName];
			console.log('Clearing non-existing creep memory:', creepName);
		}
	}
	
	var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
	var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
	var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
	var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
	var bootstrappers = _.filter(Game.creeps, (creep) => creep.memory.role == 'bootstrapper');

    var boostrapThreshold = 400;
    var bootstrapperSpec = [WORK, CARRY, MOVE, MOVE];
	var harvesterSpec = [WORK, WORK, MOVE]; // 250
	var harvestersDesired = 2;
	var haulerSpec = [CARRY, MOVE, CARRY, MOVE]; // 200
	var haulersDesired = 4;
	var upgraderSpec = [WORK, MOVE, CARRY, MOVE]; // 250
	var upgradersDesired = 2;

    if ( bootstrappers.length < 3 ) {
        var newName = 'Bootstrapper' + Game.time;
        home.spawnCreep(bootstrapperSpec, newName, { memory: { role: 'boostrapper'} } );
    } else {
	    if ( harvesters.length < harvestersDesired ) {
		    var newName = 'Harvester' + Game.time;
    		home.spawnCreep(harvesterSpec, newName, { memory: { role: 'harvester' } } );
	    } else if ( haulers.length < haulersDesired ) {
		    var newName = 'Hauler' + Game.time;
    		home.spawnCreep(haulerSpec, newName, { memory: { role: 'hauler' } } );
	    } else if ( upgraders.length < upgradersDesired ) {
		    var newName = 'Upgrader' + Game.time;
	    	home.spawnCreep(upgraderSpec, newName, { memory: { role: 'upgrader' } } );
    	}   

	    if ( Game.spawns['Spawn1'].spawning ) {
    		var spawningCreep = Game.creeps[home.spawning.name] 

    		home.room.visual.text(
    			'Building ' + spawningCreep.memory.role,
    			home.pos.x + 1,
    			home.pos.y, { align: 'left', opacity: 0.8 }
    		);
    	}
    }
    
	for ( var creepName in Game.creeps ) {
		var creep = Game.creeps[creepName]

        if ( creep.memory.role = 'bootstrapper') {
            roleBootstrapper.run(creep);
            continue
        }
		if ( creep.memory.role == 'harvester' ) {
			roleHarvester.run(creep);
			continue
		}

		if ( creep.memory.role == 'hauler' ) {
			roleHauler.run(creep);
			continue
		}

		if ( creep.memory.role == 'upgrader' ) {
			roleUpgrader.run(creep);
			continue
		}
	}
};

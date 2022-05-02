var roleHarvester = require('role.harvester');
var roleHauler = require('role.hauler');
var roleUpgrader = require('role.upgrader');

const home = Game.spawns['Spawn1']

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

	const harvesterSpec = [WORK, WORK, MOVE]
	const haulerSpec = [CARRY, MOVE, CARRY, MOVE]
	const upgraderSpec = [WORK, MOVE, CARRY, MOVE]

	if ( harvesters.length < 2 ) {
		var newName = 'Harvester' + Game.time;
		home.spawnCreep(harvesterSpec, newName, { memory: { role: 'harvester' } } );
	} else if ( haulers.length < 2 ) {
		var newName = 'Hauler' + Game.time;
		home.spawnCreep(haulerSpec, newName, { memory: { role: 'hauler' } } );
	} else if ( upgraders.length < 2 ) {
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

	for ( var creepName in Game.creeps ) {
		var creep = Game.creeps[creepName]

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

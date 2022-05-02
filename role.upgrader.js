var roleUpgrader = {
	/** @param {Creep} creep **/
	run: function(creep) {
		if ( creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0 ) {
			creep.memory.upgrading = false;
		} else if ( !creep.memory.upgrading && creep.store.getFreeCapacity() == 0 ) {
			creep.memory.upgrading = true;
		}

		if ( creep.memory.upgrading ) {
			if ( creep.upgradeController(creep.room.controller ) == ERR_NOT_IN_RANGE ) {
				creep.moveTo(creep.room.controller);
			} else {
				const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
					filter: resource => resource.resourceType == RESOURCE_ENERGY
				})

				const closest DroppedEnergy = creep.pos.findClosestByPath(droppedEnergy)

				if ( creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE ) {
					creep.moveTo(closestDroppedEnergy);
				}
			}
		}
	}
};

module.exports = roleUpgrader;

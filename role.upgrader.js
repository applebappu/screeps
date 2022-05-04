var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if ( creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0 ) {
            creep.memory.upgrading = false;
        }
        if ( !creep.memory.upgrading && creep.store.getFreeCapacity() == 0 ) {
            creep.memory.upgrading = true;
        }

        if ( creep.memory.upgrading ) {
            if ( creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE ) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } } );
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            var closestSource = creep.pos.findClosestByPath(sources)
            
            if ( creep.harvest(closestSource) == ERR_NOT_IN_RANGE ) {
                creep.moveTo(closestSource, { visualizePathStyle: { stroke: '#ffaa00' } } );
            }
        }
    }
};

module.exports = roleUpgrader;

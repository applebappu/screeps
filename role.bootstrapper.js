var roleBootstrapper = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES_ACTIVE)
        var closestSource = creep.pos.findClosestByPath(sources)
        var mySpawns = creep.room.find(FIND_MY_SPAWNS)
        var closestSpawn = creep.pos.findClosestByPath(mySpawns)
        
        if ( creep.store.getFreeCapacity() > 0 ) {
            if ( creep.harvest(closestSource) == ERR_NOT_IN_RANGE ) {
                creep.moveTo(closestSource);
            }
        } else if ( creep.store.getFreeCapacity() == 0 ) {
            if ( creep.transfer(closestSpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
                creep.moveTo(closestSpawn)
            }
        }
    }
};

module.exports = roleBootstrapper;

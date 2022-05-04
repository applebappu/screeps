var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if ( creep.store.getFreeCapacity() > 0 ) {
            var sources = creep.room.find(FIND_SOURCES);
            var closestSource = creep.pos.findClosestByPath(sources)
            if ( creep.harvest(closestSource) == ERR_NOT_IN_RANGE ) {
                creep.moveTo(closestSource, { visualizePathStyle: { stroke: '#ffaa00' } } );
            }
        }
};

module.exports = roleHarvester;

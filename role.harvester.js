var roleHarvester = {
	/** @param {Creep} creep **/
	run: function(creep) {
		var sources = creep.room.find(FIND_SOURCES_ACTIVE)
		const closestSource = creep.pos.findClosestByPath(sources)
		
		if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
			creep.moveTo(closestSource);
		}
	}
};

module.exports = roleHarvester;

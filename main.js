var roleharvester = require('role.harvester');
var roleupgrader = require('role.upgrader');
var rolebuilder = require('role.builder');
var roledefender = require('role.defender');
var rolehauler = require('role.hauler');

var quotahandler = require('handler.quotas');

var home = Game.spawns['Spawn1'];
var harvesterSpec = [WORK, MOVE];
var haulerSpec = [CARRY, MOVE];
var workerSpec = [WORK, CARRY, MOVE]; // for Builders and Upgraders
var defenderSpec = [TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, MOVE, ATTACK, MOVE];

function filterfunc(role) = {_.filter(Game.creeps, (creep) => creep.memory.role == role)};
function makecreep(which_spawn, which_spec, which_role) = {
    var newName = which_role + ' ' + Game.time;
    which_spawn.spawnCreep(which_spec, newName, { memory: { role: which_role } } );
};

module.exports.loop = function () {
    for( var name in Game.creeps ) {
        var role = creep.memory.role;
        var runfunc = str.concat('role', role);
        runfunc.run(creep);
    }
    
    if ( Object.keys(filterfunc('harvesters')).length < quotahandler.setCreepQuotas('harvesters') ) {
        makecreep(home, harvesterSpec, 'harvester');
    } else if ( Object.keys(filterfunc('upgraders')).length < quotahandler.setCreepQuotas('upgraders') ) {
        makecreep(home, workerSpec, 'upgrader');
    } else if ( Object.keys(filterfunc('builders')).length < quotahandler.setCreepQuotas('builders') ) {
        makecreep(home, workerSpec, 'builder');
    } else if ( Object.keys(filterfunc('defenders')).length < quotahandler.setCreepQuotas('defenders') ) {
       makecreep(home, defenderSpec, 'defender');
    }
};

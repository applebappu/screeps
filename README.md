# screeps
Codebase for my Screeps (Scripting Creeps) bot: https://screeps.com

Not very complicated yet.  My core concept revolves around stationary harvesters, with dedicated haulers, builders, and upgraders.  Builders and upgraders share the same body type, though, so I'd like to be able to combine them somehow eventually.

I have a quota handler function that I still need to merge in from my live codebase, to set quotas for various creep types based on the characteristics of a given room, but it's a WIP (like all of this).  Also need to merge my Hauler role file.

The main things this codebase needs right now are a way to dynamically allocate the Defender quota based on incoming threats, some kind of scouting unit that can tag paths and resource spots for the haulers and harvesters, to smooth their pathfinding and reduce CPU, and multi-room support for the logic.  I find that creeps will sometimes wander into neighboring rooms if a target is close enough (be it a source or what have you) and then not be able to get back.

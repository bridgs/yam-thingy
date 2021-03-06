define(function() {
	function GameMaster(params) {
		this.simulation = params.simulation;
		this._actions = [];
		//state variables
		this.nextEntityId = 0;
	}
	GameMaster.prototype.reset = function() {
		this._actions = [];
		for(var i = 0; i < 15; i++) {
			this._actions.push({
				type: 'spawn-entity',
				entityId: this.nextEntityId++,
				entityType: (Math.random() > 0.5 ? 'SyncedCrate' : 'DesyncedCrate'),
				entityState: {
					x: Math.round(100 + 400 * Math.random()),
					y: Math.round(100 + 200 * Math.random()),
					velX: 0,
					velY: 0
				}
			});
		}
	};
	GameMaster.prototype.update = function() {
		//check for hits on SyncedCrates
		for(i = 0; i < this.simulation.entities.length; i++) {
			for(j = 0; j < this.simulation.entities.length; j++) {
				if(i !== j && this.simulation.entities[i].type === 'Square' &&
					this.simulation.entities[j].type === 'SyncedCrate' &&
					this.simulation.entities[i].isAttacking() &&
					this.simulation.entities[i].isInAttackRange(this.simulation.entities[j])) {
					this._actions.push({
						type: 'entity-action',
						entityId: this.simulation.entities[j].id,
						action: {
							type: 'push',
							speed: 4,
							fromX: this.simulation.entities[i].x,
							fromY: this.simulation.entities[i].y
						}
					});
				}
			}
		}
	};
	GameMaster.prototype.addPlayer = function(player) {
		//spawn a new entity for that player to control
		var entityId = this.nextEntityId++;
		this._actions.push({
			type: 'spawn-entity',
			entityId: entityId,
			entityType: 'Square',
			entityState: {
				x: 300,
				y: 200
			}
		});
		//put the player in control of that entity
		player.setState({
			entityId: entityId
		});
		player.join();
	};
	GameMaster.prototype.removePlayer = function(player) {
		//despawn the player's entity
		if(player.entityId !== null) {
			this._actions.push({
				type: 'despawn-entity',
				entityId: player.entityId
			});
		}
	};
	GameMaster.prototype.popActions = function() {
		var actions = this._actions;
		this._actions = [];
		return actions;
	};
	return GameMaster;
});
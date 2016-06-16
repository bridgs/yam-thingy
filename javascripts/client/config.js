define({
	//display
	CANVAS_WIDTH: 800,
	CANVAS_HEIGHT: 600,

	//network
	LOG_NETWORK_TRAFFIC: false,
	FAKE_LAG_MILLISECONDS: 600, //roundtrip time
	FAKE_LAG_VARIATION: 0.1, //0 no variation, 1 anywhere from no to double lag
	PINGS_UNTIL_CLOCK_SYNCED: 6,
	PINGS_TO_STORE: 20,
	PINGS_TO_IGNORE: 1,
	MILLISECONDS_BETWEEN_PINGS: 500,
	MILLISECONDS_BETWEEN_PINGS_INITIALLY: 100,
	TIME_SYNC_LOWER_BOUND_WEIGHT: 0.47, //between 0 and 1
	EXTRA_FRAME_LATENCY_BUFFER: 2,

	//input
	LOG_KEY_EVENTS: false,
	KEY_BINDINGS: {
		38: "UP", 87: "UP",
		37: "LEFT", 65: "LEFT",
		40: "DOWN", 83: "DOWN",
		39: "RIGHT", 68: "RIGHT"
	}
});
var Audio = function ( element ) {

	var AudioContext = window.AudioContext || window.webkitAudioContext;
	var context = new AudioContext();

	var analyser = context.createAnalyser();
	analyser.fftSize = 512;
	analyser.connect( context.destination );

	var gain = context.createGain();
	gain.gain.value = 10;
	gain.connect( analyser );

	var source = context.createMediaElementSource( element );
	source.connect( gain );

	//

	var frequencyData = new Uint8Array( analyser.frequencyBinCount );

	return {

		mark: 0,
		getFrequency: function () {

			return frequencyData;

		},
		getCurrentTime: function () {

			return context.currentTime;

		},
		update: function () {

			analyser.getByteFrequencyData( frequencyData );

		}

	};

};

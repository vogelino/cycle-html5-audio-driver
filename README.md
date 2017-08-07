# Audio driver for cycle.js applications
A [cycle.js](https://cycle.js.org/) driver based on the [html5 audio element](https://developer.mozilla.org/en/docs/Web/HTML/Element/audio) for playing sounds.

## Install
```sh
npm install --save cycle-html5-audio-driver
```

## Usage
The audio driver expects a stream of arrays containing objects of two keys:
**soundPath:** A string path to a sound file (local or external)
**toPlay:** A boolean value representing whether the sound should be played or not
```js
import { run } from '@cycle/run';
import xs from 'xstream';
import { makeAudioDriver } from 'cycle-html5-audio-driver';

const main = (sources) => {
	...

	return {
		audio: xs.of([
			{
				soundPath: 'path/to/my/audio/file.mp3',
				toPlay: true, // Will be played completely
			},
			{
				soundPath: 'path/to/other/audio/file.wav',
				toPlay: false, // Will not start util it is passed true again,
							   // but will continue playing
			},
		]),
	}
};

run(main, { audio: makeAudioDriver() });
```

Each object in the sounds array emmited via the audio sink will produce a sound for its total duration. A sound cannot be stopped and only replayed.
This happens when it has been reset to `false` and then `true` again.


## Motivation
The driver was created for a personal project that served the goal to experiment with cycle.js. It is a simple javascript piano playing sounds when the keys are pressed.

**See the project on Github:** [Reactive piano](https://github.com/vogelino/reactive-piano)

## Disclaimer
The driver is really simple and may not be used in production applications. It only produces write effects (playing sounds) and doesn't retrieve any feedback (read effects). Please feel free to improve upon this package and to send PRs but do not expect too much of it. :)

import xs from 'xstream';
import { adapt } from '@cycle/run/lib/adapt';

const createAudioElementBySrc = (audioSrc) => {
	const audioElement = document.createElement('audio');
	audioElement.setAttribute('src', audioSrc);
	return {
		toPlay: false,
		playing: false,
		element: audioElement,
	};
};

export const makeAudioDriver = () => {
	const soundsCache = {};
	return (soundsToPlay$) => {
		soundsToPlay$.addListener({
			next(sounds) {
				sounds.forEach(({ soundPath, toPlay }) => {
					if (!soundsCache[soundPath]) {
						soundsCache[soundPath] = createAudioElementBySrc(soundPath);
						soundsCache[soundPath].element.addEventListener('ended', () => {
							soundsCache[soundPath].element.currentTime = 0;
							soundsCache[soundPath].element.pause();
							if (!soundsCache[soundPath].toPlay) {
								soundsCache[soundPath].playing = false;
							}
						}, false);
					}
					const cachedSound = soundsCache[soundPath];
					if (toPlay && !cachedSound.playing) {
						cachedSound.element.currentTime = 0;
						cachedSound.element.play();
						cachedSound.playing = true;
					}
					else if (!toPlay && cachedSound.playing) {
						cachedSound.playing = false;
					}
					cachedSound.toPlay = toPlay;
				});
			},
			error() {},
			complete() {},
		});

		return adapt(xs.of(() => {}));
	};
};

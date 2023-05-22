
import { useEffect, useRef, useState } from "react";

import { convertToDuration } from "../../utils/time";
import { useLink } from "../../context/LinkContext";

import "./audioControls.scss";

const MIN_VOLUME: number = 0;
const MAX_VOLUME: number = 2;

const AudioControls: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(1);
    const [currentTime, setCurrentTime] = useState<number>(0);

    const songLength = useRef<number>(0);

    const audioElement = useRef<HTMLAudioElement | null>(null);
    const progressElement = useRef<HTMLInputElement | null>(null);

    const audioContext = useRef<AudioContext | null>(null);
    const gainNode = useRef<GainNode | null>(null);

    const audioSrc: string = useLink();

    const initAudioContext = () => {
        if (audioElement && audioElement.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext.current = new AudioContext();
            const track = audioContext.current.createMediaElementSource(audioElement.current as HTMLAudioElement);
            gainNode.current = audioContext.current.createGain();
            track.connect(gainNode.current).connect(audioContext.current.destination);
        }
    }

    const handlePlayClick = () => {
        if (audioContext?.current?.state === "suspended") {
            audioContext.current.resume();
        }

        if (audioElement && audioElement.current) {
            !isPlaying ? audioElement.current.play() : audioElement.current.pause();
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (gainNode && gainNode.current) {
            const newVolume = +event.target.value;
            gainNode.current.gain.value = newVolume;
            setVolume(newVolume);

            const progress = (newVolume / MAX_VOLUME) * 100;
            event.target.style.background = `linear-gradient(to right, #000000 ${progress}%, #FFFFFF ${progress}%)`;
        }
    };

    const updateProgressBar = (time: number) => {
        if (progressElement && progressElement.current) {
            const currentSecond = Math.ceil(time);
            const progress: number = Math.ceil(currentSecond * 100 / songLength.current);
            progressElement.current.style.background = `linear-gradient(to right, #FFFFFF ${progress}%, #ADACAD ${progress}%)`;
        }
    };

    const resetProgressBar = () => {
        if (progressElement && progressElement.current) {
            progressElement.current.style.background = `linear-gradient(to right, #FFFFFF 1%, #ADACAD 1%)`;
        }
    };

    const rewindSong = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = +event.target.value;
        if (audioElement && audioElement.current) {
            audioElement.current.currentTime = newTime;
        }
        setCurrentTime(newTime);
        updateProgressBar(newTime);
    };

    useEffect(() => {
        initAudioContext();
    }, []);

    useEffect(() => {
        const stopPlaying = () => {
            setIsPlaying(false);
            setCurrentTime(0);
            resetProgressBar();
        };
        const updateTime = () => {
            if (audioElement.current?.currentTime) {
                const newTime = audioElement.current?.currentTime;
                setCurrentTime(newTime);
                updateProgressBar(newTime);
            }
        };
        const updateSongInfo = () => {
            if (audioElement.current) {
                songLength.current = audioElement.current.duration;
            }
        };

        if (audioElement.current) {
            audioElement.current.addEventListener("loadedmetadata", updateSongInfo);
            audioElement.current.addEventListener("ended", stopPlaying);
            audioElement.current.addEventListener("timeupdate", updateTime);

            return () => {
                audioElement.current?.removeEventListener("load", updateSongInfo);
                audioElement.current?.removeEventListener("ended", stopPlaying);
                audioElement.current?.removeEventListener("timeupdate", updateTime);
            };
        }
    }, []);

    return (
        <>
            <audio src={audioSrc} ref={audioElement} crossOrigin="anonymous" />
            <div className="player__controls controls">
                <button className={isPlaying ? "controls__play_paused" : "controls__play"} onClick={handlePlayClick} />
                <input className="controls__progress" ref={progressElement} type="range" min="0" max={songLength.current} step="1" value={currentTime} onChange={rewindSong} />
                <span className="controls__duration">{convertToDuration(currentTime)}</span>
                <input className="controls__volume" type="range" min={MIN_VOLUME} max={MAX_VOLUME} step="0.01" value={volume} onChange={handleVolumeChange} />
            </div>
        </>
    );
};

export default AudioControls;
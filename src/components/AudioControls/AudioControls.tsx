import { useCallback, useEffect, useRef, useState } from "react";

import cn from "classnames";

import { useLink } from "../../context/LinkContext";

import AudioDuration from "./components/AudioDuration/AudioDuration";
import AudioPlayButton from "./components/AudioPlayButton/AudioPlayButton";
import AudioProgress from "./components/AudioProgress/AudioProgress";
import AudioVolume, { MAX_VOLUME } from "./components/AudioVolume.tsc/AudioVolume";

import "./audioControls.scss";
import Loader from "../Loader/Loader";

const AudioControls: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [volume, setVolume] = useState<number>(1);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [songLength, setSongLength] = useState<number>(Infinity);

    const audioElement = useRef<HTMLAudioElement | null>(null);
    const progressElement = useRef<HTMLInputElement | null>(null);
    const audioContext = useRef<AudioContext | null>(null);
    const gainNode = useRef<GainNode | null>(null);

    const audioSrc: string = useLink();

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
            const newTime = audioElement.current?.currentTime;
            setCurrentTime(newTime || 0);
        };
        const updateSongInfo = () => {
            setSongLength(audioElement.current?.duration || Infinity);
            setIsLoading(false);
        };

        audioElement.current?.addEventListener("loadeddata", updateSongInfo);
        audioElement.current?.addEventListener("ended", stopPlaying);
        audioElement.current?.addEventListener("timeupdate", updateTime);

        return () => {
            audioElement.current?.removeEventListener("loadeddata", updateSongInfo);
            audioElement.current?.removeEventListener("ended", stopPlaying);
            audioElement.current?.removeEventListener("timeupdate", updateTime);
        };
    }, []);

    useEffect(() => {
        if (progressElement && progressElement.current) {
            const currentSecond = Math.ceil(currentTime);
            const progress: number = Math.ceil(currentSecond * 100 / songLength);
            progressElement.current.style.background = `linear-gradient(to right, #FFFFFF ${progress}%, #ADACAD ${progress}%)`;
        }
    }, [currentTime, songLength]);

    const initAudioContext = async () => {
        if (audioElement && audioElement.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext.current = new AudioContext();
            const track = audioContext.current.createMediaElementSource(audioElement.current as HTMLAudioElement);
            gainNode.current = audioContext.current.createGain();
            track.connect(gainNode.current).connect(audioContext.current.destination);
        }
    };

    const resetProgressBar = () => {
        if (progressElement && progressElement.current) {
            progressElement.current.style.background = `linear-gradient(to right, #FFFFFF 1%, #ADACAD 1%)`;
        }
    };

    const handlePlayClick = useCallback(() => {
        if (audioContext?.current?.state === "suspended") {
            audioContext.current.resume();
        }

        if (audioElement && audioElement.current) {
            !isPlaying ? audioElement.current.play() : audioElement.current.pause();
            setIsPlaying(!isPlaying);
        }
    }, [isPlaying]);

    const handleProgress = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (audioElement && audioElement.current) {
            const newTime = +event.target.value;
            audioElement.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    }, []);

    const handleVolume = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (gainNode && gainNode.current) {
            const newVolume = +event.target.value;
            gainNode.current.gain.value = newVolume;
            setVolume(newVolume);

            const progress = (newVolume / MAX_VOLUME) * 100;
            event.target.style.background = `linear-gradient(to right, #000000 ${progress}%, #FFFFFF ${progress}%)`;
        }
    }, [volume]);

    const playerControlsClass = cn("player__controls", "controls");
    const audioPlayBtnClass = cn({
        "controls__play": !isPlaying,
        "controls__play_paused": isPlaying,
    });
    const audioProgressClass = cn("controls__progress");
    const audioDurationClass = cn("controls__duration");
    const audioVolumeClass = cn("controls__volume");

    return (
        <>
            <audio src={audioSrc} ref={audioElement} crossOrigin="anonymous" />
            <div className={playerControlsClass}>
                {isLoading && <Loader />}
                <AudioPlayButton className={audioPlayBtnClass} onClick={handlePlayClick} />
                <AudioProgress className={audioProgressClass} ref={progressElement} value={currentTime} maxValue={songLength} onChange={handleProgress} />
                <AudioDuration className={audioDurationClass} currentTime={currentTime} />
                <AudioVolume className={audioVolumeClass} value={volume} onChange={handleVolume} />
            </div>
        </>
    );
};

export default AudioControls;
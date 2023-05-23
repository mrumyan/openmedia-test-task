import { Link, Navigate } from "react-router-dom";

import AudioControls from "../AudioControls/AudioControls";

import { useLink } from "../../context/LinkContext";

import "./audioPlayer.scss";

const AudioPlayer: React.FC = () => {
    const audioSrc: string = useLink();

    return (
        <>
            <Link className="player__back" to="/">← Back</Link>
            {audioSrc ? <AudioControls /> : <Navigate to="/" replace />}
        </>
    );
};

export default AudioPlayer;
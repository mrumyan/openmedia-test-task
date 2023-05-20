import { Link } from "react-router-dom";

import { useLink } from "../../context/LinkContext";

import "./audioPlayer.scss";

const AudioPlayer: React.FC = () => {
    const audioSrc: string = useLink();

    return (
        <>
            <Link className="player__back" to="/">← Back</Link>
            <audio src={audioSrc} controls autoPlay />
        </>
    );
};

export default AudioPlayer;
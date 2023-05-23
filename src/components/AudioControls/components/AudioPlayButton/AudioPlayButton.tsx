import "./audioPlayButton.scss";

type AudioPlayButtonProps = {
    onClick: () => void;
    className?: string;
}

const AudioPlayButton: React.FC<AudioPlayButtonProps> = ({ onClick, className }) => {
    return (
        <button className={className} onClick={onClick} />
    );
};

export default AudioPlayButton;
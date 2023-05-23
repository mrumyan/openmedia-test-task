import "./audioVolume.scss";

const VOLUME_STEP: number = 0.01;
const MIN_VOLUME: number = 0;
export const MAX_VOLUME: number = 2;

type AudioVolumeProps = {
    value: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const AudioVolume: React.FC<AudioVolumeProps> = ({ value, onChange, className }) => {
    return (
        <input className={className} type="range" min={MIN_VOLUME} max={MAX_VOLUME} step={VOLUME_STEP} value={value} onChange={onChange} />
    );
};

export default AudioVolume;
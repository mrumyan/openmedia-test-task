import { convertToDuration } from "../../../../utils/time";

import "./audioDuration.scss";

type AudioDurationProps = {
    currentTime: number;
    className?: string;
}

const AudioDuration: React.FC<AudioDurationProps> = ({ currentTime, className }) => {
    return (
        <span className={className}>{convertToDuration(currentTime)}</span>
    );
};

export default AudioDuration;
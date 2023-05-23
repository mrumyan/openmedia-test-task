import React from "react";

import "./audioProgress.scss";

const PROGRESS_STEP: number = 1;
const MIN_PROGRESS: number = 0;

type AudioProgressProps = {
    value: number;
    maxValue: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const AudioProgress = React.forwardRef<HTMLInputElement | null, AudioProgressProps>(({ value, maxValue, onChange, className }, ref) => {
    return (
        <input className={className} ref={ref} type="range" min={MIN_PROGRESS} max={maxValue} step={PROGRESS_STEP} value={value} onChange={onChange} />
    );
});

export default AudioProgress;
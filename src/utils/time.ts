const formatNumber = (number: number): string => number < 10 ? `0${number}` : `${number}`;

export const convertToDuration = (time: number): string => {
    const minutes = Math.trunc(time / 60);
    const seconds = Math.trunc(time % 60);
    return `${formatNumber(minutes)}:${formatNumber(seconds)}`;
}
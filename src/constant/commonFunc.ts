const MINUTE_IN_MS = 60 * 1000;

const formatTime = (timeInMs: number) => {
    const minutes = Math.floor(timeInMs / MINUTE_IN_MS);
    const seconds = Math.floor((timeInMs % MINUTE_IN_MS) / 1000);
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export {
    formatTime
}
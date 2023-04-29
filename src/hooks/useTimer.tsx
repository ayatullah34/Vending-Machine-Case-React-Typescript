import { useState, useEffect, useRef, useCallback } from "react";

type UseTimerProps = {
    initialTime: number;
    onTimerEnd?: () => void;
};

const useTimer = ({ initialTime, onTimerEnd }: UseTimerProps) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startTimer = useCallback(() => {
        if (timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((time) => time - 1000);
            }, 1000);
        }
    }, [timeLeft]);

    const resetTimer = useCallback(() => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setTimeLeft(initialTime);
    }, [initialTime]);

    useEffect(() => {
        if (timeLeft <= 0) {
            clearInterval(intervalRef.current!);
            if (onTimerEnd) onTimerEnd();
        }
    }, [timeLeft, onTimerEnd]);

   

    return { timeLeft, startTimer, resetTimer };
};

export default useTimer;

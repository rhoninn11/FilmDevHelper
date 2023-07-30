import classNames from 'classnames';
import styles from './step-process-preview.module.scss';
import FilmCard_module from '../film-card/film-card.module.scss';

import { useEffect, useState } from 'react';

import { Card, Elevation, ProgressBar } from '@blueprintjs/core';
import { TimeDisplay } from '../time-display/time-display';

export interface StepProcessPreviewProps {
    className?: string;
    children?: React.ReactNode;
    time_s: number;
    start: boolean;
    onFinish?: () => void;
}

export const StepProcessPreview = ({
    className,
    children,
    time_s,
    start = false,
    onFinish,
}: StepProcessPreviewProps) => {
    const [progress, setProgress] = useState(0.0);
    const [startTimestamp, setStartTimestamp] = useState<number>(-1.);
    const [timeInterval, setTimeInterval] = useState<number>(time_s);
    const [finished, setFinished] = useState<boolean>(false);
    const [started, setStarted] = useState<boolean>(false);


    let update_fn = () => {
        let now = Date.now();
        let s_elapsed = (now - startTimestamp)/1000.0;
        let progress_value = s_elapsed / (timeInterval + 0.0001);

        if (progress_value >= 1.0) progress_value = 1.0;
        setProgress(progress_value);
        if (progress_value == 1.0) setFinished(true)
    };

    let init_action = () => {
        setStartTimestamp(Date.now());
        setTimeInterval(time_s);
    };

    let time_left = () => {
        return timeInterval - timeInterval*progress;
    }

    useEffect(() => {
        if (start && !started) {
            init_action();
            setStarted(true);
        }
        if (started && !finished) {
            let interval = setInterval(update_fn, 20);
            return () => clearInterval(interval);
        }
        if (finished && onFinish) {
            onFinish();
        }
    }, [start, started, finished, progress]);
    
    return (
        <Card
            className={classNames(
                className,
                FilmCard_module.card,
                FilmCard_module.in_progress,
                styles.custom_padding,
            )}
            elevation={Elevation.TWO}
            interactive>
            <div className={styles.rows}>
                <TimeDisplay 
                    time_s={time_left()}/>
                <ProgressBar 
                    intent="primary" value={progress} />
            </div>
        </Card>
    );
};

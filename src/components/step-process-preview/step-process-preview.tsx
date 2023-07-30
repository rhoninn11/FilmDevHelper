import classNames from 'classnames';
import styles from './step-process-preview.module.scss';
import FilmCard_module from '../film-card/film-card.module.scss';

import { useEffect, useState } from 'react';

import { Card, Elevation, ProgressBar } from '@blueprintjs/core';

export interface StepProcessPreviewProps {
    className?: string;
    children?: React.ReactNode;
    time_s: number;
    onFinish?: () => void;
}

export const StepProcessPreview = ({
    className,
    children,
    time_s,
    onFinish,
}: StepProcessPreviewProps) => {
    const [progress, setProgress] = useState(0.0);
    const [startTimestamp, setStartTimestamp] = useState<number>(-1.);
    const [timeInterval, setTimeInterval] = useState<number>(-1.);
    const [finished, setFinished] = useState<boolean>(false);


    let update_fn = () => {
        let now = Date.now();
        let s_elapsed = (now - startTimestamp)/1000.0;
        let progress_value = s_elapsed / (timeInterval + 0.0001);
        if (progress_value >= 1.0) progress_value = 1.0;
        setProgress(progress_value);
        if (progress_value == 1.0) setFinished(true)

    };

    let init_action = () => {
        setTimeInterval(time_s)
        setStartTimestamp(Date.now());
    };

    useEffect(() => {
        if (startTimestamp < 0) init_action();

        if (!finished){
            let interval = setInterval(update_fn, 100);
            return () => clearInterval(interval);
        }

        if (finished && onFinish) onFinish()

        return () => {};

    }, [progress, finished]);

    return (
        <Card
            className={classNames(
                className,
                FilmCard_module.card,
                FilmCard_module.in_progress
            )}
            elevation={Elevation.TWO}
            interactive
        >
            <ProgressBar intent="primary" value={progress} />
            <div>{children}</div>
        </Card>
    );
};

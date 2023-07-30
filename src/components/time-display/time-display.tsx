import { Card, Elevation } from '@blueprintjs/core';
import classNames from 'classnames';
import styles from './time-display.module.scss';
import { useState } from 'react';

export interface TimeDisplayProps {
    time_s: number;
}

export const TimeDisplay = ({
    time_s,
}: TimeDisplayProps) => {

    const sampleValue = time_s;
    let sec = sampleValue % 60
    let min = (Math.floor(sampleValue / 60))

    return (
        <div>
            <div className={styles.frow}>
                <span>{min} min </span>
                <span>:</span>
                <span>{sec} sec </span>
            </div>
        </div>
    );
};

import { Card, Elevation } from '@blueprintjs/core';
import classNames from 'classnames';
import styles from './time-picker.module.scss';
import { useState } from 'react';

export interface TimePickerProps {
    valueSetter: (value: number) => void;
    value: number;
}

export const TimePicker = ({
    valueSetter,
    value,
}: TimePickerProps) => {

    const sampleValue = value;
    let sec = sampleValue % 60
    let min = (Math.floor(sampleValue / 60))

    const bLimit = 0;
    const uLimit = 59;

    const limit_overflow = (value: number) => {
        if (value < bLimit) return uLimit;
        if (value > uLimit) return bLimit;
        return value;
    }

    const onChange = (
        ev: React.ChangeEvent<HTMLInputElement>,
        choooser: 'm' | 's',     
    ) => {
        console.log(`${ev.target.value}`)
        let intValue = parseInt(ev.target.value);
        if (Number.isNaN(intValue)) intValue = 0;
        let limitedValue = limit_overflow(intValue)

        if (choooser === 'm') min = limitedValue;
        if (choooser === 's') sec = limitedValue;

        console.log(`min: ${min}, sec: ${sec}`);
        console.log(`value: ${intValue}, limitedValue: ${limitedValue}, choooser: ${choooser}`);
        let newValue = min * 60 + sec;
        console.log(`newValue: ${newValue}`);
        valueSetter(newValue);
    }

    return (
        <div>
            <div className={styles.frow}>
                <input type="number" placeholder="mm" 
                    className={styles.rowi} 
                    min={bLimit-1} max={uLimit+1}
                    value={min} onChange={(ev) => onChange(ev, 'm')}/>
                <span>:</span>
                <input type="number" placeholder="ss"
                    className={styles.rowi}
                    min={bLimit-1} max={uLimit+1}
                    value={sec} onChange={(ev) => onChange(ev, 's')}/>
                <span>mm:ss</span>
            </div>
        </div>
    );
};

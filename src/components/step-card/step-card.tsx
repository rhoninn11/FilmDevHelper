import { Card, Button, H2, Elevation } from '@blueprintjs/core';
import classNames from 'classnames';
import styles from './step-card.module.scss';
import { DevStep } from '../../logic/data-props';
import { TooltipedButton } from '../tooltiped-button/tooltiped-button';
import { POPOVER_WRAPPER } from '@blueprintjs/core/lib/esm/common/classes';

export interface StepCardProps {
    className?: string;
    step: DevStep;
    onDevelop?: (firstStep: DevStep) => void;
}

/**
 * This component was generated using Codux's built-in Card new component template.
 * For details on on how to create custom new component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const StepCard = ({ 
    className,
    step,
    onDevelop
}: StepCardProps) => {

    const mOnDevelopHandler = () =>{
        console.log(`first step title ${step.title}`);
        if (onDevelop) onDevelop(step);
    }

    return (
        <Card className={ classNames(styles.wrapper, styles.card)}>
            <H2>{step.title}</H2>
            <p>{step.content}</p>
            <Card className={classNames(styles.wrapper, styles.card)}>
                {'Timer: '}
                {Math.floor(step.timerLength_s / 60)}
                {' min '}
                {step.timerLength_s % 60}
                {' sec'}
            </Card>
            <Card className={classNames(styles.wrapper, styles.card)}>
                {'Room temperature: '}
                {step.temp}
                {'°C'}
            </Card>
            <Card className={classNames(styles.wrapper, styles.card, styles.horizontal)}>
                <TooltipedButton
                    icon={'flow-linear'}
                    tipText={'Start process'}
                    onClick={mOnDevelopHandler}
                />
                <TooltipedButton icon={'annotation'} tipText={'Notes'} active />
            </Card>
        </Card>
    );
};

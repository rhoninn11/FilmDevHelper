import { Card, Button, H2, Elevation, Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import styles from './step-card.module.scss';
import { DevStep } from '../../logic/data-props';
import { TooltipedButton } from '../tooltiped-button/tooltiped-button';
import { POPOVER_WRAPPER } from '@blueprintjs/core/lib/esm/common/classes';

export interface StepCardProps {
    className?: string;
    step: DevStep;
    onDevelop?: (firstStep: DevStep) => void;
    onShowNotes?: (step: DevStep) => void;
    selected?: boolean;
}

/**
 * This component was generated using Codux's built-in Card new component template.
 * For details on on how to create custom new component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const StepCard = ({ 
    className,
    step,
    onDevelop,
    onShowNotes,
    selected,
}: StepCardProps) => {

    const mOnDevelopHandler = () =>{
        if (onDevelop) onDevelop(step);
    }

    const _on_show_notes = () => {
        if (onShowNotes) onShowNotes(step);
    }

    const highlight = selected ? Classes.ELEVATION_4 : '';

    return (
        <Card className={ classNames(styles.wrapper, styles.card, highlight)}>
            <H2>{step.title}</H2>
            <p>{step.content}</p>
            <Card className={classNames(styles.wrapper, styles.card)}>
                {'Timer: '}
                {Math.floor(step.timerLength_s / 60)}
                {' min '}
                {step.timerLength_s % 60}
                {' sec'}
            </Card>
            <Card 
                className={classNames(styles.wrapper, styles.card)}>
                {'Room temperature: '}
                {step.temp}
                {'°C'}
            </Card>
            <div className={styles.frow}>   
                    <Button className={styles.wider_brn}
                        text="Start development"
                        type="button"
                        intent="primary"
                        icon="flow-linear"
                        onClick={mOnDevelopHandler}/>
                    <Button className={styles.wider_brn}
                        text="Notes"
                        type="button"
                        intent="primary"
                        icon="annotation"
                        onClick={_on_show_notes}/>

            </div>
        </Card>
    );
};

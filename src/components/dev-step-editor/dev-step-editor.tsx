import { Card, Button, H2, Elevation, InputGroup, TextArea, Switch, NumericInput } from '@blueprintjs/core';
import { TooltipedButton } from '../tooltiped-button/tooltiped-button';

import classNames from 'classnames';
import styles from './dev-step-editor.module.scss';

import { DevStep } from '../../logic/data-props';
import { useState } from 'react';

import { inputEditor, textAreaEditor } from '../../logic/editor-helper';
import { editDBDevStep } from '../../logic/db';
import { TimePicker } from '../time-picker/time-picker';

export interface DevStepEditorProps {
    className?: string;
    devStep: DevStep;
}

/**
 * This component was generated using Codux's built-in Card new component template.
 * For details on on how to create custom new component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const DevStepEditor = ({
    className,
    devStep,
}: DevStepEditorProps) => {
    const [hasChanges, setHasChanges] = useState(false)
    const [lastData, setLastData] = useState<DevStep>(devStep)

    const [devStepTitle, setDevStepTitle] = useState<string>(devStep.title)
    const [devStepContent, setDevStepContent] = useState<string>(devStep.content)
    const [devStepTimer, setDevStepTimer] = useState<boolean>(devStep.timer)
    const [devStepTimerLength, setDevStepTimerLength] = useState<number>(devStep.timerLength_s)
    const [devStepTemp, setDevStepTemp] = useState<number>(devStep.temp)
    
    const setComponentStates = (lastData: DevStep) => {
        setDevStepTitle(lastData.title)
        setDevStepContent(lastData.content)
        setDevStepTimer(lastData.timer)
        setDevStepTimerLength(lastData.timerLength_s)
        setDevStepTemp(lastData.temp)
    }

    const updateBaseLineStep = (baseline: DevStep) => {
        let devStepEdit: DevStep = baseline;
        devStepEdit.title = devStepTitle;
        devStepEdit.content = devStepContent;
        devStepEdit.timer = devStepTimer;
        devStepEdit.timerLength_s = devStepTimerLength;
        devStepEdit.temp = devStepTemp;

        return devStepEdit;
    }

    const submitStepEdit_2_Db = async () => {
        if (!hasChanges) return;

        let devStepEdit: DevStep = updateBaseLineStep(lastData)
        
        setLastData(devStepEdit)
        await editDBDevStep(devStepEdit.id, devStepEdit)
        setHasChanges(false)
    }

    const devStepTimerSetter = (value: boolean) => {
        setDevStepTimer(value);
        setHasChanges(true);
    }

    const devStepTimerLengthSetter = (value: number) => {
        setDevStepTimerLength(value);
        setHasChanges(true);
    }

    const revertChanges = () => {
        setComponentStates(lastData)
        setHasChanges(false)
    }

    const submitButton = <Button
        text="Accept"
        type="button"
        intent="primary"
        icon="arrow-right"
        onClick={submitStepEdit_2_Db}
    />

    const cancelButton = <Button
        text="Cancel"
        type="button"
        intent="danger"
        icon="cross"
        onClick={revertChanges}
    />

    const buttonArea = <div >
        {cancelButton}
        {submitButton}
    </div>

    const minCValue = -40;
    const maxCValue = 40;

    const cChanged = (ev: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseFloat(ev.target.value);
        if (Number.isNaN(value)) value = 0;
        if (value > maxCValue) value = maxCValue;
        if (value < minCValue) value = minCValue;

        setDevStepTemp(value);
        setHasChanges(true);
    }

    console.log(`devStepTemp: ${devStepTemp}`)

    return (
        <Card className={styles.fcolumn} elevation={Elevation.TWO} interactive>
            <InputGroup fill round placeholder="Step name" 
                value={devStepTitle} onChange={(ev) => inputEditor(ev, setDevStepTitle, setHasChanges)}/>
            <TextArea 
                value={devStepContent} onChange={(ev) => textAreaEditor(ev, setDevStepContent, setHasChanges)}/>
                <Switch checked={devStepTimer} label="Timer" onChange={(ev) => devStepTimerSetter(ev.currentTarget.checked)}/>
                {devStepTimer ? <TimePicker value={devStepTimerLength} valueSetter={devStepTimerLengthSetter}/> : null}
                <div className={styles.frow}>
                    <input type="number" placeholder="°C" 
                        className={styles.rowi} 
                        min={-40} max={40}
                        value={devStepTemp} onChange={(ev) => cChanged(ev)}/>
                    <span>°C</span>
                </div>
                

            {hasChanges ? buttonArea : null}
        </Card>
    );
};

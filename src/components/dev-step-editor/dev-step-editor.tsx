import { Card, Button, H2, Elevation, InputGroup, TextArea, Switch, NumericInput, Icon } from '@blueprintjs/core';
import { TooltipedButton } from '../tooltiped-button/tooltiped-button';

import classNames from 'classnames';
import styles from './dev-step-editor.module.scss';

import { DevStep } from '../../logic/data-props';
import { useState } from 'react';

import { inputEditor, textAreaEditor } from '../../logic/editor-helper';
import { editDBDevStep } from '../../logic/db';
import { TimePicker } from '../time-picker/time-picker';
import { DeleteOverlay } from '@/components/higher-level/overlays/delete-overlay/delete-overlay';
import { MoreOptionsMenu } from '@/components/higher-level/menus/more-options-menu/more-options-menu';

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
    const [showOverlay, setShowOverlay] = useState(false)

    const [devStepTitle, setDevStepTitle] = useState<string>(devStep.title)
    const [devStepContent, setDevStepContent] = useState<string>(devStep.content)
    const [devStepTimerLength, setDevStepTimerLength] = useState<number>(devStep.timerLength_s)
    const [devStepTemp, setDevStepTemp] = useState<number>(devStep.temp)

    const [isDeleted, setIsDeleted] = useState<boolean>(false)
    
    const setComponentStates = (lastData: DevStep) => {
        setDevStepTitle(lastData.title)
        setDevStepContent(lastData.content)
        setDevStepTimerLength(lastData.timerLength_s)
        setDevStepTemp(lastData.temp)
    }

    const updateBaseLineStep = (baseline: DevStep) => {
        let devStepEdit: DevStep = baseline;
        devStepEdit.title = devStepTitle;
        devStepEdit.content = devStepContent;
        devStepEdit.timer = true;
        devStepEdit.timerLength_s = devStepTimerLength;
        devStepEdit.temp = devStepTemp;

        return devStepEdit;
    }

    const _submitStepEdit_2_Db = async (baseline: DevStep) => {
        let devStepEdit: DevStep = updateBaseLineStep(baseline)
        console.log("devStepEdit", devStepEdit)
        setLastData(devStepEdit)
        await editDBDevStep(devStepEdit.id, devStepEdit)
        setHasChanges(false)
    }
        

    const submitStepEdit_2_Db = async () => {
        _submitStepEdit_2_Db(lastData)
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

    const remove_step_hard = async () => {
        let step_to_remove: DevStep = {...lastData}
        step_to_remove.deleted = true;
        console.log("step_to_remove", step_to_remove)
        await _submitStepEdit_2_Db(step_to_remove)
        setIsDeleted(true)
    }

    const remove_step_soft = () => {
        setShowOverlay(true)
    }

    const remove_overlay =  showOverlay ?
    <DeleteOverlay
        title={`Remove step (${devStepTitle})`}
        onClose={() => setShowOverlay(false)}
        onDelete={() => remove_step_hard()}/>
    : null

    const more_option: FilmMenuOption[] = [{
        icon: <Icon icon="remove" />,
        text: "remove step",
        action: remove_step_soft
    }]

    const editor = isDeleted ? <div></div>
        :<Card className={styles.fcolumn} elevation={Elevation.TWO} interactive>
            <p>{lastData.deleted ? "deleted" : "alive"}</p>
        <InputGroup fill round placeholder="Step name" 
            value={devStepTitle} onChange={(ev) => inputEditor(ev, setDevStepTitle, setHasChanges)}/>
        <TextArea 
            value={devStepContent} onChange={(ev) => textAreaEditor(ev, setDevStepContent, setHasChanges)}/>
        <TimePicker value={devStepTimerLength} valueSetter={devStepTimerLengthSetter}/>
        <div className={styles.frow}>
            <input type="number" placeholder="°C" 
                className={styles.rowi} 
                min={-40} max={40}
                value={devStepTemp} onChange={(ev) => cChanged(ev)}/>
            <span>°C</span>
        </div>
        {remove_overlay}
        <MoreOptionsMenu 
                options={more_option}/>
        {hasChanges ? buttonArea : null}
    </Card>

    return editor;
};

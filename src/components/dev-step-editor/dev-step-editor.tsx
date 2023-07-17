import { Card, Button, H2, Elevation, InputGroup, TextArea } from '@blueprintjs/core';
import classNames from 'classnames';
import styles from './dev-step-editor.module.scss';

import { DevStep } from '../../logic/data-props';
import { useState } from 'react';

import { inputEditor, textAreaEditor } from '../../logic/editor-helper';
import { editDBDevStep } from '../../logic/db';

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
    const [devStepTitle, setDevStepTitle] = useState(devStep.title)
    const [devStepContent, setDevStepContent] = useState(devStep.content)
    
    const submitStepEdit_2_Db = async () => {
        let devStepEdit: DevStep = devStep;
        devStepEdit.title = devStepTitle;
        devStepEdit.content = devStepContent;

        await editDBDevStep(devStepEdit.id, devStepEdit)
        console.log("Button clicked")
    }

    return (
        <Card className={`${className}`} elevation={Elevation.TWO} interactive>
            <InputGroup fill round placeholder="Step name" value={devStepTitle} onChange={(ev) => inputEditor(ev, setDevStepTitle)}/>
            <TextArea value={devStepContent} onChange={(ev) => textAreaEditor(ev, setDevStepContent)}/>
            <Button
                text="Button"
                type="button"
                intent="primary"
                icon="arrow-right"
                onClick={submitStepEdit_2_Db}
            />
        </Card>
    );
};

import { Card, Button, Elevation, TextArea, Icon } from '@blueprintjs/core';

import styles from './s.module.scss';

import { DevStep, DevStepNote } from '../../../logic/data-props';
import { useState } from 'react';

import { textAreaEditor } from '../../../logic/editor-helper';
import { editDBDevStepNote } from '../../../logic/db';
import { MoreOptionsMenu } from '../../higher-level/others/more-options-menu/more-options-menu';
import { DeleteOverlay } from '../../higher-level/overlays/delete-overlay/delete-overlay';

import { FilmMenuOption } from '../../../logic/my-types';
import { AcceptCancelPrompt } from '../../higher-level/others/accept_cancel_prompt/accept_cancel_prompt';
import classNames from 'classnames';

export interface NoteEditorProps {
    className?: string;
    note: DevStepNote;
    dev_step: DevStep;
}

export const NoteEditor = ({
    className,
    note,
    dev_step,
}: NoteEditorProps) => {
    const [hasChanges, setHasChanges] = useState(false)
    const [lastData, setLastData] = useState<DevStepNote>(note)
    const [showOverlay, setShowOverlay] = useState(false)

    const [noteTest, setNoteText] = useState<string>(note.text)
    const [isDeleted, setIsDeleted] = useState<boolean>(false)
    
    const setComponentStates = (lastData: DevStepNote) => {
        setNoteText(lastData.text)
    }

    const updateBaseLineStep = (baseline: DevStepNote) => {
        let note_edit: DevStepNote = baseline;
        note_edit.text = noteTest;

        return note_edit;
    }

    const _submitStepEdit_2_Db = async (baseline: DevStepNote) => {
        let note_edit: DevStepNote = updateBaseLineStep(baseline)
        console.log("devStepEdit", note_edit)
        setLastData(note_edit)
        await editDBDevStepNote(note_edit.id, note_edit)
        setHasChanges(false)
    }
        

    const submitStepEdit_2_Db = async () => {
        _submitStepEdit_2_Db(lastData)
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

    const butonArea_v2 = <AcceptCancelPrompt
        onAccept={submitStepEdit_2_Db}
        onCancel={revertChanges}/>

    const remove_step_hard = async () => {
        let note_to_remove: DevStepNote = {...lastData}
        note_to_remove.deleted = true;
        await _submitStepEdit_2_Db(note_to_remove)
        setIsDeleted(true)
    }

    const remove_step_soft = () => {
        setShowOverlay(true)
    }

    const remove_overlay =  showOverlay ?
    <DeleteOverlay
        title={`Remove note from (${dev_step.title})`}
        onClose={() => setShowOverlay(false)}
        onDelete={() => remove_step_hard()}/>
    : null

    const more_option: FilmMenuOption[] = [{
        icon: <Icon icon="remove" />,
        text: "remove note",
        action: remove_step_soft
    }]

    const editor = isDeleted ? <div></div>
        :<Card className={classNames(styles.fcolumn, styles.card)} elevation={Elevation.TWO} interactive>
        <TextArea 
            value={noteTest} 
            onChange={(ev) => textAreaEditor(ev, setNoteText, setHasChanges)}
            className={styles.higher}/>
        {remove_overlay}
        <MoreOptionsMenu 
                options={more_option}/>
        {hasChanges ? butonArea_v2 : null}
    </Card>

    return editor;
};

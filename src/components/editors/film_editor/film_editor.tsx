import type React from 'react';
import {
    Elevation,
    H1,
    TextArea,
    Button,
    Card,
    InputGroup,
    Icon,
} from '@blueprintjs/core';
import { DevStepEditor } from '../../editors/dev-step-editor/dev-step-editor';

import classNames from 'classnames';
import styles from './s.module.scss';

import { Film, empty_film } from '../../../logic/data-props'
import { useState, useEffect } from 'react';

import { editDBFilm, getAllDBDevSteps, addDBDevStep } from '../../../logic/db';

import { DevStep, FilmType } from '../../../logic/data-props';
import { inputEditor, textAreaEditor } from '../../../logic/editor-helper';
import { MoreOptionsMenu } from "../../higher-level/others/more-options-menu/more-options-menu";
import { AcceptCancelPrompt } from "../../higher-level/others/accept_cancel_prompt/accept_cancel_prompt";
import { DeleteOverlay } from '../../higher-level/overlays/delete-overlay/delete-overlay';
import { FilmMenuOption } from '../../../logic/my-types';

const logo =
    'https://static.wixstatic.com/shapes/610b66_1b7705fd82034afaafdedcc636d8079f.svg'; // bp-logo.svg (256x298)

interface FilmEditorProps {
    className?: string;
    children?: React.ReactNode;
    film?: Film
    onCancel: () => void;
    createData?: { id: number; createHandle: (film: Film) => void };
}


export const FilmEditor = ({
    className,
    children,
    film,
    onCancel,
    createData,
    
}: FilmEditorProps) => {

    const film_init = film ? film : empty_film;

    const [lastData, setLastData] = useState<Film>(film_init)
    const [filmName, setFilmName] = useState(film_init.name)
    const [filmDesc, setFilmDesc] = useState(film_init.description)

    const [hasChanges, setHasChanges] = useState<boolean>(createData ? true : false)
    const [showOverlay, setShowOverlay] = useState<boolean>(false)

    const setComponentStates = (lastData: Film) => {
        setFilmName(lastData.name)
        setFilmDesc(lastData.description)
    }

    const remove_film_soft = () => {
        setShowOverlay(true)
    }

    const updateBaseLineStep = (baseline: Film) => {
        let film_edit: Film = baseline;
        film_edit.name = filmName
        film_edit.description = filmDesc

        return film_edit;
    }
   
    const _apply_changes = async (film: Film) => {
        setLastData(film)
        await editDBFilm(film.id, film)
    }

    const remove_film_hard = async () => {
        let film_2_remove = {...lastData}
        film_2_remove.deleted = true
        await _apply_changes(film_2_remove)
        onCancel();
    }

    const apply_edits = async () => {
        let film_edit = updateBaseLineStep({...lastData})
        if(createData){
            film_edit.id = createData.id;
            await createData.createHandle(film_edit);
            onCancel();
        } 
        else{
            await _apply_changes(film_edit)
            setHasChanges(false)
        }
    }

    const revert_edits = () => {
        if(createData){
            onCancel();
        }
        else {
            setComponentStates(lastData);
            setHasChanges(false);
        }
    }

    const commit_prompt = hasChanges ? 
        <AcceptCancelPrompt
            onAccept={apply_edits}
            onCancel={revert_edits}/>
        : null
    
    const remove_overlay =  !createData && showOverlay?
        <DeleteOverlay
            title={`Remove film ${filmName}`}
            onClose={() => setShowOverlay(false)}
            onDelete={remove_film_hard}/>
        : null

        
    const more_option: FilmMenuOption[] = [{
        icon: <Icon icon="remove" />,
        text: "remove film",
        action: remove_film_soft
    }]
            
    const menu = !createData ? 
        <MoreOptionsMenu 
            options={more_option}/>
        : null

    return (
        <Card
            className={classNames(styles.card, styles.wrapper, className)}
            elevation={Elevation.FOUR}>
            
            <H1>Film Editor</H1>

            <img className={styles.logo} src={logo} alt="" />

            <InputGroup value={filmName} 
                onChange={(ev) => inputEditor(ev, setFilmName, setHasChanges)}
                placeholder="Film Name" fill round />

            <TextArea className={styles.higher}
                value={filmDesc} 
                onChange={(ev) => textAreaEditor(ev, setFilmDesc, setHasChanges)}/>

            {menu}{commit_prompt}{remove_overlay}

        </Card>
    );
};

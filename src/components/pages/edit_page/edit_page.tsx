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

import { Film } from '../../../logic/data-props'
import { FilmMenuOption } from '../../../logic/my-types'
import { useState, useEffect } from 'react';

import { editDBFilm, getAllDBDevSteps, addDBDevStep } from '../../../logic/db';

import { DevStep } from '../../../logic/data-props';
import { inputEditor, textAreaEditor } from '../../../logic/editor-helper';
import { MoreOptionsMenu } from "../../higher-level/others/more-options-menu/more-options-menu";
import { AcceptCancelPrompt } from "../../higher-level/others/accept_cancel_prompt/accept_cancel_prompt";
import { DeleteOverlay } from '../../higher-level/overlays/delete-overlay/delete-overlay';

const logo =
    'https://static.wixstatic.com/shapes/610b66_1b7705fd82034afaafdedcc636d8079f.svg'; // bp-logo.svg (256x298)

interface EditPageProps {
    className?: string;
    children?: React.ReactNode;
    film: Film
    onCancel?: () => void;
}

interface _DevStep {
    devStep: DevStep;
    exists: boolean;
}

export const EditPage = ({
    className,
    children,
    film,
    onCancel
}: EditPageProps) => {
    const submitCaption = "Accept"
    const formTitle = "Edit";

    const [showOverlay, setShowOverlay] = useState<boolean>(false)

    const [totalDevSteps, setTotalDevSteps] = useState<number>(0)
    const [createdDevSteps, setCreatedDevSteps] = useState<number>(0)

    const [hasChanges, setHasChanges] = useState<boolean>(false)
    const [filmName, setFilmName] = useState(film.name)
    const [filmDesc, setFilmDesc] = useState(film.description)

    const [lastData, setLastData] = useState<Film>(film)
    const [devSteps, setDevSteps] = useState<_DevStep[]>([])

    const setComponentStates = (lastData: Film) => {
        setFilmName(lastData.name)
        setFilmDesc(lastData.description)
    }

    useEffect(() => {
        const fetchData = async () => {
            let allSteps = await getAllDBDevSteps();
            let filteredSteps = allSteps.filter((step) => step.filmId === film.id);
            filteredSteps = filteredSteps.filter((step) => step.deleted == false)

            const thisFilmSteps = filteredSteps.map((step) => ({
                devStep: step,
                exists: true,
            }));

            setTotalDevSteps(allSteps.length);
            setDevSteps(thisFilmSteps);
        };

        fetchData();
    }, []);


    
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
        let film_2_remove = film
        film_2_remove.deleted = true
        await _apply_changes(film_2_remove)
        if (onCancel) onCancel();
    }

    const apply_edits = async () => {
        let film_edit = updateBaseLineStep({...lastData})
        await _apply_changes(film_edit)
        setHasChanges(false)
    }

    const revert_edits = () => {
        setComponentStates(lastData)
        setHasChanges(false)
    }

    const commit_prompt = hasChanges ? 
        <AcceptCancelPrompt
            onAccept={apply_edits}
            onCancel={revert_edits}/>
        : null


    const newStep = () => {
        const new_DevStep: _DevStep = {
            devStep: {
                id: totalDevSteps + createdDevSteps + 1,
                title: "Empty development title",
                content: "Empty informations about development step",
                filmId: film.id,
                timer: true,
                timerLength_s: 10,
                temp: 21,
                deleted: false,
            },
            exists: false,
        }

        return new_DevStep;
    }
    
    const addStep = async () => {
        const new_DevStep = newStep();
        await addDBDevStep(new_DevStep.devStep);
        setDevSteps((prevDevSteps) => [...prevDevSteps, new_DevStep]);
        setCreatedDevSteps(createdDevSteps + 1);
    }

    const remove_overlay =  showOverlay ?
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

    const steps_tab =<Card className={classNames(styles.card, styles.wrapper, className)}>
        {devSteps.map((step) => (
            <DevStepEditor key={step.devStep.id} devStep={step.devStep}/>
        ))}
        <Button
            icon="add"
            type="button"
            text="Add step"
            intent="primary"
            onClick={addStep}/>
    </Card>

    return (
        <div className={styles.columns}>
            {remove_overlay}
            <Card
                className={classNames(styles.card, styles.wrapper, className)}
                elevation={Elevation.FOUR}>
                
                <Button
                    text="Films"
                    type="button"
                    intent="primary"
                    icon="arrow-left"
                    onClick={onCancel}/>

                <H1>Edit</H1>
                <img className={styles.logo} src={logo} alt="" />
                <InputGroup value={filmName} 
                    onChange={(ev) => inputEditor(ev, setFilmName, setHasChanges)}
                    placeholder="Film Name" fill round />
                <TextArea className={styles.higher}
                    value={filmDesc} 
                    onChange={(ev) => textAreaEditor(ev, setFilmDesc, setHasChanges)}/>
                <MoreOptionsMenu 
                    options={more_option}/>        
                {commit_prompt}
            </Card>
            {steps_tab}
        </div>
    );
};

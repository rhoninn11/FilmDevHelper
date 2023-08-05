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
import { TooltipedButton } from '../tooltiped-button/tooltiped-button';
import { DevStepEditor } from '../dev-step-editor/dev-step-editor';

import classNames from 'classnames';
import styles from './edit-card.module.scss';

import { Film } from '../../logic/data-props'
import { FilmMenuOption } from '@/logic/my-types'
import { useState, useEffect } from 'react';

import { editDBFilm, getAllDBDevSteps, addDBDevStep } from '../../logic/db';

import { DevStep } from '../../logic/data-props';
import { inputEditor, textAreaEditor } from '../../logic/editor-helper';
import { MoreOptionsMenu } from "../higher-level/menus/more-options-menu/more-options-menu";
import { DeleteOverlay } from "@/components/higher-level/overlays/delete-overlay/delete-overlay";

const logo =
    'https://static.wixstatic.com/shapes/610b66_1b7705fd82034afaafdedcc636d8079f.svg'; // bp-logo.svg (256x298)

export interface EditCardProps {
    className?: string;
    children?: React.ReactNode;
    film: Film
    onCancel?: () => void;
}

interface _DevStep {
    devStep: DevStep;
    exists: boolean;
}

export const EditCard = ({
    className,
    children,
    film,
    onCancel
}: EditCardProps) => {
    const submitCaption = "Accept"
    const formTitle = "Edit";

    const [showOverlay, setShowOverlay] = useState<boolean>(false)

    const [filmName, setFilmName] = useState(film.name)
    const [filmDesc, setFilmDesc] = useState(film.description)
    const [devSteps, setDevSteps] = useState<_DevStep[]>([])
    const [totalDevSteps, setTotalDevSteps] = useState<number>(0)
    const [createdDevSteps, setCreatedDevSteps] = useState<number>(0)

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


    const _apply_changes = async (film: Film) => {
        await editDBFilm(film.id, film)
        if (onCancel) onCancel()
    }

    const remove_film_soft = () => {
        setShowOverlay(true)
    }

    const remove_film_hard = async () => {
        let film_2_remove = film
        film_2_remove.deleted = true
        await _apply_changes(film_2_remove)
    }

    const apply_edits = async () => {
        let film_edit = film
        film_edit.name = filmName
        film_edit.description = filmDesc
        await _apply_changes(film_edit)
    }

    

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
        icon: <Icon icon="add" />,
        text: "add next step",
        action: addStep
    },{
        icon: <Icon icon="remove" />,
        text: "remove film",
        action: remove_film_soft
    }]



    return (
        <div className={styles.columns}>
            <Card
                className={classNames(styles.card, styles.wrapper, className)}
                elevation={Elevation.FOUR}
            >
                <H1>Edit</H1>
                <p>{film.deleted ? "deleted" : "alive"}</p>
                <img className={styles.logo} src={logo} alt="" />
                <InputGroup value={filmName} 
                    onChange={(ev) => inputEditor(ev, setFilmName)}
                    placeholder="Film Name" fill round />
                <TextArea value={filmDesc} 
                    onChange={(ev) => textAreaEditor(ev, setFilmDesc)}/>
                <MoreOptionsMenu 
                    options={more_option}/>
                {remove_overlay}
                <div className={styles.columns}>
                    <Button
                        text="Accept"
                        className={styles.btn}
                        intent="primary"
                        onClick={apply_edits}
                    />
                    <Button
                        text="Cancel"
                        className={styles.btn}
                        onClick={onCancel}
                    />
                </div>
            </Card>
            <Card className={classNames(styles.card, styles.wrapper, className)}>
                {devSteps.map((step) => (
                    <DevStepEditor key={step.devStep.id} devStep={step.devStep}/>
                ))}
            </Card>
        </div>
    );
};

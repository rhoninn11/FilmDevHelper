import type React from 'react';
import {
    Elevation,
    H1,
    TextArea,
    Button,
    Card,
    InputGroup,
} from '@blueprintjs/core';
import { TooltipedButton } from '../tooltiped-button/tooltiped-button';
import { DevStepEditor } from '../dev-step-editor/dev-step-editor';

import classNames from 'classnames';
import styles from './edit-card.module.scss';

import { Film } from '../../logic/data-props'
import { useState, useEffect } from 'react';

import { editDBFilm, getAllDBDevSteps, addDBDevStep } from '../../logic/db';

import { DevStep } from '../../logic/data-props';
import { inputEditor, textAreaEditor } from '../../logic/editor-helper';
import { FilmMoreOptionsMenu } from "../higher-level/menus/film-more-options-menu/film-more-options-menu";
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
            const allSteps = await getAllDBDevSteps();
            const filteredSteps = allSteps.filter((step) => step.filmId === film.id);
            const thisFilmSteps = filteredSteps.map((step) => ({
                devStep: step,
                exists: true,
            }));

            setTotalDevSteps(allSteps.length);
            setDevSteps(thisFilmSteps);
        };

        fetchData();
    }, []);

    const acceptChanges = async () => {
        const filmAfterEdit = film
        filmAfterEdit.name = filmName
        filmAfterEdit.description = filmDesc

        await editDBFilm(filmAfterEdit.id, filmAfterEdit)
        if (onCancel) onCancel()
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

    const _remove_film_soft = () => {
        setShowOverlay(true)
    }

    const _remove_film_hard = () => {
        console.log("some real delete actions")
        setShowOverlay(false)
    }

    const remove_overlay =  showOverlay ?
        <DeleteOverlay
            onClose={() => setShowOverlay(false)}
            onDelete={_remove_film_hard}/>
        : null

    return (
        <div className={styles.columns}>
            <Card
                className={classNames(styles.card, styles.wrapper, className)}
                elevation={Elevation.FOUR}
            >
                <H1>Edit</H1>
                <img className={styles.logo} src={logo} alt="" />
                <InputGroup value={filmName} 
                    onChange={(ev) => inputEditor(ev, setFilmName)}
                    placeholder="Film Name" fill round />
                <TextArea value={filmDesc} 
                    onChange={(ev) => textAreaEditor(ev, setFilmDesc)}/>
                <FilmMoreOptionsMenu onAddNextStep={addStep} onRemoveFilm={_remove_film_soft}/>
                {remove_overlay}
                <div className={styles.columns}>
                    <Button
                        text="Accept"
                        className={styles.btn}
                        intent="primary"
                        onClick={acceptChanges}
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

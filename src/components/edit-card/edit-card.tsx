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

import classNames from 'classnames';
import styles from './edit-card.module.scss';

import { Film } from '../../logic/data-props'
import { useState, useEffect } from 'react';

import { editDBFilm, getAllDBDevSteps, addDBDevStep } from '../../logic/db';

import { DevStep } from '../../logic/data-props';

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

    const [filmName, setFilmName] = useState(film.name)
    const [filmDesc, setFilmDesc] = useState(film.description)
    const [devSteps, setDevSteps] = useState<_DevStep[]>([])
    const [totalDevSteps, setTotalDevSteps] = useState<number>(0)

    useEffect(() => {
        const fetchData = async () => {
            const allSteps = await getAllDBDevSteps();
            const filteredSteps = allSteps.filter((step) => step.filmId === film.id);
            const devSteps = filteredSteps.map((step) => ({
                devStep: step,
                exists: true,
            }));

            setTotalDevSteps(allSteps.length);
            setDevSteps(devSteps);
        };

        fetchData();
    }, []);

    const nameInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredName = event.target.value;
        setFilmName(enteredName)
    };

    const descInputHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(event.target.value)
        const enteredDesc = event.target.value;
        setFilmDesc(enteredDesc);
    };

    const devStepsDBSync = async () => {
        const newSteps = devSteps.filter((step) => !step.exists);
        const existingSteps = devSteps.filter((step) => step.exists);

        for (const step of newSteps) {
            await addDBDevStep(step.devStep);
        }
    }

    const acceptChanges = async () => {
        const filmAfterEdit = film
        filmAfterEdit.name = filmName
        filmAfterEdit.description = filmDesc

        await editDBFilm(filmAfterEdit.id, filmAfterEdit)
        await devStepsDBSync();
        if (onCancel) onCancel()
    }

    const newStep = () => {
        const newDevStep: _DevStep = {
            devStep: {
                id: totalDevSteps + devSteps.length + 1,
                title: "new step",
                content: "new step description",
                filmId: film.id,
                timer: false,
                timerLength_s: 0,
            },
            exists: false,
        }

        return newDevStep;
    }
    
    const addStep = () => {
        const newDevStep = newStep();
        setDevSteps((prevDevSteps) => [...prevDevSteps, newDevStep]);
    }

    return (
        <Card
            className={classNames(styles.card, styles.wrapper, className)}
            elevation={Elevation.FOUR}
        >
            <div className={classNames(styles.card, styles.header)}>
                <H1>{formTitle}</H1>
            </div>
            <img className={styles.logo} src={logo} alt="" />
            <InputGroup fill round placeholder="Film Name" value={filmName} onChange={nameInputHandler}/>
            <TextArea value={filmDesc} onChange={descInputHandler}/>
            {devSteps.map((step) => (
                <span key={step.devStep.id}>{step.devStep.title}</span>
            ))}
            <TooltipedButton icon="add" tipText='Add next step' onClick={addStep}/>
                <Button
                    text={submitCaption}
                    className={styles.btn}
                    intent="primary"
                    onClick={acceptChanges}
                />
                <Button
                    text="Cancel"
                    className={styles.btn}
                    onClick={onCancel}
                />
        </Card>
    );
};

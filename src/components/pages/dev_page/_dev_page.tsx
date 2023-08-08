import { Card, Button, H2, Elevation, Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import styles from './s.module.scss';


import { DevRecipe, DevStep, DevStepNote, Film } from '../../../logic/data-props';
import { useEffect, useState } from 'react';
import { addDBDevStepNote, getAllDBDevStepNote, getAllDBDevSteps } from '../../../logic/db';
import { StepCard } from '../../step-card/step-card';
import { TooltipedButton } from '../../tooltiped-button/tooltiped-button';
import { NoteEditor } from '../../editors/note-editor/note_editor';

interface DevPageProps {
    className?: string;
    film: Film
    onCancel?: () => void;
    onDevelop?: (devRecipe: DevRecipe)  => void
}

/**
 * This component was generated using Codux's built-in Card new component template.
 * For details on on how to create custom new component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const DevPage = ({
    className,
    film,
    onCancel,
    onDevelop,
}: DevPageProps) => {
    const [devSteps, setDevSteps] = useState<DevStep[]>([])
    const [devStepNotes, setDevStepNotes] = useState<DevStepNote[]>([])
    const [currentStep, setCurrentStep] = useState<DevStep | null>(null)
    const [currentStepNotes, setCurrentStepNotes] = useState<DevStepNote[]>([])

    const [totalNotes, setTotalNotes] = useState<number>(0)
    const [createdNotes, setCreatedNotes] = useState<number>(0)
    
    
    const fetchDevStepData = async () => {
        const all_steps = await getAllDBDevSteps();
        const film_steps = all_steps
            .filter((step) => step.filmId === film.id)
            .filter((step) => step.deleted == false);

        setDevSteps(film_steps);
    };

    const fetchDevStepNoteData = async () => {
        const all_notes = await getAllDBDevStepNote();
        const film_notes = all_notes
            .filter((note) => note.filmId === film.id)
            .filter((note) => note.deleted == false);
        setTotalNotes(film_notes.length)
        setDevStepNotes(film_notes);
    };
    
    useEffect(() => {
        fetchDevStepData();
        fetchDevStepNoteData();
    }, []);

    const set_current_step = (step: DevStep) => {
        console.log(`step is ${currentStep}`);
        if (currentStep && currentStep.id == step.id){

            setCurrentStep(null);
            setCurrentStepNotes([]);
        } else {
            setCurrentStep(step);
            setCurrentStepNotes(devStepNotes.filter((note) => note.devStepId == step.id));
        }
    }

    const mOnDevelopHandler = (firstStep: DevStep) => {
        const recipe: DevRecipe = {
            filmToDevelop: film,
            allSteps: devSteps,
            firstStep: firstStep
        }
        if (onDevelop) onDevelop(recipe);
        if (onCancel) onCancel();
    }

    const add_note = (note: DevStepNote) => {
        setCreatedNotes(createdNotes + 1);
        setDevStepNotes((prevNotes) => [...prevNotes, note]);
        setCurrentStepNotes((prevNotes) => [...prevNotes, note]);
        addDBDevStepNote(note);
    }

    const new_note = () => {
        return ({
            id: totalNotes + createdNotes + 1,
            filmId: film.id,
            devStepId: currentStep ? currentStep.id : -1,
            text: "New note",
            deleted: false
        })
    }

    const notes_tab = currentStep ? <Card
        className={classNames(styles.card, styles.wrapper, className)}
        elevation={Elevation.TWO}>
            {currentStepNotes
                .filter((note) => note.deleted == false)
                .map((note) => 
                    <NoteEditor dev_step={currentStep} note={note} key={note.id}/>
            )}
            <Button
                className={Classes.ROUND}
                icon="add"
                type="button"
                text="Add note"
                intent="primary"
                onClick={() => add_note(new_note())}
            />
        </Card>
        : null;
    

    return (
        <div className={styles.columns}>
            <Card
                className={classNames(styles.card, styles.wrapper, className)}
                elevation={Elevation.TWO}>
                <Button
                    text="Films"
                    type="button"
                    intent="primary"
                    icon="arrow-left"
                    onClick={onCancel}
                />
                <H2>{film.name}</H2>
                {devSteps.map((step) => (
                    <StepCard 
                        step={step}
                        onDevelop={mOnDevelopHandler}
                        onShowNotes={set_current_step}
                        selected={currentStep!= null && currentStep.id == step.id}
                        />
                ))}
            </Card>
           {notes_tab}
        </div>
    );
};

// "dev-it" - aplikacja do wywoływania 
// Krzyż andrzeja - metoda
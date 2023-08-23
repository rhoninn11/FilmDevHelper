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
import { FilmEditor } from '../../editors/film_editor/film_editor';

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

    const [totalDevSteps, setTotalDevSteps] = useState<number>(0)
    const [createdDevSteps, setCreatedDevSteps] = useState<number>(0)

    const [lastData, setLastData] = useState<Film>(film)
    const [devSteps, setDevSteps] = useState<_DevStep[]>([])



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
        setLastData(film)
        await editDBFilm(film.id, film)
    }

    const newStep = () => {
        let next_id = totalDevSteps + createdDevSteps + 1;
        const new_DevStep: _DevStep = {
            devStep: new DevStep(next_id, film.id),
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


    const steps_tab = <Card className={classNames(styles.card, styles.wrapper, className)}>
        {devSteps.map((step) => (
            <DevStepEditor key={step.devStep.id} devStep={step.devStep} />
        ))}
        <Button
            icon="add"
            type="button"
            text="Add step"
            intent="primary"
            onClick={addStep} />
    </Card>

    return (
        <div className={styles.columns}>
            <div>
                <Card
                    className={classNames(styles.card, styles.wrapper, className)}
                    elevation={Elevation.FOUR}>

                    <Button
                        text="Films"
                        type="button"
                        intent="primary"
                        icon="arrow-left"
                        onClick={onCancel} />
                </Card>
                <FilmEditor
                    film={film}
                    onCancel={onCancel} />
            </div>

            {steps_tab}
        </div>
    );
};

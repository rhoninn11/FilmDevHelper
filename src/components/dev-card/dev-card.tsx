import { Card, Button, H2, Elevation } from '@blueprintjs/core';
import classNames from 'classnames';
import styles from './dev-card.module.scss';

import { DevRecipe, DevStep, Film } from '../../logic/data-props';
import { useEffect, useState } from 'react';
import { getAllDBDevSteps } from '../../logic/db';
import { StepCard } from '../step-card/step-card';

export interface EditCardProps {
    className?: string;
    film: Film
    onCancel?: () => void;
    onDevelop?: (devRecipe: DevRecipe)  => void
}

/**
 * This component was generated using Codux's built-in Card new component template.
 * For details on on how to create custom new component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const DevCard = ({
    className,
    film,
    onCancel,
    onDevelop,
}: EditCardProps) => {
    const [devSteps, setDevSteps] = useState<DevStep[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const allSteps = await getAllDBDevSteps();
            const filteredSteps = allSteps.filter((step) => step.filmId === film.id);
            const thisFilmSteps = filteredSteps

            setDevSteps(thisFilmSteps);
        };

        fetchData();
    }, []);

    const mOnDevelopHandler = (firstStep: DevStep) => {
        const recipe: DevRecipe = {
            filmToDevelop: film,
            allSteps: devSteps,
            firstStep: firstStep
        }
        console.log(`dev card`);
        if (onDevelop) onDevelop(recipe);
        if (onCancel) onCancel();
    }

    return (
        <Card
            className={classNames(styles.card, styles.wrapper, className)}
            elevation={Elevation.TWO}
            interactive >
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
                     />
            ))}
        </Card>
    );
};

// "dev-it" - aplikacja do wywoływania 
// Krzyż andrzeja - metoda
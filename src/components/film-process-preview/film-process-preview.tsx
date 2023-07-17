import classNames from 'classnames';
import styles from './film-process-preview.module.scss';
import FilmCard_module from '../film-card/film-card.module.scss';

import { useState } from 'react';

import { Card, Elevation, ProgressBar } from '@blueprintjs/core';
export interface FilmProcessPreviewProps {
    className?: string;
    title?: string;
    description?: string;
    children?: React.ReactNode;
}

/**
 * This component was generated using Codux's built-in Card new component template.
 * For details on on how to create custom new component templates, see https://help.codux.com/kb/en/article/kb16522
 */

export const FilmProcessPreview = ({
    className,
    title = 'Card Title',
    description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    children,
}: FilmProcessPreviewProps) => {
    const [progress, setProgress] = useState(0.0);

    const updateProgress = () => {
        let newProgress = progress + 0.1;
        if (newProgress >= 1) newProgress -= 1;

        setProgress(newProgress);
    };

    return (
        <Card
            className={classNames(
                className,
                FilmCard_module.card,
                FilmCard_module.in_progress
            )}
            elevation={Elevation.TWO}
            interactive
            onClick={updateProgress}
        >
            <ProgressBar intent="primary" value={progress} />
            <div>{children}</div>
        </Card>
    );
};

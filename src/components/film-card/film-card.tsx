import { Card, Button, H3 } from '@blueprintjs/core';
import { Classes } from '@blueprintjs/core';
import { TooltipedButton } from '../tooltiped-button/tooltiped-button';

import { Film } from '../../logic/data-props';

import classNames from 'classnames';
import styles from './film-card.module.scss';
import { estimate_logo } from '../../globals/variable_logo';

export interface FilmCardProps {
    className?: string;
    film: Film;
    filmEditHandler: (film: Film) => void;
    filmDevelopHandle: (film: Film) => void;
}

const logo =
    'https://static.wixstatic.com/shapes/610b66_1b7705fd82034afaafdedcc636d8079f.svg'; // bp-logo.svg (256x298)

export const FilmCard = ({
    className,
    film,
    filmEditHandler,
    filmDevelopHandle,
}: FilmCardProps) => {
    return (
        <Card className={classNames(className, styles.wrapper)}>
            <Card elevation={3} className={styles.card}>
                <img className={styles.logo} src={estimate_logo(film.type)} alt="" />
                <div>
                    <H3 className={styles.title}>{film.name}</H3>
                    <p>{film.description}</p>
                </div>
                <div
                    className={classNames(styles.btn_wrapper, styles.last_item)}
                >
                    <TooltipedButton 
                        tipText='Show development process'
                        icon='build'
                        onClick={() => filmDevelopHandle(film)}
                    />
                    <TooltipedButton 
                        tipText='Edit film'
                        icon='edit'
                        onClick={() => filmEditHandler(film)}
                    />
                </div>
                <div></div>
            </Card>
        </Card>
    );
};

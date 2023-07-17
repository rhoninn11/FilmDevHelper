import { Card, Button } from '@blueprintjs/core';

import { Film } from '../../logic/data-props';

import classNames from 'classnames';
import styles from './film-card.module.scss';

export interface FilmCardProps {
    className?: string;
    film: Film;
    filmEditHandler: (film: Film) => void;
}

const logo =
    'https://static.wixstatic.com/shapes/610b66_1b7705fd82034afaafdedcc636d8079f.svg'; // bp-logo.svg (256x298)

export const FilmCard = ({
    className,
    film,
    filmEditHandler,
}: FilmCardProps) => {
    return (
        <Card className={classNames(className, styles.wrapper)}>
            <Card elevation={3} className={styles.card}>
                <img className={styles.logo} src={logo} alt="" />
                <div>
                    <h3 className={styles.title}>{film.name}</h3>
                    <p className={classNames(styles.title, styles.sub)}>
                        {film.description}
                    </p>
                </div>
                <div
                    className={classNames(styles.btn_wrapper, styles.last_item)}
                >
                    <Button
                        className={styles.btn}
                        intent={'primary'}
                        icon="build"
                    />
                    <Button
                        className={styles.btn}
                        intent={'primary'}
                        icon="edit"
                        onClick={() => filmEditHandler(film)}
                    />
                </div>
                <div></div>
            </Card>
        </Card>
    );
};

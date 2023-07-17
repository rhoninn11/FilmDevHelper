import FilmCard_module from '../film-card/film-card.module.scss';
import classNames from 'classnames';
import {
    Tooltip,
    Classes,
    Button,
    IconName,
    MaybeElement,
} from '@blueprintjs/core';

export interface TooltipedButtonProps {
    className?: string;
    onClick?: () => void;
    icon: IconName | MaybeElement;
    tipText: string;
}

/**
 * This component was generated using Codux's built-in Default new component template.
 * For details on on how to create custom new component templates, see https://help.codux.com/kb/en/article/kb16522
 */

export const TooltipedButton = ({
    className,
    onClick = () => {},
    icon = 'add',
    tipText = 'none',
}: TooltipedButtonProps) => {
    return (
        <div>
            <Tooltip
                className={Classes.TOOLTIP_INDICATOR}
                content={tipText}
                intent="success"
                position="right"
            >
                <Button
                    className={classNames(className, FilmCard_module.btn)}
                    large={true}
                    intent="primary"
                    icon={icon}
                    onClick={onClick}
                />
            </Tooltip>
        </div>
    );
};

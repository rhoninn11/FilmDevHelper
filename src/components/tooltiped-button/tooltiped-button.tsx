import FilmCard_module from '../film-card/film-card.module.scss';
import classNames from 'classnames';
import {
    Tooltip,
    Classes,
    Button,
    IconName,
    MaybeElement,
} from '@blueprintjs/core';
import { useState } from 'react';

export interface TooltipedButtonProps {
    className?: string;
    onClick?: () => void;
    icon: IconName | MaybeElement;
    tipText: string;
    active?: boolean;
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
    active = false,
}: TooltipedButtonProps) => {
    const [isActive, setIsActive] = useState(false);
    const intend = active && isActive ? "success" : "primary";
    const handleClick = () => {
        setIsActive(!isActive);
        if (onClick) onClick();
    };

    return (
        <div>
            <Tooltip
                className={Classes.TOOLTIP_INDICATOR}
                content={tipText}
                intent={intend}
                position="right"
            >
                <Button
                    className={classNames(className, FilmCard_module.btn)}
                    large={true}
                    intent={intend}
                    icon={icon}
                    onClick={handleClick}
                />
            </Tooltip>
        </div>
    );
};

import MiniCardCustom_module from '../mini-card-custom/mini-card-custom.module.scss';
import styles from './top-view.module.scss';
import classNames from 'classnames';

import React, { useState, useEffect } from 'react';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

import { Button, Tooltip } from '@blueprintjs/core';


export interface ButtonTooltip {
    className?: string;
    onClick?: () => void;
    icon?: string;
    tipText?: string;
}



export const ButtonTooltip = ({
    className,
    onClick,
    icon,
    tipText
}: ButtonTooltip) => {


    return (
        <div className={`${className}`}>
            
            <Tooltip
                content="Success"
                intent="success"
                position="right"
            >
                <Button
                    className={MiniCardCustom_module.btn}
                    large={true}
                    intent="primary"
                    icon="add"
                    onClick={onClick}
                />
            </Tooltip>
</div>
    );
};

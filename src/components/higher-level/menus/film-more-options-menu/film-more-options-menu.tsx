
import React, { useState } from "react";
import { Menu, MenuItem, Classes, Intent, MenuItemProps, Popover, Button, PortalProvider } from "@blueprintjs/core";
import classNames from "classnames";


interface FilmMoreOptionsMenuProps {
    onAddNextStep?: () => void;
    onRemoveFilm?: () => void;
}

export const FilmMoreOptionsMenu = ({
    onAddNextStep,
    onRemoveFilm
}: FilmMoreOptionsMenuProps) => {
    const [active, setActive] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [selected, setSelected] = useState<boolean | undefined>(undefined);
    const [intent, setIntent] = useState<Intent>("none");
    const [submenuEnabled, setSubmenuEnabled] = useState(true);
    const [roleStructure, setRoleStructure] = useState<MenuItemProps["roleStructure"]>("menuitem");

    let _onAddNextStep = () => {
        if (onAddNextStep)
            onAddNextStep()
    }

    let _onRemoveFilm = () => {
        if (onRemoveFilm)
            onRemoveFilm()
    }

    const exampleMenu = (
        <Menu className={Classes.DARK}>
            <MenuItem icon="add" text="add next step" onClick={_onAddNextStep}/>
            <MenuItem icon="remove" text="remove film" intent="danger" onClick={_onRemoveFilm} />
        </Menu>
    );

    const popoverMenu = (
        <PortalProvider portalClassName={Classes.DARK}>
            <Popover content={exampleMenu} fill={true} placement="bottom" className={Classes.DARK}>
                <Button
                    alignText="left"
                    fill={true}
                    icon="more"
                    rightIcon="caret-down"
                    text="options..."
                    />
            </Popover>
        </PortalProvider>
    )

    const basicMenu = (
        <Menu className={Classes.ELEVATION_1}>
            <MenuItem
                icon="more"
                intent={intent}
                labelElement={submenuEnabled ? undefined : "⌘,"}
                roleStructure={roleStructure}
                selected={selected}
                text="options">
                    <MenuItem icon="add" text="add next step" onClick={_onAddNextStep}/>
                    <MenuItem icon="remove" text="remove film" intent="danger" onClick={_onRemoveFilm} />
                </MenuItem>
        </Menu>
    )


    return popoverMenu
};

import React, { useState } from "react";
import { Menu, MenuItem, Classes, Intent, MenuItemProps, Popover, Button, PortalProvider, Icon } from "@blueprintjs/core";
import classNames from "classnames";

import { FilmMenuOption } from "@/logic/my-types";

interface MoreOptionsMenuProps {
    options: FilmMenuOption[];
}

export const MoreOptionsMenu = ({
    options
}: MoreOptionsMenuProps) => {
    const exampleMenu = (
        <Menu className={Classes.DARK}>
            {options.map((opt) => 
                <MenuItem 
                    icon={opt.icon}
                    text={opt.text}
                    onClick={opt.action}/>
            )}
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


    return popoverMenu
};
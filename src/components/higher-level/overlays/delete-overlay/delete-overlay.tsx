import { Overlay, Classes, H3, Button, Intent, Card, PortalProvider } from "@blueprintjs/core";
import { Code } from "@blueprintjs/icons";
import classNames from "classnames";
import { useState } from "react";

import styles from "./delete-overlay.module.scss"
import { DevRecipe, DevStep } from "../../../../logic/data-props";
import { TimeDisplay } from "../../../time-display/time-display";

interface RecipeOverlayProps {
    className?: string;
    children?: React.ReactNode;
    onClose?: () => void;
    onDelete?: () => void;
}

export const DeleteOverlay = ({
    className,
    children,
    onClose,
    onDelete,
}: RecipeOverlayProps ) => {

    const [visible, setVisible] = useState(true);

    const classes = classNames(
        Classes.CARD,
        Classes.ELEVATION_4,
        Classes.DARK,
        styles.elo
    );

    const _on_close = () => {
        setVisible(false);
        if (onClose)
            onClose();
    }

    const _on_delete = () => {
        setVisible(false);
        if (onDelete)
            onDelete();
    }

    const sampleDialog = (
        <PortalProvider portalClassName={Classes.DARK}>
            <Overlay onClose={_on_close} className={Classes.OVERLAY_SCROLL_CONTAINER} isOpen={visible}>
                <div className={classes}>
                    <H3>Delete</H3>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button intent={Intent.DANGER} onClick={_on_delete} style={{ margin: "" }}>
                            Confirm
                        </Button>
                        <Button intent={Intent.DANGER} onClick={_on_close} style={{ margin: "" }}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Overlay>
        </PortalProvider>
    )

    return (
        <div>
            {sampleDialog}
        </div>
        );
};

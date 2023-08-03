import { Overlay, Classes, H3, Button, Intent, Card, PortalProvider } from "@blueprintjs/core";
import { Code } from "@blueprintjs/icons";
import classNames from "classnames";
import { useState } from "react";

import styles from "./recipe-overlay.module.scss"
import { DevRecipe, DevStep } from "../../../../logic/data-props";
import { TimeDisplay } from "../../../time-display/time-display";

interface RecipeOverlayProps {
    className?: string;
    children?: React.ReactNode;
    recipe: DevRecipe;
    onClose?: () => void;
    onStart?: () => void;
}

export const RecipeOverlay = ({
    className,
    children,
    recipe,
    onClose,
    onStart,
}: RecipeOverlayProps ) => {

    const [visible, setVisible] = useState(true);
    const [myRecipe, setMyRecipe] = useState<DevRecipe>(recipe);

    const classes = classNames(
        Classes.CARD,
        Classes.ELEVATION_4,
        styles.elo
    );

    let film = myRecipe.filmToDevelop;
    let stepList = myRecipe.allSteps;
    let firstStep = myRecipe.firstStep;

    // get index of from stepList of firstStep
    let firstStepIndex = stepList.findIndex((step) => step.id === firstStep.id);
    
    const step_display = (step: DevStep, index: number, array: DevStep[]) => {

        let active_marker = index >= firstStepIndex ? "* " : null;
        let active_class = index >= firstStepIndex ? "" : styles.deactivated;
        return (
            <Card key={index} className={active_class}> 
                {active_marker}
                {step.title}
                <TimeDisplay time_s={step.timerLength_s}/>
            </Card>)
    }

    const closeOverlay = () => {
        setVisible(false);

        if (onClose)
            onClose();
    }

    const startDevelopment = () => {
        setVisible(false);

        console.log("development just started");
        if (onStart)
            onStart();
    }
    // include only these including first step
    let active_steps = stepList.slice(firstStepIndex);
    let totalTime_s = active_steps.reduce((sum, step) => sum + step.timerLength_s, 0);

    const sampleDialog = (
        <PortalProvider portalClassName={Classes.DARK}>
            <Overlay onClose={() => setVisible(false)} className={Classes.OVERLAY_SCROLL_CONTAINER} isOpen={visible}>
                <div className={classes}>
                    <H3>{film.name} - development</H3>
                    {stepList.map(step_display)}
                    Total: <TimeDisplay time_s={totalTime_s}/>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button intent={Intent.DANGER} onClick={startDevelopment} style={{ margin: "" }}>
                            Start
                        </Button>
                        <Button intent={Intent.DANGER} onClick={closeOverlay} style={{ margin: "" }}>
                            Close
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

import { Overlay, Classes, H3, Button, Intent, Card } from "@blueprintjs/core";
import { Code } from "@blueprintjs/icons";
import classNames from "classnames";
import { useState } from "react";

import styles from "./recipe-overlay.module.scss"
import { DevRecipe, DevStep } from "../../logic/data-props";
import { TimeDisplay } from "../time-display/time-display";
import { StepProcessPreview } from "../step-process-preview/step-process-preview";

interface ProcessCardProps {
    className?: string;
    children?: React.ReactNode;
    recipe: DevRecipe;
    onClose?: () => void;   
}

interface DevStepOps {
    step: DevStep;
    finished: boolean;
}

export const ProcessCard = ({
    className,
    children,
    recipe,
    onClose
}: ProcessCardProps ) => {

    const [myRecipe, setMyRecipe] = useState<DevRecipe>(recipe);
    const [timeLeft, setTimeLeft] = useState<number>(0);

    let stepList = myRecipe.allSteps;
    let firstStep = myRecipe.firstStep;

    let firstStepIndex = stepList.findIndex((step) => step.id === firstStep.id);
    stepList = stepList.slice(firstStepIndex, stepList.length);
    // map to DevStepOps
    let stepOpsList = stepList.map((step) => {
        return { step: step, finished: false }
    });

    const [steps, setSteps] = useState<DevStepOps[]>(stepOpsList);

    const closeCard = () => {
        if (onClose)
            onClose();
    }

    const preview_display = (stepOps: DevStepOps, index: number, array: DevStep[]) => {
        
        let on_finish = () => {
            // copy "step"
            let finished_step: DevStepOps = {...stepOps};
            finished_step.finished = true;
            
            // replace on index
            let newSteps = [...steps];
            newSteps[index] = finished_step;
            setSteps(newSteps);
        }
        
        return (
            <Card key={index}> 
                {stepOps.step.title}
                {stepOps.finished ? " finished" : null}
                <StepProcessPreview 
                    time_s={stepOps.step.timerLength_s}
                    onFinish={on_finish}/>
            </Card>)
    }


    return (
        <Card >
            Progress:
            {steps.map(preview_display)}
            <Button onClick={closeCard} style={{ margin: "" }}>
                Close card
            </Button>
        </Card>
    );
};

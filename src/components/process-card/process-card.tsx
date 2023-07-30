import { Overlay, Classes, H3, Button, Intent, Card } from "@blueprintjs/core";
import { Code } from "@blueprintjs/icons";
import classNames from "classnames";
import { useEffect, useState } from "react";

import styles from "./process-card.module.scss"
import { DevRecipe, DevStep } from "../../logic/data-props";
import { StepProcessPreview } from "../step-process-preview/step-process-preview";

interface ProcessCardProps {
    className?: string;
    children?: React.ReactNode;
    recipe: DevRecipe;
    onSoftClose?: () => void;   
    onHardClose?: () => void;   
}

interface DevStepOps {
    step: DevStep;
    started: boolean;
    finished: boolean;
}

export const ProcessCard = ({
    className,
    children,
    recipe,
    onSoftClose,
    onHardClose,
}: ProcessCardProps ) => {

    const [myRecipe, setMyRecipe] = useState<DevRecipe>(recipe);
    const [finished, setFinished] = useState<boolean>(false);

    let beginIdx = myRecipe.allSteps.findIndex((step) => step.id === myRecipe.firstStep.id);
    let stepList = myRecipe.allSteps.slice(beginIdx, myRecipe.allSteps.length);
    let stepOpsList = stepList.map((step) => {
        return { 
            step: step,
            started: false,
            finished: false 
        }});

    const [steps, setSteps] = useState<DevStepOps[]>(stepOpsList);

    const try_start_timer = (idx: number, stepsArr: DevStepOps[]) => {
        let newSteps = [...stepsArr];
        if (newSteps.length > idx)
            newSteps[idx].started = true;
        setSteps(newSteps);
    }

    const finish_timer = (idx: number, stepsArr: DevStepOps[]) => {
        let newSteps = [...stepsArr];
        if (newSteps.length > idx)
            newSteps[idx].finished = true;
            
        setSteps(newSteps);
        if (idx == newSteps.length-1)
            setFinished(true);
        
    }

    useEffect(() => {
        try_start_timer(0, steps)
    }, []);

    const preview_display = (stepOps: DevStepOps, index: number, array: DevStepOps[]) => {
        
        let on_finish = () => {
            finish_timer(index, array);
            try_start_timer(index+1, array);
        }
        
        return (
            <Card key={index}> 
                {stepOps.step.title}
                {stepOps.finished ? <span className={styles.root}> finished</span> : null}
                
                <StepProcessPreview 
                    time_s={stepOps.step.timerLength_s}
                    onFinish={on_finish}
                    start={stepOps.started}/>
            </Card>)
    }

    const closeCardSoft = () => {
        if (onSoftClose)
            onSoftClose();
    }

    const closeCardHard = () => {
        if (onHardClose)
            onHardClose();
    }


    let finish_button = finished ? 
        <Button onClick={closeCardHard} style={{ margin: "" }}>
            Exit</Button> 
        : null

    let add_note_button = finished ? 
        <Button onClick={() => console.log("add notes not implemented")} style={{ margin: "" }}>
            {`AddNote (${recipe.filmToDevelop.name})`}</Button> 
        : null

    return (
        <Card >
            Progress:
            {steps.map(preview_display)}
            <Button onClick={closeCardSoft} style={{ margin: "" }}>
                Close card
            </Button>
            {finish_button}
            {add_note_button}
        </Card>
    );
};

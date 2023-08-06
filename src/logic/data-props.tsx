

export interface Film {
    id: number;
    name: string;
    description: string;
    deleted: boolean;
}

export interface DevStep {
    id: number;
    filmId: number;
    title: string;
    content: string;
    timer: boolean;
    timerLength_s: number;
    deleted: boolean;
    temp: number;
}

export interface DevStepNote {
    id: number;
    filmId: number;
    devStepId: number;
    text: string;
    deleted: boolean;
}

export interface DevRecipe {
    filmToDevelop: Film
    allSteps: DevStep[],
    firstStep: DevStep, 
}
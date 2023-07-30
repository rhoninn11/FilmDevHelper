

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
    devStepId: number;
    title: string;
    content: string;
    deleted: boolean;
}

export interface DevRecipe {
    filmToDevelop: Film
    allSteps: DevStep[],
    firstStep: DevStep, 
}

const sample_film: Film = {
    id: 1,
    name: "Sample Film",
    description: "This is a sample film",
    deleted: false,
}

const sample_step_1: DevStep = {
    id: 1,
    filmId: 1,
    title: "Sample Step 1",
    content: "This is a sample step",
    timer: false,
    timerLength_s: 2,
    deleted: false,
    temp: 21,
}

const sample_step_2: DevStep = {
    id: 2,
    filmId: 1,
    title: "Sample Step 2",
    content: "This is a sample step",
    timer: false,
    timerLength_s: 2,
    deleted: false,
    temp: 21,
}

const sample_step_3: DevStep = {
    id: 3,
    filmId: 1,
    title: "Sample Step 3",
    content: "This is a sample step",
    timer: false,
    timerLength_s: 2,
    deleted: false,
    temp: 21,
}

const sample_step_4: DevStep = {
    id: 4,
    filmId: 1,
    title: "Sample Step 4",
    content: "This is a sample step",
    timer: false,
    timerLength_s: 2,
    deleted: false,
    temp: 21,
}

export const sample_recipe: DevRecipe = {
    filmToDevelop: sample_film,
    allSteps: [sample_step_1, sample_step_2, sample_step_3, sample_step_4],
    firstStep: sample_step_1
}

export enum FilmType {
    COLOR = "Color",
    MONO = "Mono",
    POSITIVE = "Positive",
}

export interface Film {
    id: number;
    name: string;
    description: string;
    deleted: boolean;
    type: FilmType;
}

export const empty_film: Film = 
{
    id: -1,
    name: "",
    description: "",
    deleted: false,
    type: FilmType.COLOR,
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

export const empty_dev_Step: DevStep = {
    id: -1,
    filmId: -1,
    title: "",
    content: "",
    timer: true,
    timerLength_s: 10,
    deleted: false,
    temp: 21,
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
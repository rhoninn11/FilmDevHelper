
export enum FilmType {
    COLOR = "Color",
    MONO = "Monochromatic",
    POSITIVE = "Positive",
}

export class Film {
    id: number = -1;
    name: string = '';
    description: string  = '';
    deleted: boolean = false;
    type: FilmType = FilmType.COLOR;
}

export class DevStep {
    id: number = -1;
    filmId: number = -1;
    title: string = "";
    content: string = "";
    timer: boolean = true;
    timerLength_s: number = 10;
    deleted: boolean = false;
    temp: number = 21;

    constructor(id: number, filmId: number) {
        this.id = id;
        this.filmId = filmId;
    }
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
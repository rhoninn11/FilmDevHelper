

export interface Film {
    id: number;
    name: string;
    description: string;
}

export interface DevStep {
    id: number;
    filmId: number;
    title: string;
    content: string;
    timer: boolean;
    timerLength_s: number;
}

export interface DevStepNote {
    id: number;
    devStepId: number;
    title: string;
    content: string;
}
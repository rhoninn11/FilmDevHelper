import { FilmType } from "./data-props";


const _notify = ( notifyFn?: (b: boolean) => void ) => {
    if (notifyFn) notifyFn(true)
}


export const inputEditor = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: (v: string) => void,
    changeNotifier?: (b: boolean) => void
) => {
    const value = event.target.value;
    setter(value);
    _notify(changeNotifier)
}

export const textAreaEditor = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    setter: (v: string) => void,
    changeNotifier?: (b: boolean) => void
) => {
    const value = event.target.value;
    setter(value);
    _notify(changeNotifier)
}

export const typeEditor = (
    event: React.FormEvent<HTMLInputElement>,
    setter: (v: FilmType) => void,
    changeNotifier?: (b: boolean) => void
) => {
    const value = event.currentTarget.value as FilmType;
    setter(value);
    _notify(changeNotifier)
}
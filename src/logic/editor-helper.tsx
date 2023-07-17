

export const inputEditor = (event: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const value = event.target.value;
    setter(value);
}
export const textAreaEditor = (event: React.ChangeEvent<HTMLTextAreaElement>, setter: (v: string) => void) => {
    const value = event.target.value;
    setter(value);
}
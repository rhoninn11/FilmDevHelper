import { openDB, DBSchema, IDBPDatabase } from 'idb';

import { Film, DevStep, DevStepNote } from "./data-props";

const FILM_FIELD = "films";
const DEV_STEP_FIELD = "devSteps";
const DEV_STOP_NOTE_FIELD = "devStepNotes";

interface DBContent {
    films: Film[];
    devSteps: DevStep[];
    devStepNotes: DevStepNote[];
}

interface MyDB extends DBSchema {
    films: {
        key: number;
        value: Film;
    };
    devSteps: {
        key: number;
        value: DevStep;
    };
    devStepNotes: {
        key: number;
        value: DevStepNote;
    };
}

export let initDB = async () => {
    let db = await openDB<MyDB>('myDatabase', 1, {
        upgrade(db) {
            db.createObjectStore(FILM_FIELD, { keyPath: 'id' });
            db.createObjectStore(DEV_STEP_FIELD, { keyPath: 'id' });
            db.createObjectStore(DEV_STOP_NOTE_FIELD, { keyPath: 'id' });
        },
    });
    return db;
}

export let getDB = async () => {
    return await openDB<MyDB>('myDatabase', 1)
}
let _clearDB = async (db: IDBPDatabase<MyDB>) => {
    await db.clear(FILM_FIELD);
    await db.clear(DEV_STEP_FIELD);
    await db.clear(DEV_STOP_NOTE_FIELD);
}

export let clearDB = async () => {
    const db = await getDB();
    _clearDB(db)
}

export let getDBJson = async () => {
    let db = await getDB();

    let films = await db.getAll(FILM_FIELD);
    for (let i = 0; i < films.length; i++) films[i].id = i + 1;
    let devSteps = await db.getAll(DEV_STEP_FIELD);
    for (let i = 0; i < devSteps.length; i++) devSteps[i].id = i + 1;
    let devStepNotes = await db.getAll(DEV_STOP_NOTE_FIELD);
    for (let i = 0; i < devStepNotes.length; i++) devStepNotes[i].id = i + 1;

    let db_obj: DBContent = { 
        films: films,
        devSteps: devSteps,
        devStepNotes: devStepNotes
    }; 
    
    let json = JSON.stringify(db_obj, null, 2);
    let blob = new Blob([json], { type: 'application/json' });


    return blob;
}

export let readDBJson = async (ev: ProgressEvent<FileReader>) => {
    let reader = ev.target as FileReader;
    const json = reader.result as string;
    const content = JSON.parse(json) as DBContent;
    
    const db = await getDB();
    _clearDB(db)
    const films = content.films;    
    for (const film of films)
        await db.put(FILM_FIELD, film);

    for (const devStep of content.devSteps)
        await db.put(DEV_STEP_FIELD, devStep);

    for (const devStepNote of content.devStepNotes)
        await db.put(DEV_STOP_NOTE_FIELD, devStepNote);

    return films
};

export let addDBFilm = async (newFilm: Film) => {
    const db = await getDB();
    const tx = db.transaction(FILM_FIELD, 'readwrite');
    const store = tx.objectStore(FILM_FIELD);
    await store.add(newFilm);
}

export let editDBFilm = async (id: number, updatedFilm: Film) => {
    const db = await getDB();
    const tx = db.transaction(FILM_FIELD, 'readwrite');
    const store = tx.objectStore(FILM_FIELD);
    const film = await store.get(id);
    if (film) {
        await store.put(updatedFilm);
    }
}

export let getAllDBFilms = async () => {
    const db = await initDB();
    const allFilms: Film[] = await db.getAll(FILM_FIELD);
    return allFilms;
}

export let addDBDevStep = async (newDevStep: DevStep) => {
    const db = await getDB();
    const tx = db.transaction(DEV_STEP_FIELD, 'readwrite');
    const store = tx.objectStore(DEV_STEP_FIELD);
    await store.add(newDevStep);
}

export let editDBDevStep = async (id: number, updatedDevStep: DevStep) => {
    const db = await getDB();
    const tx = db.transaction(DEV_STEP_FIELD, 'readwrite');
    const store = tx.objectStore(DEV_STEP_FIELD);
    const devStep = await store.get(id);
    if (devStep) {
        await store.put(updatedDevStep);
    }
}

export let getAllDBDevSteps = async () => {
    const db = await initDB();
    const allSteps: DevStep[] = await db.getAll(DEV_STEP_FIELD);
    return allSteps;
}

export let getAllDBDevStepNote = async () => {
    const db = await initDB();
    const allNotes: DevStepNote[] = await db.getAll(DEV_STOP_NOTE_FIELD);
    return allNotes;
}

export let addDBDevStepNote = async (newNote: DevStepNote) => {
    const db = await getDB();
    const tx = db.transaction(DEV_STOP_NOTE_FIELD, 'readwrite');
    const store = tx.objectStore(DEV_STOP_NOTE_FIELD);
    await store.add(newNote);
}

export let editDBDevStepNote = async (id: number, updated_note: DevStepNote) => {
    const db = await getDB();
    const tx = db.transaction(DEV_STOP_NOTE_FIELD, 'readwrite');
    const store = tx.objectStore(DEV_STOP_NOTE_FIELD);
    const devStep = await store.get(id);
    if (devStep) {
        await store.put(updated_note);
    }
}


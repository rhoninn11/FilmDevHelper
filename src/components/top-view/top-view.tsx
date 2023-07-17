import FilmCard_module from '../film-card/film-card.module.scss';
import styles from './top-view.module.scss';
import classNames from 'classnames';

import React, { useState, useEffect, useRef } from 'react';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

import { Film } from '../../logic/data-props'
import { initDB, getDB, getDBJson, readDBJson, clearDB, addDBFilm, getAllDBFilms } from '../../logic/db'

import { Button, Card } from '@blueprintjs/core';

import { ProductItem } from '../product-item/product-item';
import { FilmCard } from '../film-card/film-card';
import { FilmCreator } from '../film-creator/film-creator';
import { FilmProcessPreview } from '../film-process-preview/film-process-preview';
import { TooltipedButton } from '../tooltiped-button/tooltiped-button';

export interface Top_viewProps {
    className?: string;
    children?: React.ReactNode;
    editHandler: (film: Film) => void;
}

interface MyDB extends DBSchema {
    items: {
        key: number;
        value: Film;
    },

}

export const Top_view = ({
    className,
    children = 'Top_view',
    editHandler,
}: Top_viewProps) => {
    const [items, setItems] = useState<Film[]>([]);
    const [showEditor, setShowEditor] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            const initialItems = await getAllDBFilms()
            setItems(initialItems);
        };

        fetchData();
    }, []);

    const addItem = async (newFilm: Film) => {
        newFilm.id = items.length + 1;

        addDBFilm(newFilm);
        setItems((prevItems) => [...prevItems, newFilm]);
        setShowEditor(false);
    };

    const clearDatabase = async () => {
        await clearDB();
        setItems([]);
    };

    const downloadDatabase = async () => {
        const blob = await getDBJson();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'database.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const importDatabase = async () => {
        if (fileInputRef.current)
            fileInputRef.current.click();
    };

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const processJson = async (ev: ProgressEvent<FileReader>) => {
            const items = await readDBJson(ev);
            setItems(items);
        };

        const reader = new FileReader();
        reader.onload = processJson;
        reader.readAsText(file);
    };

    return (
        <div className={`${className}`}>
            <FilmProcessPreview />
            <Card elevation={3} className={FilmCard_module.card}>
                <TooltipedButton icon="add" tipText="Add new film" onClick={() => setShowEditor(true)} />
                <TooltipedButton icon="trash" tipText="Wipeout database" onClick={clearDatabase} />
                <TooltipedButton icon="import" tipText="Import database" onClick={importDatabase} />
                <input type="file" accept=".json" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileSelect} />

                <TooltipedButton icon="export" tipText="Export database" onClick={downloadDatabase} />
            </Card>
            {showEditor && (
                <FilmCreator
                    onSave={addItem}
                    onCancel={() => setShowEditor(false)}
                />
            )}
            {items.map((item) => (
                <FilmCard
                    key={item.id}
                    film={item}
                    filmEditHandler={editHandler}
                />
            ))}
        </div>
    );
};

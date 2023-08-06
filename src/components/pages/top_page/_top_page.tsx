import FilmCard_module from '../film-card/s.module.scss';
import styles from './s.module.scss';
import classNames from 'classnames';

import React, { useState, useEffect, useRef } from 'react';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

import { Film } from '../../../logic/data-props'
import { initDB, getDB, getDBJson, readDBJson, clearDB, addDBFilm, getAllDBFilms } from '../../../logic/db'

import { Card, Classes, Icon, InputGroup, Tag} from '@blueprintjs/core';

import { FilmCard } from '../../film-card/film-card';
import { FilmCreator } from '../../film-creator/film-creator';
import { TooltipedButton } from '../../tooltiped-button/tooltiped-button';
import { inputEditor } from '../../../logic/editor-helper';

export interface TopPage {
    className?: string;
    children?: React.ReactNode;
    editHandler: (film: Film) => void;
    devHandler: (film: Film) => void;
}

export const TopPage = ({
    className,
    children = 'Top_view',
    editHandler,
    devHandler,
}: TopPage) => {
    const [items, setItems] = useState<Film[]>([]);
    const [showEditor, setShowEditor] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [searchEnable, setSearchEnable] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

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

    const searchToggle = (cond: boolean) => {  
        setSearchEnable(cond);
        if (cond === false) setSearchQuery("")
    }

    const alive_items = items.filter((item) => item.deleted == false)

    const found_items = (searchEnable && searchQuery !== "") ?
        alive_items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())) 
        : alive_items

    const found_item_count = <Tag minimal={true} 
            intent={found_items.length > 0 ? 'success' : 'danger'}>
                {found_items.length}
            </Tag>;

    return (
        <div className={`${className}`}>
            <Card elevation={3} className={styles.card}>
                <TooltipedButton icon="add" tipText="Add new film" onClick={() => setShowEditor(true)} />
                {/* <TooltipedButton icon="trash" tipText="Wipeout database" onClick={clearDatabase} /> */}
                <TooltipedButton icon="search" tipText="Film Search" onClick={() => searchToggle(!searchEnable)} active />
                <TooltipedButton icon="import" tipText="Import database" onClick={importDatabase} />
                <input type="file" accept=".json" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileSelect} />

                <TooltipedButton icon="export" tipText="Export database" onClick={downloadDatabase} />
            </Card>
            { searchEnable ? <Card elevation={3} className={classNames(styles.card, styles.wrapper, className)}>
                <InputGroup 
                className={classNames(styles.search, Classes.ROUND)}
                    leftElement={<Icon icon="search" />}
                    onChange={(ev) => inputEditor(ev, setSearchQuery)}
                    placeholder="Search film by name..."
                    rightElement={found_item_count}
                    value={searchQuery}
                />
            </Card> : null }
            {showEditor && (
                <FilmCreator
                    onSave={addItem}
                    onCancel={() => setShowEditor(false)}
                />
            )}
            
            {found_items.map((item) => (
                <FilmCard
                    key={item.id}
                    film={item}
                    filmEditHandler={editHandler}
                    filmDevelopHandle={devHandler}
                />
            ))}
        </div>
    );
};

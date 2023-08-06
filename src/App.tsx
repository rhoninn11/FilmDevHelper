import { TopPage } from './components/pages/top_page/_top_page';
import styles from './App.module.scss';

import { DevRecipe, DevStep, Film } from './logic/data-props'
import { useState } from 'react';

import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';

import { RecipeOverlay } from './components/higher-level/overlays/recipe_overlay/recipe-overlay';
import { EditPage } from './components/pages/edit_page/edit_page';
import { DevPage } from './components/pages/dev_page/_dev_page';
import { ProcessPage } from './components/pages/process_page/_process_page';

interface EditCommProps {
    onEditAccept: (film: Film) => void;
}

function App() {
    const [filmForEdit, setFilmForEdit] = useState<Film | null>(null);
    const [filmForDevelopment, setFilmForDevelopment] = useState<Film | null>(null);
    // const [develRecipe, setDevelRecipe] = useState<DevRecipe| null>(null);
    const [develRecipe, setDevelRecipe] = useState<DevRecipe| null>(null);
    const [runTimer, setRunTimer] = useState<boolean>(false);

    const main_page = <TopPage
                        editHandler={(film_arg) => setFilmForEdit(film_arg)}
                        devHandler={(film_arg) => setFilmForDevelopment(film_arg)}/>

    const EditView = filmForEdit 
                        ? <EditPage 
                                film={filmForEdit} 
                                onCancel={() => setFilmForEdit(null)}/> 
                        : null;

    const dev_page = filmForDevelopment 
        ? <DevPage
            film={filmForDevelopment}
            onCancel={() => setFilmForDevelopment(null)}
            onDevelop={(recipe) => setDevelRecipe(recipe)}/>
        : null;

    const close_overlay = () => {
        setDevelRecipe(null);
        setRunTimer(false);
    }

    const overlay = !runTimer && develRecipe ?
        <RecipeOverlay
            recipe={develRecipe}
            onClose={close_overlay}
            onStart={() => setRunTimer(true)}/>
        : null;

    const process_page = runTimer && develRecipe ? 
        <ProcessPage 
            recipe={develRecipe}
            onSoftClose={() => setRunTimer(false)}
            onHardClose={close_overlay}/>
            
        : null;

    const AlternativeView = EditView || dev_page || process_page;
    const Wrapped = AlternativeView ? <div className={styles.tab}>{AlternativeView}</div> : AlternativeView;

    return (
        <div className={classNames(styles.App, styles.dark, Classes.DARK) }>
            {overlay}
            {Wrapped ? Wrapped : main_page }
        </div>
    );
}
export default App;

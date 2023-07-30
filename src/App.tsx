import { Top_view } from './components/top-view/top-view';
import styles from './App.module.scss';

import { DevRecipe, DevStep, Film, sample_recipe } from './logic/data-props'
import { useState } from 'react';

import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';

import { RecipeOverlay } from './components/recipe_overlay/recipe-overlay';
import { EditCard } from './components/edit-card/edit-card';
import { DevCard } from './components/dev-card/dev-card';
import { ProcessCard } from './components/process-card/process-card';

interface EditCommProps {
    onEditAccept: (film: Film) => void;
}

let recipe = sample_recipe

function App() {
    const [filmForEdit, setFilmForEdit] = useState<Film | null>(null);
    const [filmForDevelopment, setFilmForDevelopment] = useState<Film | null>(null);
    // const [develRecipe, setDevelRecipe] = useState<DevRecipe| null>(null);
    const [develRecipe, setDevelRecipe] = useState<DevRecipe| null>(recipe);
    const [runTimer, setRunTimer] = useState<boolean>(false);

    const TopView = <Top_view
                        editHandler={(film_arg) => setFilmForEdit(film_arg)}
                        devHandler={(film_arg) => setFilmForDevelopment(film_arg)}/>

    const EditView = filmForEdit 
                        ? <EditCard 
                                film={filmForEdit} 
                                onCancel={() => setFilmForEdit(null)}/> 
                        : null;

    const DevelopView = filmForDevelopment 
        ? <DevCard
            film={filmForDevelopment}
            onCancel={() => setFilmForDevelopment(null)}
            onDevelop={(recipe) => setDevelRecipe(recipe)}/>
        : null;

    const RecipeView = !runTimer && develRecipe ?
        <RecipeOverlay
            recipe={develRecipe}
            onClose={() => setDevelRecipe(null)}
            onStart={() => setRunTimer(true)}/>
        : null;

    const ProcessView = runTimer && develRecipe ? 
        <ProcessCard 
            recipe={develRecipe}
            onClose={() => setRunTimer(false)}/>
        : null;

    const AlternativeView = EditView || DevelopView || ProcessView;
    const Wrapped = AlternativeView ? <div className={styles.tab}>{AlternativeView}</div> : AlternativeView;

    return (
        <div className={classNames(styles.App, styles.dark, Classes.DARK) }>
            {RecipeView}
            {Wrapped ? Wrapped : TopView }
        </div>
    );
}
export default App;

import { GiftCard } from './components/gift-card/gift-card';
import { Top_view } from './components/top-view/top-view';
import { EditCard } from './components/edit-card/edit-card';
import styles from './App.module.scss';

import { Film } from './logic/data-props'
import { useState } from 'react';


interface EditCommProps {
    onEditAccept: (film: Film) => void;
}

function App() {
    const [filmForEdit, setFilmForEdit] = useState<Film | null>(null);

    const selectForEdit = (film: Film) => {
        console.log(film)
        setFilmForEdit(film);
    }

    return (
        <div className={styles.App}>
            {/* <Top_view editHandler={selectForEdit}/> */}
            {filmForEdit ? 
            <div className={styles.tab}>
                <EditCard film={filmForEdit} onCancel={() => setFilmForEdit(null)}/>
            </div> : <Top_view editHandler={selectForEdit}/>}
        </div>
    );
}
export default App;

import { createBoard } from '@wixc3/react-board';
import { FilmCreator } from '../../../components/film-creator/film-creator';

export default createBoard({
    name: 'FilmCreator',
    Board: () => <FilmCreator onSave={() => console.log("onSave")} onCancel={() => console.log("onCancel")} />
});

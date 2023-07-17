import { createBoard } from '@wixc3/react-board';
import { FilmCard } from '../../../components/film-card/film-card';

export default createBoard({
    name: 'FilmListItem',
    Board: () => <FilmCard />,
});

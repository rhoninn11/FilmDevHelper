import { createBoard } from '@wixc3/react-board';
import { FilmProcessPreview } from '../../../components/film-process-preview/film-process-preview';

export default createBoard({
    name: 'FilmProcessPreview',
    Board: () => <FilmProcessPreview />
});

import { createBoard } from '@wixc3/react-board';
import { DevPage } from '../../../components/pages/dev_page/_dev_page';

import { Film, FilmType } from '../../../logic/data-props';

export const default_film: Film = {
    id: 1,
    name: 'Film 1',
    description: 'Film 1 description',
    deleted: false,
    type: FilmType.COLOR
}


export default createBoard({
    name: 'DevCard',
    Board: () => <DevPage film={default_film}/>
});

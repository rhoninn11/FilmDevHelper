import { createBoard } from '@wixc3/react-board';
import { DevPage } from '../../../components/pages/dev_page/_dev_page';

import { Film } from '../../../logic/data-props';

const film: Film = {
    id: 1,
    name: 'Film 1',
    description: 'Film 1 description',
    deleted: false,
}

export default createBoard({
    name: 'DevCard',
    Board: () => <DevPage film={film}/>
});

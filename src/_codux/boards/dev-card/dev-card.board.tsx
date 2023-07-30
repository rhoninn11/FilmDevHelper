import { createBoard } from '@wixc3/react-board';
import { DevCard } from '../../../components/dev-card/dev-card';

import { Film } from '../../../logic/data-props';

const film: Film = {
    id: 1,
    name: 'Film 1',
    description: 'Film 1 description',
    deleted: false,
}

export default createBoard({
    name: 'DevCard',
    Board: () => <DevCard film={film}/>
});

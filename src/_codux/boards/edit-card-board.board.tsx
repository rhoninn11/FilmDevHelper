import { createBoard } from '@wixc3/react-board';
import { EditPage } from '../../components/pages/edit_page/edit_page';
import { default_film } from './dev-card/dev-card.board';

export default createBoard({
    name: 'EditCard board',
    Board: () => (
        <div>
            <EditPage film={default_film} />
        </div>
    ),
});

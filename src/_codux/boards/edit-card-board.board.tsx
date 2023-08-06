import { createBoard } from '@wixc3/react-board';
import { EditPage } from '../../components/pages/edit_page/edit_page';

export default createBoard({
    name: 'EditCard board',
    Board: () => (
        <div>
            <EditPage />
        </div>
    ),
});

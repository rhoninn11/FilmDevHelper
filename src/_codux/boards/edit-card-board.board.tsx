import { createBoard } from '@wixc3/react-board';
import { EditCard } from '../../components/edit-card/edit-card';

export default createBoard({
    name: 'EditCard board',
    Board: () => (
        <div>
            <EditCard />
        </div>
    ),
});

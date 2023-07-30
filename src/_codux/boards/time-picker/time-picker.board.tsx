import { createBoard } from '@wixc3/react-board';
import { TimePicker } from '../../../components/time-picker/time-picker';

export default createBoard({
    name: 'TimePicker',
    Board: () => <TimePicker />
});

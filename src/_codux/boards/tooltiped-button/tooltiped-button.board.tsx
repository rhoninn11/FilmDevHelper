import { createBoard } from '@wixc3/react-board';
import { TooltipedButton } from '../../../components/tooltiped-button/tooltiped-button';

export default createBoard({
    name: 'TooltipedButton',
    Board: () => <TooltipedButton />
});

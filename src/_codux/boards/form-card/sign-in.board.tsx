import { createBoard } from '@wixc3/react-board';
import { FormCard } from '../../../components/form-card/form-card';

export default createBoard({
    name: 'Sign-In Form',
    Board: () => <FormCard>{null}</FormCard>,
    environmentProps: {
        windowHeight: 600,
        windowWidth: 800,
    },
});

import { createBoard } from '@wixc3/react-board';
import { StepProcessPreview } from '../../../components/step-process-preview/step-process-preview';

export default createBoard({
    name: 'StepProcessPreview',
    Board: () => <StepProcessPreview />
});

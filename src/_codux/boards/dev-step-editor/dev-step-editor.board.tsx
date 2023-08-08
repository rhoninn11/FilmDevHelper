import { createBoard } from '@wixc3/react-board';
import { DevStepEditor } from '../../../components/editors/dev-step-editor/dev-step-editor';

import { DevStep, empty_dev_Step } from '../../../logic/data-props';

export default createBoard({
    name: 'DevStepEditor',
    Board: () => <DevStepEditor devStep={empty_dev_Step}/>
});

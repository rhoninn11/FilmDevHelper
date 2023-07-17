import { createBoard } from '@wixc3/react-board';
import { DevStepEditor } from '../../../components/dev-step-editor/dev-step-editor';

import { DevStep } from '../../../logic/data-props';

const devStep: DevStep = {
    id: 1,
    title: "Dev Step Title",
    content: "Dev Step Content",
    filmId: 1,
    timer: false,
    timerLength_s: 0,
}

export default createBoard({
    name: 'DevStepEditor',
    Board: () => <DevStepEditor devStep={devStep}/>
});

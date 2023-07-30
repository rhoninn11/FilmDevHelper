import { createBoard } from '@wixc3/react-board';
import { StepCard } from '../../../components/step-card/step-card';

import { DevStep } from '../../../logic/data-props';

const step : DevStep = {
    id: 1,
    filmId: 1,
    title: 'Step 1',
    content: 'Step 1 content',
    timer: true,
    timerLength_s: 68,
    temp: 21.3,
    deleted: false
}

export default createBoard({
    name: 'StepCard',
    Board: () => <StepCard step={step}/>
});

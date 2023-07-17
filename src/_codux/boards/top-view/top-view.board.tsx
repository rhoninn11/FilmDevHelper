import { createBoard } from '@wixc3/react-board';
import { Top_view } from '../../../components/top-view/top-view';
import { Card, H5, Button } from '@blueprintjs/core';

export default createBoard({
    name: 'Top_view',
    Board: () => (
        <Top_view
            children={
                <Card elevation={3}>
                    <H5>
                        <a href="#"> Analytical applications</a>
                    </H5>
                    <p>
                        User interfaces that enable people to interact smoothly
                        with data, ask better questions, and make better
                        decisions.
                    </p>
                    <Button text="Explore products" />
                </Card>
            }
        />
    ),
    environmentProps: {
        windowWidth: 1134,
        canvasHeight: 1947,
    },
});

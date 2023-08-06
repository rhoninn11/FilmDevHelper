import { createBoard } from '@wixc3/react-board';
import { TopPage } from '../../../components/pages/top_page/_top_page';
import { Card, H5, Button } from '@blueprintjs/core';

export default createBoard({
    name: 'Top_view',
    Board: () => (
        <TopPage
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

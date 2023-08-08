import { Button, ButtonGroup, FormGroup, InputGroup, Label } from '@blueprintjs/core';
import classNames from 'classnames';
import styles from './film-creator.module.scss';
import { Film, FilmType} from '../../logic/data-props';
import { useState } from 'react';



interface FilmCreatorProps {
    onSave: (newItem: Film) => void;
    onCancel: () => void;
}

export const FilmCreator = ({
    onSave,
    onCancel
}: FilmCreatorProps) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSave = () => {
        const newItem: Film = {
            id: 0,
            name: name,
            description: description,
            deleted: false,
            type: FilmType.COLOR,
        }
        // check for errors
        onSave(newItem);
    };

    // const type_select = <Label>
    //     {label}
    //     <ButtonGroup fill={true} style={{ marginTop: 5 }}>
    //         <Button active={size === "small"} text={optionLabels[0]} onClick={handleSmall} />
    //         <Button active={size === "regular"} text={optionLabels[1]} onClick={handleRegular} />
    //         <Button active={size === "large"} text={optionLabels[2]} onClick={handleLarge} />
    //     </ButtonGroup>
    // </Label>

    return (
        <div>
            <FormGroup label="Title" labelFor="title-input">
                <InputGroup
                    id="title-input"
                    placeholder="Enter title"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </FormGroup>
            <FormGroup label="Description" labelFor="description-input">
                <InputGroup
                    id="description-input"
                    placeholder="Enter description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </FormGroup>
            <Button onClick={handleSave}>Accept</Button>
            <Button onClick={onCancel}>Cancel</Button>
        </div>
    );
};


import { Button } from "@blueprintjs/core";
import styles from "./s.module.scss"


interface AcceptCancelPromptProps {
    onAccept: () => void;
    onCancel: () => void;
}

export const AcceptCancelPrompt = ({
    onAccept,
    onCancel
}: AcceptCancelPromptProps) => {
    
const submitButton = <Button className={styles.frowi}
    text="Accept"
    type="button"
    intent="primary"
    icon="arrow-right"
    onClick={onAccept}
/>

const cancelButton = <Button className={styles.frowi}
    text="Cancel"
    type="button"
    intent="danger"
    icon="cross"
    onClick={onCancel}
/>

const buttonArea = <div className={styles.frow}>
    {cancelButton}
    {submitButton}
</div>

    return buttonArea
};
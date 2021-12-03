import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField, Button} from "@mui/material";

type AddItemFormPropsType = {
    addTask: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = ({addTask}) => {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error) setError(null)
        if (e.key === 'Enter') {
            addItem()
        }
    }

    const addItem = () => {
        if (title.trim() !== "") {
            addTask(title.trim())
            setTitle("")
        } else {
            setError("Title is required");
        }
    }

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <TextField id="outlined-basic"
                       label={error || null}
                       variant="outlined"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                       size={'small'}
                       error={!!error}
                       style={{backgroundColor: 'white',borderRadius: '5px', margin: '10px'}}/>
            <Button onClick={addItem}
                    variant={"contained"}
                    style={{maxWidth: '50px', minWidth: '50px', minHeight: '40px', maxHeight: '40px' }}>Add</Button>
        </div>
    )

}

export default React.memo(AddItemForm)
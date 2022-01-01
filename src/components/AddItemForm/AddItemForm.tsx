import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField, Button} from "@mui/material";

interface IProps {
    addTask: (title: string) => void
    disabled?: boolean
}

export const AddItemForm: React.FC<IProps> = React.memo(props => {

    const {addTask, disabled = false} = props
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const buttonStyle = {
        maxWidth: '50px',
        minWidth: '50px',
        minHeight: '40px',
        maxHeight: '40px',
    }

    const textFieldStyle = {
        backgroundColor: 'white',
        borderRadius: '5px',
        margin: '10px'
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null)
        if (e.key === 'Enter') {
            addItemOnClick()
        }
    }

    const addItemOnClick = () => {
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
                       disabled={disabled}
                       label={error || null}
                       variant="outlined"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                       size={'small'}
                       error={!!error}
                       style={textFieldStyle}/>
            <Button onClick={addItemOnClick}
                    disabled={disabled}
                    variant={"contained"}
                    style={buttonStyle}>Add</Button>
        </div>
    )
})
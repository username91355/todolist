import React, {useState, KeyboardEvent, ChangeEvent} from "react";

export const MutableSpan: React.FC<IProps> = React.memo(props => {

    const {title, onChangeTitle, disabled = false} = props
    const [localTitle, setLocalTitle] = useState<string>('')
    const [readingMode, setReadingMode] = useState<boolean>(true)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }

    const onDblClickHandler = () => {
        if (disabled) {
            return
        } else {
            setLocalTitle(title)
            setReadingMode(false)
        }
    }

    const setChangeTitle = () => {
        onChangeTitle(localTitle)
        setReadingMode(true)
    }

    const setChangeTitleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setChangeTitle()
        }
    }

    return (
        readingMode
            ? <span onDoubleClick={onDblClickHandler} >{title}</span>
            : <input type="text"
                     disabled={disabled}
                     value={localTitle}
                     onBlur={setChangeTitle}
                     onChange={onChangeHandler}
                     onKeyPress={setChangeTitleOnKeyPress}
                     autoFocus/>
    )
})

//types
interface IProps {
    title: string
    onChangeTitle: (title: string) => void
    disabled?: boolean
}
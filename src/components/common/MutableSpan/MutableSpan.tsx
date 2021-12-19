import React, {useState, KeyboardEvent, ChangeEvent} from "react";

type MutableSpanType = {
    title: string
    onChangeTitle: (title: string) => void
}

const MutableSpan: React.FC<MutableSpanType> = ({title, onChangeTitle}) => {

    const [localTitle, setLocalTitle] = useState<string>('')
    const [readingMode, setReadingMode] = useState<boolean>(true)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }

    const onDblClickHandler = () => {
        setLocalTitle(title)
        setReadingMode(false)
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
            ? <span onDoubleClick={onDblClickHandler}>{title}</span>
            : <input type="text"
                     value={localTitle}
                     onBlur={setChangeTitle}
                     onChange={onChangeHandler}
                     onKeyPress={setChangeTitleOnKeyPress}
                     autoFocus/>
    )
}

export default React.memo(MutableSpan)
import React, { useState} from "react";
import "./styles.scss"

const TodoItem = ({item}) => {
    const[titleValue, setTitleValue] = useState(item.title)
    const[edit, setEdit] = useState(false)
    const [completed, setCompleted] = useState(item.completed)

    const onSubmitEdit = () => {
        item.title = titleValue;
        setEdit(false)
    }

    const onCancelEdit = () => {
        item.title = item.title;
        setTitleValue(item.title)
        setEdit(false)
    }

    return(
        <div className="todoItem">
            {edit ?
            <>
            <div className="itemTitle">
                <input style={{width: 500}} onChange={(e) => {
                    setTitleValue(e.target.value)
                }} value={titleValue}/>
            </div>
            <div className="itemButtons">
                <button onClick={onSubmitEdit}>Подтвердить</button>
                <button onClick={onCancelEdit}>Отменить</button>  
            </div>
            </>
              :
              <>
              <p style={item.completed ? {textDecoration: "line-through"} : null}>{item.title}</p>
            <div className="itemButtons">
                <button onClick={() => setEdit(!edit)}>Редактировать</button> 
            </div>  
              </>
            
            }
        </div>
    )
}

export default TodoItem
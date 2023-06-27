import React, { useEffect, useState } from "react";
import mainImg from "../../assets/images/mainImg.png"
import axios from "axios"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const PostItem = ({item, items, setPosts, setCheckItem}) => {
    const[users, setUsers] = useState()
    const[comments, setComments] = useState()
    const[userName, setUserName] = useState()
    const[showComments, setShowComments] = useState(false)
    const[edit, setEdit] = useState(false)
    const[infoValue, setInfoValue] = useState(item.body)
    const[nameValue, setNameValue] = useState(userName)
    const[titleValue, setTitleValue] = useState(item.title)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                setUsers(res.data)   
        })
        
        axios.get("https://jsonplaceholder.typicode.com/comments")
            .then((res) => {
                setComments(res.data.filter(i => i.postId == item.id))
        })
    }, [])

    useEffect(() => {
        if(users){
            let user = users.filter(i => i.id == item.userId)
            setUserName(user[0].name)
            setNameValue(user[0].name)
        }
    }, [users])

    const onSubmitEdit = () => {
        item.body = infoValue;
        item.title = titleValue;
        setUserName(nameValue);
        setEdit(false)
    }

    const onCancelEdit = () => {
        item.body = item.body;
        item.title = item.title;
        setUserName(userName);
        setInfoValue(item.body);
        setTitleValue(item.title)
        setNameValue(userName)
        setEdit(false)
    }

    const deleteItem = () => {
        setPosts(items.filter((it) => it.id !== item.id))
        handleClose()
    }

    return(
        <div className="postItem">
            <div className="itemBlock">
                {edit ?
                    <>
                        <div className="itemTitle">
                            <textarea style={{width: 350, height: 40, resize: "none"}} onChange={(e) => {
                                setTitleValue(e.target.value)
                            }} value={titleValue}/>
                        </div>
                        <div className="itemName">
                            <img src={mainImg} width={50} height={50} alt=""/>
                            <input onChange={(e) => {
                                setNameValue(e.target.value)
                            }} value={nameValue}/>
                        </div>
                        <div className="itemInfo">
                            <textarea style={{width: "100%", height: 120, resize: "none"}} onChange={(e) => {
                                setInfoValue(e.target.value)
                            }} value={infoValue}/>
                        </div>
                        <div className="itemButtons">
                            <button onClick={onSubmitEdit}>Подтвердить</button>
                            <button onClick={onCancelEdit}>Отменить</button>
                        </div>
                    </>:
                    <>
                        <div className="itemTitle">
                                <p>{item.title}</p>
                        </div>
                        <div className="itemName">
                            <img src={mainImg} width={50} height={50} alt=""/>
                                <p>{userName && userName}</p>
                        </div>
                        <div className="itemInfo">
                            <p>{item.body}</p>
                        </div>
                        <div className="itemButtons">
                            <button onClick={() => setShowComments(!showComments)}>Комментарий</button>
                            <button onClick={() => setEdit(!edit)}>Редактировать</button>
                            <button onClick={handleOpen}>Удалить</button>
                        </div>
                    </>
                }
                </div>
                {showComments && comments.map(item => {
                        return(
                            <div className="commentItem">
                                <p><b>{item.name}</b></p>
                                <p><i>{item.email}</i></p>
                                <p>{item.body}</p>
                            </div>
                        )
                    })}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div style={{marginTop: 0}} className="itemButtons">
                                <button onClick={deleteItem}>Подтвердить</button>
                                <button onClick={handleClose}>Отменить</button>
                            </div>
                        </Box>
                    </Modal>
        </div>
        
    )
}

export default PostItem
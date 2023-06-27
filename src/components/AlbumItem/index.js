import React, { useEffect, useState } from "react";
import axios from "axios"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const AlbumItem = ({item, items, setOpenPhotos, setAlbums}) => {
    const[users, setUsers] = useState()
    const[userName, setUserName] = useState()
    const[nameValue, setNameValue] = useState(userName)
    const[titleValue, setTitleValue] = useState(item.title)
    const[edit, setEdit] = useState(false)
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
    }, [])

    useEffect(() => {
        if(users){
            let user = users.filter(i => i.id == item.userId)
            setUserName(user[0].name)
            setNameValue(user[0].name)
        }
    }, [users])

    const onSubmitEdit = () => {
        item.title = titleValue;
        setUserName(nameValue);
        setEdit(false)
    }

    const onCancelEdit = () => {
        item.body = item.body;
        item.title = item.title;
        setUserName(userName);
        setTitleValue(item.title)
        setNameValue(userName)
        setEdit(false)
    }

    const deleteItem = () => {
        setAlbums(items.filter((it) => it.id !== item.id))
        handleClose()
    }

    return(
        <>
        <div className="albumBlock">
                {edit ? 
                    <>
                       <div className="itemTitle">
                            <textarea style={{width: 250, height: 40, resize: "none"}} onChange={(e) => {
                                setTitleValue(e.target.value)
                            }} value={titleValue}/>
                        </div>
                        <div className="itemName">
                            <input onChange={(e) => {
                                setNameValue(e.target.value)
                            }} value={nameValue}/>
                        </div> 
                        <div className="itemButtons">
                            <button onClick={onSubmitEdit}>Подтвердить</button>
                            <button onClick={onCancelEdit}>Отменить</button>
                        </div>
                    </> :
                    <>
                        <p>{item.title}</p>
                        <p>{userName && userName}</p>
                        <div className="itemButtons">
                            <button onClick={() => setOpenPhotos(item.id)}>Открыть</button>
                            <button onClick={() => setEdit(true)}>Редактировать</button>
                            <button onClick={handleOpen}>Удалить</button>
                        </div> 
                    </>
                }
            </div>
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
        </>
            
    )
}

export default AlbumItem
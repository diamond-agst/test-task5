import React from "react";
import "./styles.scss"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import close from "../../assets/images/close.png"

const PhotoItem = ({item}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    return(
        <>
            <div className="photoItem" style={{cursor: "pointer"}} onClick={handleOpen}>
                <img src={item.url} width={300}/>
                <p>{item.title}</p>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className="modalImage">
                            <img src={item.url} width={530}/>
                            <img onClick={handleClose} src={close} width={20}/>
                        </div>       
                    </Box>
            </Modal>
        </>
        
    )
}

export default PhotoItem
import React, { useState } from "react";
import AlbumBlock from "../../components/AlbumBlock";
import PhotoBlock from "../../components/PhotoBlock";
import "./styles.scss"

const PhotoTab = () => {
    const[openPhotos, setOpenPhotos] = useState()

    return(
        <div className="photoTabWrapper">
            {
                openPhotos ?
                <PhotoBlock setOpenPhotos={setOpenPhotos} openPhotos={openPhotos}/> :
                <AlbumBlock setOpenPhotos={setOpenPhotos}/>
            }
            
        </div>
    )
}

export default PhotoTab
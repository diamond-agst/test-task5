import React, { useEffect, useState } from "react";
import "./styles.scss"
import axios from "axios"
import PhotoItem from "../PhotoItem";
import ReactPaginate from 'react-paginate';

const PhotoBlock = ({openPhotos, setOpenPhotos}) => {
    const[allPhotos, setAllPhotos] = useState()
    const [sortUp, setSortUp] = useState()
    const[photos, setPhotos] = useState()
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [itemOffset, setItemOffset] = useState(0);
    const [showPerPage, setShowPerPage] = useState(false);
    const endOffset = itemOffset + itemsPerPage;
    let currentItems = photos && photos.slice(itemOffset, endOffset);
    const pageCount = photos && Math.ceil(photos.length / itemsPerPage);
    const handlePageClick = (event) => {
        if(photos){
            const newOffset = (event.selected * itemsPerPage) % photos.length;
            setItemOffset(newOffset);
        }
    };

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/photos")
            .then(res => {
                setAllPhotos(res.data)
            })
        let page = JSON.parse(localStorage.getItem('photoPage'))
        if(page){
            setItemsPerPage(page)
        }
    }, [])

    useEffect(() => {
        if(allPhotos){
            let photos = allPhotos.filter(item => item.albumId == openPhotos)
            setPhotos(photos)
        }
        
    }, [allPhotos])

    function SortArrayUp(x, y){
        if (x.title > y.title) {return -1;}
        if (x.title < y.title) {return 1;}
        return 0;
    }

    function SortArrayDown(x, y){
        if (x.title < y.title) {return -1;}
        if (x.title > y.title) {return 1;}
        return 0;
    }

    return(
        <div className="photoWrapper">
            <h1 style={{cursor: "pointer"}} onClick={() => setOpenPhotos(false)}>Назад</h1>
            <div className="filterBlock">
                <div></div>
                <button className="filterButton" onClick={() => 
                        setSortUp([...photos].sort(sortUp ? SortArrayDown : SortArrayUp))}>
                    Фильтр
                </button> 
            </div>
            <div className="photoContent">
                {photos && currentItems &&
                    currentItems.map(item => {
                        return(
                            <PhotoItem item={item}/>
                        )
                    })
                }
            </div>
            <div className="paginationBlock">
                    <div className="showItem">
                        <div className="showCount" onClick={() => setShowPerPage(true)}>
                           <p className="showText">{itemsPerPage}</p>
                           <div className="triangle"></div>
                        </div>
                        
                        {showPerPage && <div className="selectPerPage">
                            <div className="perPageBlock" onClick={() => setShowPerPage(false)}>
                                <p className="showText">{itemsPerPage}</p>
                                <div className="triangle"></div>
                            </div>
                            {itemsPerPage !== 10 &&<p
                            onClick={() => {
                                setShowPerPage(false);
                                setItemsPerPage(10)
                                localStorage.setItem('photoPage', JSON.stringify(10))
                            }} 
                            className="showText">10</p>}
                            {itemsPerPage !== 20 &&<p
                            onClick={() => {
                                setShowPerPage(false);
                                setItemsPerPage(20)
                                localStorage.setItem('photoPage', JSON.stringify(20))
                            }} 
                            className="showText">20</p>}
                            {itemsPerPage !== 50 &&<p 
                            onClick={() => {
                                setShowPerPage(false);
                                setItemsPerPage(50)
                                localStorage.setItem('photoPage', JSON.stringify(50))
                            }}
                            className="showText">50</p>}
                            {itemsPerPage !== 100 &&<p 
                            onClick={() => {
                                setShowPerPage(false);
                                setItemsPerPage(100)
                                localStorage.setItem('photoPage', JSON.stringify(100))
                            }}
                            className="showText">100</p>}
                        </div>}
                    </div>
                    <div className="paginationItem">
                        <ReactPaginate
                        nextLabel="&#8250;"
                        onPageChange={handlePageClick}
                        pageCount={pageCount}
                        previousLabel="&#8249;"
                        renderOnZeroPageCount={null}
                        />
                    </div>
                    <div></div>
                </div>
        </div>
    )
}

export default PhotoBlock
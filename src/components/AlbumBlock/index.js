import React, { useEffect, useState } from "react";
import "./styles.scss"
import axios from "axios"
import AlbumItem from "../AlbumItem";
import ReactPaginate from 'react-paginate';

const AlbumBlock = ({setOpenPhotos}) => {
    const[albums, setAlbums] = useState()
    const [sortUp, setSortUp] = useState()
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [itemOffset, setItemOffset] = useState(0);
    const [showPerPage, setShowPerPage] = useState(false);
    const endOffset = itemOffset + itemsPerPage;
    let currentItems = albums && albums.slice(itemOffset, endOffset);
    const pageCount = albums && Math.ceil(albums.length / itemsPerPage);
    const handlePageClick = (event) => {
        if(albums){
            const newOffset = (event.selected * itemsPerPage) % albums.length;
            setItemOffset(newOffset);
        }
    };

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/albums")
            .then(res => {
                setAlbums(res.data)
            })
        let page = JSON.parse(localStorage.getItem('albumPage'))
        if(page){
            setItemsPerPage(page)
        }
    }, [])

    function SortArrayUp(x, y){
        setSortUp(true)
        if (x.title < y.title) {return -1;}
        if (x.title > y.title) {return 1;}
        return 0;
    }

    function SortArrayDown(x, y){
        setSortUp(true)
        if (x.title < y.title) {return -1;}
        if (x.title > y.title) {return 1;}
        return 0;
    }

    return(
        <div className="albumContainer">
            <h1>Альбомы</h1>
            <div className="filterBlock">
                <button className="filterButton" onClick={() => setAlbums([...albums].sort(sortUp ? SortArrayDown : SortArrayUp))}>
                    <p>Фильтр по названию</p>
                </button>
            </div>
            
            <div className="albumWrapper">
                {albums && currentItems &&
                    currentItems.map(item => {
                        return(
                            <AlbumItem setAlbums={setAlbums} items={albums} setOpenPhotos={setOpenPhotos} item={item}/>
                        )
                    })}
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
                                localStorage.setItem('albumPage', JSON.stringify(10))
                            }} 
                            className="showText">10</p>}
                            {itemsPerPage !== 20 &&<p
                            onClick={() => {
                                setShowPerPage(false);
                                setItemsPerPage(20)
                                localStorage.setItem('albumPage', JSON.stringify(20))
                            }} 
                            className="showText">20</p>}
                            {itemsPerPage !== 50 &&<p 
                            onClick={() => {
                                setShowPerPage(false);
                                setItemsPerPage(50)
                                localStorage.setItem('albumPage', JSON.stringify(50))
                            }}
                            className="showText">50</p>}
                            {itemsPerPage !== 100 &&<p 
                            onClick={() => {
                                setShowPerPage(false);
                                setItemsPerPage(100)
                                localStorage.setItem('albumPage', JSON.stringify(100))
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

export default AlbumBlock
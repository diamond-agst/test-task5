import React, { useEffect, useState } from "react";
import "./styles.scss"
import axios from "axios";
import PostItem from "../../components/PostItem";

import ReactPaginate from 'react-paginate';

const Posts = () => {
    const[posts, setPosts] = useState()
    const [sortUp, setSortUp] = useState()
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [itemOffset, setItemOffset] = useState(0);
    const [showPerPage, setShowPerPage] = useState(false);
    const endOffset = itemOffset + itemsPerPage;
    let currentItems = posts && posts.slice(itemOffset, endOffset);
    const pageCount = posts && Math.ceil(posts.length / itemsPerPage);
    const handlePageClick = (event) => {
        if(posts){
            const newOffset = (event.selected * itemsPerPage) % posts.length;
            setItemOffset(newOffset);
        }
    };

    function SortArrayUp(x, y){
        setSortUp(true)
        if (x.title < y.title) {return -1;}
        if (x.title > y.title) {return 1;}
        return 0;
    }

    function SortArrayDown(x, y){
        setSortUp(false)
        if (x.title > y.title) {return -1;}
        if (x.title < y.title) {return 1;}
        return 0;
    }


    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(res => {
                setPosts(res.data)
        })
        let page = JSON.parse(localStorage.getItem('postPage'))
        if(page){
            setItemsPerPage(page)
        }
    }, [])

    return(
        <div className="postsWrapper">
            <div className="filterBlock">
                <button className="filterButton" onClick={() => setPosts([...posts].sort(sortUp ? SortArrayDown : SortArrayUp))}>
                    <p>Фильтр по названию</p>
                </button>
            </div>
            <div className="postsContainer">
                {posts && currentItems &&
                    currentItems.map(item => {
                        return(
                            <PostItem item={item} 
                            items={posts} 
                            setPosts={setPosts}
                            />
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
                                localStorage.setItem('postPage', JSON.stringify(10))
                            }} 
                            className="showText">10</p>}
                            {itemsPerPage !== 20 &&<p
                            onClick={() => {
                                setShowPerPage(false);
                                setItemsPerPage(20)
                                localStorage.setItem('postPage', JSON.stringify(20))
                            }} 
                            className="showText">20</p>}
                            {itemsPerPage !== 50 &&<p 
                            onClick={() => {
                                setShowPerPage(false);
                                setItemsPerPage(50)
                                localStorage.setItem('postPage', JSON.stringify(50))
                            }}
                            className="showText">50</p>}
                            {itemsPerPage !== 100 &&<p 
                            onClick={() => {
                                setShowPerPage(false);
                                setItemsPerPage(100)
                                localStorage.setItem('postPage', JSON.stringify(100))
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

export default Posts
import React, { useEffect, useState } from "react";
import "./styles.scss"
import axios from "axios"
import TodoItem from "../../components/TodoItem";
import ReactPaginate from 'react-paginate';

const TodoBlock = () => {
    const [todos, setTodos] = useState()
    const [sortUp, setSortUp] = useState()
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [itemOffset, setItemOffset] = useState(0);
    const [showPerPage, setShowPerPage] = useState(false);
    const endOffset = itemOffset + itemsPerPage;
    let currentItems = todos && todos.slice(itemOffset, endOffset);
    const pageCount = todos && Math.ceil(todos.length / itemsPerPage);
    const handlePageClick = (event) => {
        if(todos){
            const newOffset = (event.selected * itemsPerPage) % todos.length;
            setItemOffset(newOffset);
        }
    };
    
    function SortArrayUp(x, y){
        setSortUp(true)
        if (x.completed < y.completed) {return -1;}
        if (x.completed > y.completed) {return 1;}
        return 0;
    }

    function SortArrayDown(x, y){
        setSortUp(false)
        if (x.completed > y.completed) {return -1;}
        if (x.completed < y.completed) {return 1;}
        return 0;
    }

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/todos")
            .then(res => {
                setTodos(res.data.sort(SortArrayUp))
        })
        let page = JSON.parse(localStorage.getItem('todoPage'))
        if(page){
            setItemsPerPage(page)
        }
    }, [])

    

    return(
        <div className="todoWrapper">
            <div className="filterBlock">
                <button className="filterButton" onClick={() => 
                        setTodos([...todos].sort(sortUp ? SortArrayDown : SortArrayUp))}>
                    Фильтр
                </button> 
            </div>
            
            <div className="todoContainer">
                {todos && currentItems &&
                    currentItems.map((item) => <TodoItem item={item}/>)}
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
                                localStorage.setItem('todoPage', JSON.stringify(10))
                            }} 
                            className="showText">10</p>}
                            {itemsPerPage !== 20 &&<p
                            onClick={() => {
                                setShowPerPage(false);
                                setItemsPerPage(20)
                                localStorage.setItem('todoPage', JSON.stringify(20))
                            }} 
                            className="showText">20</p>}
                            {itemsPerPage !== 50 &&<p 
                            onClick={() => {
                                setShowPerPage(false);
                                setItemsPerPage(50)
                                localStorage.setItem('todoPage', JSON.stringify(50))
                            }}
                            className="showText">50</p>}
                            {itemsPerPage !== 100 &&<p 
                            onClick={() => {
                                setShowPerPage(false);
                                setItemsPerPage(100)
                                localStorage.setItem('todoPage', JSON.stringify(100))
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

export default TodoBlock;
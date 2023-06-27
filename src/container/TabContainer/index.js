import React, { useState, useEffect } from "react";
import Header from "../../components/Header"
import PhotoTab from "../PhotoTab";
import Posts from "../Posts";
import TodoBlock from "../Todo";

const TabContainer = () => {
    const [page, setPage] = useState(1)

    useEffect(() => {
        let page = JSON.parse(localStorage.getItem('page'))
        if(page){
            setPage(page)
        }
    }, [])

    const showPage = () => {
        switch (page) {
            case 1: return <Posts/>;
            case 2: return <PhotoTab />;
            case 3: return <TodoBlock/>;
            default:
                return <Posts/>
        }
    }

    return(
        <div>
            <Header page={page} setPage={setPage}/>
            {showPage()}
        </div>
    )
}

export default TabContainer
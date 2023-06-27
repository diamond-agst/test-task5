import React from "react";
import "./styles.scss"

const Header = ({setPage, page}) => {
    return(
        <div className="headerWrapper">
            <div className="headerContent">
                <div onClick={() => {
                    setPage(1)
                    localStorage.setItem('page', JSON.stringify(1));
                }} 
                    className={page == 1 ? "headerItem active" : "headerItem"}>
                    <p>Посты</p>
                </div>
                <div onClick={() => {
                    setPage(2)
                    localStorage.setItem('page', JSON.stringify(2));
                }} 
                    className={page == 2 ? "headerItem active" : "headerItem"}>
                    <p>Фото</p>
                </div>
                <div onClick={() => {
                    setPage(3)
                    localStorage.setItem('page', JSON.stringify(3));
                }} 
                    className={page == 3 ? "headerItem active" : "headerItem"}>
                    <p>Задача</p>
                </div>
            </div>
        </div>
    )
}

export default Header
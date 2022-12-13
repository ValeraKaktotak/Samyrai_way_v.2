import style from "../../../components/commons/paginator/Paginator.module.css";
import React, {useState} from "react";

//пагинатор не 100% корректно рабочий, нужно доработать(сделать фильтр выводимых страниц из общего массива страниц)
const Paginator = (props) => {
    let pagesArray = [];
    const pages = Math.ceil(props.usersCount / props.usersCountOnPage);
    const pagesBlocksCount = Math.ceil(pages / props.pagesInBlock);
    let[currentPageBlock, setCurrentPageBlock] = useState(1)
    let leftBlockPageNumber = (currentPageBlock - 1) * 10 + 1;
    let rightBlockPageNumber = (currentPageBlock - 1) * 10 + 10;

    const changePage = (page) => {
        props.changePage(page, props.usersCountOnPage)
    }

    const nextButtonHandler = () => {
        setCurrentPageBlock((c)=> c + 1)
    }
    const prevButtonHandler = () => {
        setCurrentPageBlock((c)=> c - 1)
    }

    if(currentPageBlock !== 1){
        for (let i = leftBlockPageNumber; i <= rightBlockPageNumber; i++) {
            pagesArray.push(i)
        }
    }else if(currentPageBlock === 1){
        for (let i = leftBlockPageNumber; i <= rightBlockPageNumber; i++) {
            pagesArray.push(i)
        }
    }
    else{
        if (pages > 10) {
            if (props.usersCurrentPage > 5) {
                for (let i = props.usersCurrentPage - 4; i <= props.usersCurrentPage + 5; i++) {
                    pagesArray.push(i)
                    if (i === pages) break
                }
            } else {
                for (let i = 1; i <= 10; i++) {
                    pagesArray.push(i)
                    if (i === pages) break
                }
            }
        } else {
            for (let i = 1; i <= pages; i++) {
                pagesArray.push(i)
            }
        }
    }


    return (
        <div className={style.items}>
            {currentPageBlock > 1 && <button onClick={prevButtonHandler} >{"<< "}PREV</button>}
            {
                pagesArray.map((page, index) => {
                    return <span className={props.usersCurrentPage === page ? style.current_page : ''} key={index}
                                 onClick={() => {
                                     changePage(page)
                                 }}> {page} </span>
                })
            }
            {currentPageBlock < pagesBlocksCount && <button onClick={nextButtonHandler} >NEXT >></button>}
        </div>
    )
}

export default Paginator
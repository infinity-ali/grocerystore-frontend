import React from 'react'
import "./pagination.css"

const Pagination = (props) => {
    let {nPages, currentPage, setCurrentPage} = props;
    // console.log("nPages:", nPages)
    // console.log("currentPage:", currentPage)
    if(currentPage===0){
        currentPage = 1;
        setCurrentPage(1)
    }
    
    // if(nPages===NaN){
    //     nPages = 1;
    // }

    const pageNumbers = [...Array(nPages + 1).keys()]?.slice(1)

    const nextPage = () => {
        if(currentPage !== nPages) 
            setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) 
            setCurrentPage(currentPage - 1)
    }

    const handlePaginationPage = (pageNumber) => {
        // console.log("page number:", pageNumber)
        setCurrentPage(pageNumber)
    }
    
  return (
    <>
        <nav className='mt-5'>
            <ul className='pagination justify-content-center'>
                <li className='page-item text-dark'>
                    {/* <a href="#" className='page-link text-secondary' onClick={prevPage}>
                        Previos Page
                    </a> */}
                    <p onClick={prevPage} className="px-3 py-1 rounded mx-3" style={{color:"white", cursor:"pointer", backgroundColor:"#be2046"}}>
                        Prev
                    </p>
                </li>
            {
                pageNumbers?.map(pgNumber => (
                    <li key={pgNumber} >
                        <p className={`page-item mx-1 px-3 py-1 ${currentPage == pgNumber ? 'active' : ''} `} 
                           style={{cursor: "pointer", boxShadow:"1px 1px 2px gray"}}
                           onClick={()=>handlePaginationPage(pgNumber)}>
                             {pgNumber}
                        </p>
                            
                    </li>
                ))
            }

            <li className='page-item'>
                <p onClick={nextPage} className="px-3 py-1 rounded mx-3" style={{color:"white", cursor:"pointer", backgroundColor:"#be2046"}}>
                    Next
                </p>
                {/* <a className="page-link text-secondary" onClick={nextPage} href="#">
                    Next
                </a> */}
            </li>
            </ul>
        </nav>
    </>
   
  )
}

export default Pagination
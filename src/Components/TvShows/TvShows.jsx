import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

export default function TvShows() {

    const [tv, setTv] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    let pageList = new Array(15).fill('x').map((ele, i) => i + 1);

    const getTv = async () => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=26357cbc916cdded8bdec4976f49936a&page=${currentPage}`);
        setTv(data.results);
        console.log(data.results);
        setIsLoading(false);
    };

    useEffect(() => {
        setIsLoading(true);
        getTv(1);
    }, [currentPage]);


    const onPaginate = (page) => {
        setCurrentPage(page);
        setIsLoading(true);
        getTv(page);
    };

    const nextPage = () => {
        setIsLoading(true);
        setCurrentPage(currentPage + 1);
    };
    const prevPage = () => {
        setIsLoading(true);
        setCurrentPage(currentPage - 1);
    };
    return (
        <div className='container py-5'>
            <div className="row">
                {/* <input type="text" onChange={searchTv} className='mb-3 form-control bg-dark text-white' placeholder='Search...' /> */}
                {isLoading ? <Loading /> :
                    tv.filter((data) => (data.poster_path !== null && data.vote_average !== 0))
                        .map((data, id) => <Item key={id} data={data} />)}
            </div>
            <nav className='d-flex justify-content-center py-5' aria-label="Page navigation example">
                <ul className="pagination">
                    {currentPage > 1 ? <li onClick={() => prevPage()} className="page-item"><Link className="page-link" to="#">Previous</Link></li> : ''}

                    {pageList.map((page) => <li key={page} onClick={() => onPaginate(page)} className="page-item"><Link className="page-link" to="#">{page}</Link></li>)}

                    {currentPage < 15 ? <li onClick={() => nextPage()} className="page-item"><Link className="page-link">Next</Link></li> : ''}
                </ul>
            </nav>
        </div>
    );
}

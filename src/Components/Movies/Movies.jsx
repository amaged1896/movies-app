import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

export default function Movies() {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    let pageList = new Array(15).fill('x').map((ele, i) => i + 1);
    let getMovies = async (mediaType) => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=26357cbc916cdded8bdec4976f49936a&page=${currentPage}`);
        // console.log(data.results);
        setMovies(data.results);
        setIsLoading(false);
    };
    // display results first time 
    useEffect(() => {
        getMovies("movie", setMovies);
    }, []);

    // pagination
    const onPaginate = (page) => {
        setCurrentPage(page);
        setIsLoading(true);
        getMovies("movie");
    };

    const nextPage = () => {
        setIsLoading(true);
        setCurrentPage(currentPage + 1);
        getMovies("movie");
    };
    const prevPage = () => {
        setIsLoading(true);
        setCurrentPage(currentPage - 1);
        getMovies("movie");
    };

    return (
        <div className="container py-5">
            <div className="row">
                {isLoading ? <Loading /> : movies?.filter((movie) => movie.vote_average !== 0 && movie.poster_path).map((movie) => <Item key={movie.id} data={movie} />)}
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

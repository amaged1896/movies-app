import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';

export default function Movies() {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    let getMovies = async (mediaType, destination) => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=26357cbc916cdded8bdec4976f49936a`);
        // console.log(data.results);
        destination(data.results);
        setIsLoading(false);
    };

    // const searchMovie = async (e) => {
    //     if (e.target.value) {
    //         let { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=26357cbc916cdded8bdec4976f49936a&language=en-US&query=${e.target.value}&page=1&include_adult=false`);
    //         setMovies(data.results);
    //         setIsLoading(false);
    //     } else {
    //         getMovies("movie", setMovies);
    //     }
    // };

    useEffect(() => {
        getMovies("movie", setMovies);
    }, []);


    return (
        <div className="container py-5">
            <div className="row">
                {/* <input type="text" onChange={searchMovie} className='mb-3 form-control bg-dark text-white' placeholder='Search...' /> */}
                {isLoading ? <Loading /> : movies?.filter((movie) => movie.vote_average !== 0 && movie.poster_path).map((movie) => <Item key={movie.id} data={movie} />)}
            </div>
        </div>
    );
}

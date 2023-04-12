import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import Item from '../Item/Item';

const Search = () => {

    const [search, setSearch] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    let getMovies = async (mediaType, destination) => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=26357cbc916cdded8bdec4976f49936a`);
        destination(data.results);
        setIsLoading(false);
    };

    const searchMovie = async (e) => {
        if (e.target.value) {
            setIsLoading(true);
            let { data } = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=26357cbc916cdded8bdec4976f49936a&language=en-US&query=${e.target.value}&page=1&include_adult=false`);
            // console.log(data);
            setSearch(data.results);
            setIsLoading(false);
        } else {
            getMovies("movie", setSearch);
        }
    };

    useEffect(() => {
        getMovies("movie", setSearch);
    }, []);
    return (
        <div className="container py-5">
            <div className="row">
                <input type="text" onChange={searchMovie} className='mb-3 form-control bg-dark text-white' placeholder='Search...' />
                {isLoading ? <Loading /> : search?.filter((movie) => movie.vote_average !== 0 && movie.poster_path).map((movie) => <Item key={movie.id} data={movie} />)}
            </div>
        </div>
    );
};

export default Search;
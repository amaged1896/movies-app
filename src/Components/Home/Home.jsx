import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Offline } from 'react-detect-offline';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';
import DetectOffline from './../DetectOffline/DetectOffline';

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [TvShows, setTvShows] = useState([]);
    const [people, setPeople] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    let getTrending = async (mediaType, destination) => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=26357cbc916cdded8bdec4976f49936a`);
        // console.log(data.results);
        setIsLoading(true);
        destination(data.results);
        // console.log(data);
        setIsLoading(false);
    };

    useEffect(() => {
        getTrending("movie", setMovies);
        getTrending("tv", setTvShows);
        getTrending("person", setPeople);
    }, []);
    // console.log(people);
    return (
        <div className="container py-5">

            <Offline><DetectOffline /></Offline>
            {isLoading ? <Loading /> : <>

                <div className="row py-4">
                    <div className="col-md-4 ">
                        <div className="content d-flex justify-content-center flex-column h-100">
                            <h2 className='position-relative'>Trending <br />Movies<br />To Watch</h2>
                            <p className='text-muted'>Watch them now on our app</p>
                        </div>
                    </div>
                    {movies?.filter((movie) => movie.vote_average !== 0).slice(1, 11).map((movie) => <Item key={movie.id} data={movie} />)}
                </div>
                <div className="row py-4">
                    <div className="col-md-4 ">
                        <div className="content d-flex justify-content-center flex-column h-100">
                            <h2 className='position-relative'>Trending <br />Tv<br />To Watch</h2>
                            <p className='text-muted'>Watch them now on our app</p>
                        </div>
                    </div>
                    {TvShows?.filter((tv) => tv.vote_average !== 0).slice(1, 11).map((movie) => <Item key={movie.id} data={movie} />)}
                </div>
                <div className="row py-4">
                    <div className="col-md-4">
                        <div className="content d-flex justify-content-center flex-column h-100">
                            <h2 className='position-relative'>Trending <br />People<br />To Watch</h2>
                            <p className='text-muted'>Watch them now on our app</p>
                        </div>
                    </div>
                    {people?.filter((person) => person.profile_path !== null).slice(1, 11).map((person) => <Item key={person.id} data={person} />)}
                </div>
            </>}
        </div>
    );
}

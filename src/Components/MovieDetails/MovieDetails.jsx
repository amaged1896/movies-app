import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './../Loading/Loading';

export default function MovieDetails() {
    const [details, setDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    let { id, type } = useParams();
    // console.log(id);

    const getDetails = async () => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=26357cbc916cdded8bdec4976f49936a`);
        // console.log(data);
        setDetails(data);
        setIsLoading(false);
    };

    useEffect(() => {
        getDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="container py-5">
                <div className="row">
                    {isLoading ? <Loading /> : <>

                        {details?.poster_path ? <div className="col-md-3">
                            <img src={"https://image.tmdb.org/t/p/w500" + details?.poster_path} className="w-100" alt="" />
                        </div> : <div className="col-md-3">
                            <img src={"https://image.tmdb.org/t/p/w500" + details?.profile_path} className="w-100" alt="" />
                        </div>}

                        <div className="col-md-9">
                            {details?.genres ? <div key={id} className="item">
                                <h1>{details?.title} {details?.name}</h1>
                                <p>{details?.tagline}</p>
                                <ul className='list-unstyled d-flex'> {details?.genres?.map((genre, id) => {
                                    return <div key={id} className='bg-info p-3 mx-2 rounded-2'>{genre.name}</div>;
                                })}</ul>
                                <p>Vote : {details?.vote_average?.toFixed(1)}</p>
                                <p>Vote Count : {details?.vote_count}</p>
                                <p>Popularity : {details?.popularity}</p>
                                <p>Release Date : {details?.release_date}</p>
                                <p>{details?.overview}</p>
                            </div>
                                :
                                <div key={id} className="item">
                                    <h1>{details?.name}</h1>
                                    <p>{details?.place_of_birth}</p>
                                    <p>Birth Day : {details?.birthday}</p>
                                    <p>Department : {details?.known_for_department}</p>
                                    <p>Popularity : {details?.popularity}</p>
                                    <p>{details?.biography.split(' ').splice(0, 215).join(' ')}</p>
                                </div>
                            }
                        </div>
                    </>}
                </div>
            </div>

        </>
    );
}

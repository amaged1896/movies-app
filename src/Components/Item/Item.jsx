import React from 'react';
import { Link } from 'react-router-dom';


export default function Item({ data, id }) {
    // eslint-disable-next-line no-lone-blocks
    // data?.episode_run_time ? data.media_type = 'tv' : data.media_type = 'movie';
    data.media_type = data.media_type ? data.media_type : 'tv';
    // if (data?.episode_run_time ? data.media_type = 'tv' : data.media_type = 'movie')

    return (
        <>
            <div className="col-md-2 col-xs-4 col-sm-4 position-relative ">
                <div key={id} className="item position-relative overflow-hidden">

                    {
                        data?.poster_path ? <img src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} className="w-100" alt="" />
                            :
                            <img src={"https://image.tmdb.org/t/p/w500" + data?.profile_path} className="w-100" alt="" />
                    }
                    <Link to={`/details/${data?.id}/${data?.media_type}`}>
                        {data?.overview ? <div className="overlay text-white text-center d-flex align-items-center">
                            {data?.overview?.split(' ').splice(0, 10).join(' ')}
                        </div> : <div className="overlay text-white text-center opacity-0 d-flex align-items-center">
                            {data?.overview?.split(' ').splice(0, 10).join(' ')}
                        </div>}
                    </Link>
                    {data?.vote_average && <div className="vote bg-primary p-1 rounded position-absolute top-0 end-0">{data?.vote_average?.toFixed(1)}</div>}
                </div>
                <h1 className='title text-center'>{data?.title} {data?.name}</h1>

            </div>
        </>
    );
}

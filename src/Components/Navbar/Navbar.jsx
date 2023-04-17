import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ userData, logout }) {

    return (
        <nav className="navbar  z-index navbar-expand-lg bg-dark navbar-dark py-3">
            <div className="container-fluid">
                <Link className="navbar-brand" to="">Noxe</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* left ul */}
                    {userData ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="movies">Movies</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="tvShows">TvShows</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="search">Search</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="about">About</Link>
                        </li>
                    </ul> : ''}

                    {/* left ul */}
                    <div className='d-flex ms-auto align-items-center'>
                        {/* navbar icons */}
                        <ul className='list-unstyled d-flex mb-0 me-3'>
                            <li className='mx-1'>
                                <i className='fab fa-facebook'></i>
                            </li>
                            <li className='mx-1'>
                                <i className='fab fa-twitter'></i>
                            </li>
                            <li className='mx-1'>
                                <i className='fab fa-youtube'></i>
                            </li>
                            <li className='mx-1'>
                                <i className='fab fa-instagram'></i>
                            </li>
                        </ul>
                        {/* navbar icons */}
                        {/* right ul */}
                        <ul className="navbar-nav  mb-2 mb-lg-0">
                            {userData ?
                                <>
                                    <li className="nav-item cursor-pointer">
                                        <Link to="profile" className="nav-link active" aria-current="page" >{userData.first_name}</Link>
                                    </li>
                                    <li className="nav-item cursor-pointer">
                                        <span className="nav-link active btn pointer p-1" aria-current="page" onClick={logout} >Logout</span>
                                    </li>
                                </> : <>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="register">Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="login">Login</Link>
                                    </li>
                                </>}
                        </ul>
                        {/* right ul */}
                    </div>

                </div>
            </div>
        </nav>

    );
}

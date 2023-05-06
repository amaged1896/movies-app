import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

function MyNavbar({ userData, logout }) {
    const [expanded, setExpanded] = useState(false);

    const handleNavClick = () => {
        setExpanded(false);
    };

    return (
        <Navbar className="navbar z-index navbar-expand-lg bg-dark navbar-dark py-3" expanded={expanded} expand="lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="">Noxe</Link>
                <Navbar.Toggle className='ml-auto' aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="ms-auto" onClick={handleNavClick}>
                        {/* left ul */}
                        {userData ? <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                            <li className="nav-item" >
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
                            {/* <li className="nav-item">
                            <SocialMedia />
                        </li> */}
                        </ul> : ''}

                        {/* left ul */}
                        <div className='d-flex ms-auto align-items-center'>

                            {/* right ul */}
                            <ul className="navbar-nav  mb-2 mb-lg-0">
                                {userData ?
                                    <>
                                        <li className="nav-item cursor-pointer m-0">
                                            <Link to="profile" className="nav-link active" aria-current="page" >{userData.first_name}</Link>
                                        </li>
                                        <li className="nav-item  cursor-pointer">
                                            <span className="nav-link logout active btn pointer p-1" aria-current="page" onClick={logout} >Logout</span>
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
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default MyNavbar;
import React from 'react';

const AboutPage = () => {
    return (
        <div className="container">
            <div className="row py-5">
                <div className="col-md-6">
                    <img src="https://via.placeholder.com/500x300" className="img-fluid" alt="About Us" />
                </div>
                <div className="col-md-6">
                    <h1>About Us</h1>
                    <p>
                        We are a team of movie enthusiasts who are passionate about bringing the best movie experience to our users.
                    </p>
                    <p>
                        Our mission is to provide a comprehensive platform that allows users to browse and discover movies, and to create a community around their love for movies.
                    </p>
                    <p>
                        We believe that movies are a powerful medium for storytelling, and we want to empower users to explore the rich and diverse world of cinema.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;

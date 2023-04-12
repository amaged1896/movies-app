import React from 'react';

export default function Profile({ userData }) {
    return (
        <div className='container'>
            <div className="row">
                <div className='py-5'>
                    <h2>Name : {userData?.first_name} {userData?.last_name}</h2>
                    <h2>Email : {userData?.email}</h2>
                    <h2>Age : {userData?.age}</h2>
                </div>
            </div>
        </div>
    );
}

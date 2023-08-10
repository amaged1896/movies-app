import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

export default function Login({ saveUser }) {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [validationError, setValidationError] = useState([]);
    const [apiError, setApiError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();


    const getUserData = (e) => {
        // console.log(e.target.name);
        let addedUser = { ...user };
        addedUser[e.target.name] = e.target.value;
        setUser(addedUser);
    };

    useEffect(() => {
        // console.log(user);
    }, [user]);

    const login = async (e) => {
        e.preventDefault();

        if (validateUser()) {
            // success
            setIsLoading(true);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, user);
            // console.log(data);
            if (data.message == 'success') {
                // set token in localStorage and navigate to home page
                localStorage.setItem("token", data.token);
                saveUser();
                navigate('/');
                setIsLoading(false);
                setApiError(null);
            } else {
                // error
                setApiError('Invalid email or password');
                setIsLoading(false);
            }
        }
    };

    const validateUser = () => {
        let schema = Joi.object({

            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).required().messages({
                "string.empty": "Email is Required"
            }),
            password: Joi.string().pattern(new RegExp(/^[A-Z][A-Za-z0-9]{3,30}$/)).required().messages({
                "string.empty": "Password is Required",
                "string.min": "You password must be more than 3 characters",
                "string.pattern.base": "Password must start with an uppercase letter and 3 - 30 characters",
            }),
        });
        let res = schema.validate(user, { abortEarly: false });
        // console.log(res);
        if (res.error) {
            setValidationError(res.error.details);
            return false;
        } else {
            return true;
        }
    };

    return (
        <>
            <div className="container">
                <div className="mx-auto w-75">
                    <h2 className='mt-5 mb-4'>Login In</h2>
                    {apiError && <div className='alert alert-danger'>{apiError}</div>}
                    {/* {validationError.map((ele) => {
                        return <div className="alert alert-danger">{ele.message}</div>;
                    })} */}
                    <form onSubmit={(e) => login(e)}>

                        <div className="form-group mb-3">
                            <label htmlFor="">Email :</label>
                            <input onChange={(e) => getUserData(e)} type="email" id="email" name='email' className={validationError.filter(ele => ele.context.label == "email")[0] ? "border-danger form-control" : 'form-control'} />
                            {validationError.filter(ele => ele.context.label == "email")[0]?.message}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="">Password :</label>
                            <input onChange={(e) => getUserData(e)} type="password" id="password" name='password' className={validationError.filter(ele => ele.context.label == "password")[0] ? "border-danger form-control" : 'form-control'} />
                            {validationError.filter(ele => ele.context.label == "password")[0]?.message}
                        </div>

                        <button className="btn btn-info d-flex ms-auto">
                            {isLoading ? <i className='fa fa-spinner fa-spin'></i> : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

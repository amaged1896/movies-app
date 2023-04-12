import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const getUserData = (e) => {
        // console.log(e.target.name);
        let addedUser = { ...user };
        addedUser[e.target.name] = e.target.value;
        setUser(addedUser);
    };

    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        age: 0,
        email: '',
        password: '',
    });
    const [validationError, setValidationError] = useState([]);

    const [apiError, setApiError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        console.log(user);
    }, [user]);

    const register = async (e) => {
        e.preventDefault();

        if (validateUser()) {
            // success
            setIsLoading(true);
            let { data } = await axios.post(`https://route-movies-api.vercel.app/signup`, user);
            console.log(data);
            if (data.message == 'success') {
                // navigate to login page
                navigate('/login');
                setIsLoading(false);
                setApiError(null);
            } else {
                // error
                setApiError('Email already registered');
                setIsLoading(false);
            }
        }
    };

    const validateUser = () => {
        let schema = Joi.object({
            first_name: Joi.string().min(3).max(10).required().messages({
                "string.empty": "First Name is Required",
                "string.min": "You have to enter more than 3 characters",
                "string.max": "First Name should be max 10 characters"
            }),
            last_name: Joi.string().min(3).max(10).required().messages({
                "string.empty": "Last Name is Required",
                "string.min": "You have to enter more than 3 characters",
                "string.max": "Last Name should be max 10 characters"
            }),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).required().messages({
                "string.empty": "Email is Required"
            }),
            password: Joi.string().pattern(new RegExp(/^[A-Z][A-Za-z0-9]{3,30}$/)).required().messages({
                "string.empty": "Password is Required",
                "string.min": "You password must be more than 3 characters",
                "string.pattern.base": "Password must start with an uppercase letter and 3 - 30 characters",
            }),
            age: Joi.number().min(16).max(61).required().messages({
                "string.empty": "Age is Required and must be a number",
                "number.min": "Age must be greater than or equal to 16",
                "number.max": "Age must be less than or equal to 60",
                "string.max": "Last Name should be max 10 characters"
            }),
        });
        let res = schema.validate(user, { abortEarly: false });
        console.log(res);
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
                    <h2 className='mt-5 mb-4'>Registeration Form</h2>
                    {apiError && <div className='alert alert-danger'>{apiError}</div>}
                    {/* {validationError.map((ele) => {
                        return <div className="alert alert-danger">{ele.message}</div>;
                    })} */}
                    <form onSubmit={(e) => register(e)}>
                        <div className="form-group mb-3">
                            <label htmlFor="">First Name</label>
                            <input onChange={(e) => getUserData(e)} type="text" id="first_name" name='first_name' className={validationError.filter(ele => ele.context.label == "first_name")[0] ? "border-danger form-control" : 'form-control'} />
                            {validationError.filter(ele => ele.context.label == "first_name")[0]?.message}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="">Last Name</label>
                            <input onChange={(e) => getUserData(e)} type="text" id="last_name" name='last_name' className={validationError.filter(ele => ele.context.label == "last_name")[0] ? "border-danger form-control" : 'form-control'} />
                            {validationError.filter(ele => ele.context.label == "last_name")[0]?.message}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="">Email</label>
                            <input onChange={(e) => getUserData(e)} type="email" id="email" name='email' className={validationError.filter(ele => ele.context.label == "email")[0] ? "border-danger form-control" : 'form-control'} />
                            {validationError.filter(ele => ele.context.label == "email")[0]?.message}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="">Password</label>
                            <input onChange={(e) => getUserData(e)} type="password" id="password" name='password' className={validationError.filter(ele => ele.context.label == "password")[0] ? "border-danger form-control" : 'form-control'} />
                            {validationError.filter(ele => ele.context.label == "password")[0]?.message}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="">Age</label>
                            <input onChange={(e) => getUserData(e)} type="number" id="age" name='age' className={validationError.filter(ele => ele.context.label == "age")[0] ? "border-danger form-control" : 'form-control'} />
                            {validationError.filter(ele => ele.context.label == "age")[0]?.message}
                        </div>
                        <button className="btn btn-info d-flex ms-auto">
                            {isLoading ? <i className='fa fa-spinner fa-spin'></i> : "Sign up"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

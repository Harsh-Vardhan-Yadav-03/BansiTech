import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../store/auth.jsx';
import { toast } from 'react-toastify';


const URL ="http://localhost:5000/api/auth/register";


const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate(); 
    const { storeTokenInLs } = useAuth();

    const [errorMessage, setErrorMessage] = useState('');

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email.includes('@')) {
            setErrorMessage('Invalid email format');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        alert('Registration Successful!');
        setErrorMessage('');

        console.log("Sending form data:", formData);

        // backend part , here we are fetching data or posting data from database
        try {
            const response = await fetch( URL,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const res_data =  await response.json();
            console.log("res from server", res_data);

            if(response.ok){
                // storing  the token in localstorage
                storeTokenInLs(res_data.token);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '' 
                })
                toast.success("Registeration Successful");
                navigate("/login");
            } else{
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }

        } 
        catch (error) {
            console.error(" register ", error);
            }     
    };

    return (
        <section>
            <main>
                <div className="section-registration">
                    <div className="container1 grid grid-two-cols">
                        <div className="registration-image">
                            <img src="./public/images/registration-image.webp" alt="Thank you for registration" />
                        </div>
                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Registration Form</h1>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" id="firstName" name="firstName" placeholder="Enter first name" required autoComplete="off"
                                        value={formData.firstName}
                                        onChange={handleInput}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" id="lastName" name="lastName" placeholder="Enter last name" required autoComplete="off"
                                        value={formData.lastName}
                                        onChange={handleInput}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" placeholder="Enter your email" required autoComplete="off"
                                        value={formData.email}
                                        onChange={handleInput} />
                                </div>

                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" name="password" placeholder="Enter password" required autoComplete="off"
                                        value={formData.password}
                                        onChange={handleInput} />
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" required autoComplete="off"
                                        value={formData.confirmPassword}
                                        onChange={handleInput} />
                                </div>

                                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                <button type="submit" className="btn btn-submit">Register Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
};

export default Register;



import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:5000/api/auth/login";

const Login = () => {
    const [username, setUsername] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
        // console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUsername({
            ...username,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
             const response = await fetch( URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(username), 
             })

             console.log("login form" , response);

             if( response.ok){
                setUsername({ email: '', password: '',});
                navigate("/");    
             }else{
                alert("Invalid credential");
                console.log("invalid credential");
             }

        } catch (error) {
            console.log(error);
        }
    }

    

    return (
        <section>
            <main>
                <div className="section-login">
                    <div className="container grid grid-two-cols">
                        <div className="login-image">

                        </div>
                        <div className="login-form">
                            <h1 className="main-heading mb-3">Login Form</h1>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email">email</label>
                                    <input type="text" id="email" name="email" placeholder="enter your email" required autoComplete="off"
                                        value={username.email}
                                        onChange={handleInput} />
                                </div>

                                <div>
                                    <label htmlFor="password">password</label>
                                    <input type="password" id="password" name="password" placeholder="enter password" required autoComplete="off"
                                        value={username.password}
                                        onChange={handleInput} />
                                </div>
                                <br />

                                <button type="submit" className="btn btn-submit">Login Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Login
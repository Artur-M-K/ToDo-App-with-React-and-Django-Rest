import React from 'react';
import './Login.css';

function Login() {
    return (
        <div className="login-container mb-3">
            <h1>Login</h1>
            <form action="">
                <div className="form-floating mb-3">
                <label for="floatingInput" >Name:</label>
                <input type="text" id="floatingInput" className="form-control" placeholder="Name"/>
                </div>
                <div className="form-floating mb-3">
                <label for="floatingPassword">Password:</label>
                <input type="password" id="floatingPassword" className="form-control" placeholder="Password"/>
                </div>
                <div>
                <button type="submit" className="btn btn-outline-danger btn-lg float-right btn-login">Submit</button>
                </div>
                <p>Do not have an account, please <a href="/register"><strong>REGISTER</strong></a></p>
            </form>
        </div>
    )
}

export default Login

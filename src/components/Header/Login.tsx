import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const Login: React.FC = () => {
    interface User {
        firstName?: string;
        lastName?: string;
        email: string;
        username: string;
        password: string;
    }

    const [username, setUsername] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');
    const [userCreds, setUserCreds] = useState<string>('');


    const dispatch = useDispatch();


    const register = (): void => {
        axios
            .post<User>('/api/auth/register', { username, first_name: firstName, last_name: lastName, email, password })
            .then((res) => {
                const user = res.data;
                dispatch({ type: 'UPDATE_USER', action: user });
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
            })
            .catch((err) => {
                console.log(err.response.data);
                if (err.response.data === 'email') {
                    toast.error(
                        'An account with the email you entered already exists in our database. Please log in using your email and password or create a new account using a different email.',
                    );
                } else if (err.response.data === 'username') {
                    toast.error(
                        'An account with the username you entered already exists in our database. Please log in using your email and password or create a new account using a different username.',
                    );
                } else if (err.response.data === 'incomplete') {
                    toast.error('Please enter at least an email, username and password to continue.');
                } else {
                    toast.error(
                        'A problem was encountered while attempting to create your new account. Please try again later.',
                    );
                }
            });
    };

    const login = (): void => {
        axios
            .post<User>('/api/auth/login', { userCreds, password: loginPassword })
            .then((res) => {
                const user = res.data;
                dispatch({ type: 'UPDATE_USER', action: user });
                setUserCreds("");
                setLoginPassword("");
            })
            .catch((err) => {
                console.log(err.response.data);
                if (err.response.data === 'userCreds') {
                    toast.error(
                        'An account with the email or username you entered does not exist within our database. Please try again or register for an account',
                    );
                } else if (err.response.data === 'password') {
                    toast.error('The password you entered is incorrect, please try again.');
                } else if (err.response.data === 'incomplete') {
                    toast.error('Please enter your email/username and password to continue.');
                } else
                    toast.error(
                        'There was an error while attempting to log you in to your account. Please try again later.',
                    );
            });
    };

    return (
        <>
            <ToastContainer />
            <div className="loginContainer">
                <form
                    onSubmit={(e: React.SyntheticEvent) => {
                        e.preventDefault();
                        register();
                    }}
                    className="register"
                >
                    <h3>register</h3>
                    <label htmlFor="username">username:</label>
                    <input
                        id="username"
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setUsername(e.target.value)}
                    />
                    <br></br>
                    <label htmlFor="firstName">first name:</label>
                    <input
                        id="firstName"
                        value={firstName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setFirstName(e.target.value)}
                    />
                    <br></br>
                    <label htmlFor="lastName">last name:</label>
                    <input
                        id="lastName"
                        value={lastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setLastName(e.target.value)}
                    />
                    <br></br>
                    <label htmlFor="email">email:</label>
                    <input
                        id="email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}
                    />
                    <br></br>
                    <label htmlFor="password">password:</label>
                    <input
                        id="password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)}
                    />
                    <br></br>
                    <button>register</button>
                </form>
                <form
                    onSubmit={(e: React.SyntheticEvent) => {
                        e.preventDefault();
                        login();
                    }}
                    className='login'
                >
                    <h3>login</h3>
                    <label htmlFor="loginEmail">email:</label>
                    <input
                        id="loginEmail"
                        value={userCreds}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setUserCreds(e.target.value)}
                    />
                    <br></br>
                    <label htmlFor="loginPassword">password:</label>
                    <input
                        id="loginPassword"
                        value={loginPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setLoginPassword(e.target.value)}
                    />
                    <br></br>
                    <button>login</button>
                </form>
            </div>
        </>
    );
};

export default Login;

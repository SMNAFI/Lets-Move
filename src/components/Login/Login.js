import React, { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';
import firebase from "firebase/app";
import "firebase/auth";
import './Login.css';
import { firebaseConfig } from './firebase.config';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [isNewUser, setIsNewUser] = useState(true);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: ''
    });

    const googleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, email } = res.user;
                const newUser = { name: displayName, email };
                setLoggedInUser(newUser);
                history.replace(from);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    const fbSignIn = () => {
        const fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth()
            .signInWithPopup(fbProvider)
            .then(res => {
                const { displayName, email } = res.user;
                const newUser = { name: displayName, email };
                setLoggedInUser(newUser);
                history.replace(from);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    const handleSubmit = event => {
        if (isNewUser && user.email && user.password && user.confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(() => {
                    const newUser = { name: user.name, email: user.email };
                    setLoggedInUser(newUser);
                    history.replace(from);
                    updateUser(user.name);
                })
                .catch(error => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
        }
        if (!isNewUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    const { displayName, email } = userCredential.user;
                    const newUser = { name: displayName, email };
                    setLoggedInUser(newUser);
                    history.replace(from);
                    const currentUser = { ...user };
                    currentUser.error = '';
                    setUser(currentUser);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    const newUser = { ...user };
                    newUser.error = errorMessage;
                    setUser(newUser);
                });
        }
        event.preventDefault();
    }

    const updateUser = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log('Updated successfully!');
        }).catch(function (error) {
            console.log('There was an error.', error);
        });
    }

    const handleChange = event => {
        let isFieldValid = true;
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            isFieldValid = event.target.value.length >= 6 && /\d{1}/.test(event.target.value);
        }
        if (event.target.name === 'confirmPassword') {
            isFieldValid = event.target.value === user.password;
        }
        if ((!isFieldValid && event.target.value.length) && (event.target.name === 'password' || event.target.name === 'confirmPassword')) {
            const newUser = { ...user };
            newUser.error = 'password invalid';
            setUser(newUser);
        }
        if (isFieldValid) {
            const newUser = { ...user };
            newUser[event.target.name] = event.target.value;
            newUser.error = '';
            setUser(newUser);
        }
    }

    return (
        <div className="login-container">
            <div style={{ border: '1px solid gray', padding: '50px', borderRadius: '5px' }}>
                <h1>{isNewUser ? 'Create an account' : 'Login'}</h1>
                <form onSubmit={handleSubmit}>
                    {
                        isNewUser &&
                        <div>
                            <input onBlur={handleChange} type="text" name="name" placeholder="Name" className="form-input" required />
                        </div>
                    }
                    <div>
                        <input onBlur={handleChange} type="email" name="email" placeholder="Username or Email" className="form-input" required />
                    </div>
                    <div>
                        <input onBlur={handleChange} type="password" name="password" placeholder="Password" className="form-input" required />
                    </div>
                    {
                        isNewUser &&
                        <div>
                            <input onBlur={handleChange} type="password" name="confirmPassword" placeholder="Confirm Password" className="form-input" required />
                        </div>
                    }
                    <p style={{ color: 'red' }}>{user.error}</p>
                    <input type="submit" value={isNewUser ? 'Create an account' : 'Login'} className="form-btn" />
                </form>
                <div style={{ textAlign: 'center' }}>
                    <p>{isNewUser ? 'Already have an account? ' : "Don't have an account? "}
                        <span onClick={() => setIsNewUser(!isNewUser)} className="link-highlighter">
                            {isNewUser ? 'Login' : 'Create an account'}
                        </span>
                    </p>
                </div>
            </div>
            <p>or</p>
            <div style={{ marginBottom: '20px' }}>
                <button className='loginBtn' onClick={googleSignIn}>Continue with Google</button>
            </div>
            <div>
                <button className='loginBtn' onClick={fbSignIn}>Continue with Facebook</button>
            </div>
        </div>
    );
};

export default Login;
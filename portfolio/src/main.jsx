import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router, Routes, Route, Navigate, useHref} from 'react-router-dom';
import Login from "../components/Login/Login.jsx";
import {Dashboard} from "../components/Dashboard/Dashboard.jsx";

const App = () => {

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    const [signedIn, setSignedIn] = useState(null);

    useEffect(()=>{
        const getToken = async () => {
            let codeVerifier = localStorage.getItem('code_verifier');
            const urlParams = new URLSearchParams(window.location.search);
            const authCode = urlParams.get('code');

            const payload = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    client_id: '31a175bc0d4d4adbbb3daaad161ca80d',
                    grant_type: 'authorization_code',
                    code: authCode,
                    redirect_uri: 'http://localhost:5173/app',
                    code_verifier: codeVerifier,
                }),
            }

            const body = await fetch('https://accounts.spotify.com/api/token', payload);
            const response = await body.json();

            console.log(response)

            localStorage.setItem('access_token', response.access_token.toString());
            localStorage.setItem('refresh_token', response.refresh_token.toString());
        }

        const checkAuthentication = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (accessToken) {
                const response = await fetch('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                });
                if (response.ok) {
                    return true;
                }
            }
            return false;
        };

        checkAuthentication().then(result => setSignedIn(result));
        getToken().then(()=>window.location.href = '/')
    },[window.location.search])


    return (
        <React.StrictMode>
            {/*{signedIn && <button onClick={handleLogout}>Log out</button>}*/}
            <Router>
                <Routes>
                    {signedIn ? (
                        <Route path="/*" element={<Dashboard/>}/>
                    ) : (
                        <Route path="/*" element={<Login/>}/>
                    )}
                </Routes>
            </Router>
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router, Routes, Route, Navigate, useHref} from 'react-router-dom';
import Login from "../components/Login/Login.jsx";
import {Dashboard} from "../components/Dashboard/Dashboard.jsx";

const App = () => {

    const [signedIn, setSignedIn] = useState(null);

    useEffect(() => {
        const fetchTokenAndCheckAuthentication = async () => {
            const codeVerifier = localStorage.getItem('code_verifier');
            const urlParams = new URLSearchParams(window.location.search);
            const authCode = urlParams.get('code');

            if (authCode) {
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

                const response = await fetch('https://accounts.spotify.com/api/token', payload);
                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('refresh_token', data.refresh_token);
                } else {
                    console.error('Failed to fetch access token:', data.error);
                }
            }

            const isAuthenticated = await checkAuthentication();
            setSignedIn(isAuthenticated);
        };

        const checkAuthentication = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (accessToken) {
                const response = await fetch('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                });
                return response.ok;
            }
            return false;
        };

        fetchTokenAndCheckAuthentication();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setSignedIn(false);
        window.location.href = '/';
    };


    return (
        <React.StrictMode>
            {signedIn && <button style={{ zIndex:10, background:"rgba(255,255,255,0.23)" ,position:"absolute", top:0, leftt:0}} onClick={handleLogout}>Log out</button>}
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

import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "../components/Login/Login.jsx";
import {Dashboard} from "../components/Dashboard/Dashboard.jsx";
import {Button, Image} from "react-bootstrap";
import logoutIcon from '../assets/icons/logout.svg'
import {CLIENT_SECRET} from "../secret/key.jsx";

export const redirect_uri = 'https://weeklywrapped.netlify.app/'
export const redirectUri_DEV = 'http://localhost:5173/app';

const App = () => {

    const [signedIn, setSignedIn] = useState(null);

    const redirectUri = redirect_uri;
    // const redirectUri = redirectUri_DEV;

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
                        client_id: CLIENT_SECRET,
                        grant_type: 'authorization_code',
                        code: authCode,
                        redirect_uri: redirectUri,
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
            console.log('Access Token:', accessToken);

            if (accessToken) {
                try {
                    const response = await fetch('https://api.spotify.com/v1/me', {
                        headers: {
                            Authorization: 'Bearer ' + accessToken
                        }
                    });

                    const data = await response.json();
                    console.log('Response Data:', data);

                    if (!response.ok) {
                        console.error('Failed to authenticate:', data.error || 'Unknown error');
                    }

                    return response.ok;
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    return false;
                }
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
            {signedIn &&
                <Button style={{background: "rgba(255,255,255,0)" ,zIndex: 999, position: "absolute", top: -1, right:0}} onClick={handleLogout}>
                    <Image draggable={false} style={{padding: 5,borderRadius: "50%",background: "rgba(255,255,255,0.16)"}} src={logoutIcon}/>
                </Button>}
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

import {useEffect} from "react";
import axios from "axios";

export const Banner = () => {
    const CLIENT_ID = '31a175bc0d4d4adbbb3daaad161ca80d';
    const CLIENT_SECRET = 'b41922e5d7dc4544b62e62671869c1ba';
    const REDIRECT_URI = 'home';
    const authorizationCode = 'authorization_code_received_from_redirect';

    const data = {
        grant_type: 'authorization_code',
        code: authorizationCode,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
    };
    useEffect(() => {
        const getToken = async () => {
            axios.post('https://accounts.spotify.com/api/token', data)
                .then(response => {
                    const accessToken = response.data.access_token;
                    console.log('Access token:', accessToken);
                })
                .catch(error => {
                    console.error('Error exchanging authorization code for access token:', error);
                });
        }
        getToken();
    }, [])
    return (
        <div>

        </div>
    )
}
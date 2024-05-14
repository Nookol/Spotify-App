import { useEffect } from "react";
import axios from "axios";

const Login = () => {

    const CLIENT_ID = '31a175bc0d4d4adbbb3daaad161ca80d';
    const REDIRECT_URI = 'http://localhost:3000/callback';

    const handleLogin = () => {
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=user-read-private%20user-read-email`;
    };

    useEffect(() => {
        const handleAuthorization = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const authorizationCode = urlParams.get('code');

            if (authorizationCode) {
                const data = {
                    grant_type: 'authorization_code',
                    code: authorizationCode,
                    redirect_uri: REDIRECT_URI,
                    client_id: CLIENT_ID,
                };

                try {
                    const response = await axios.post('http://localhost:3000/login', data);
                    const accessToken = response.data.access_token;
                    console.log('Access token:', accessToken);
                } catch (error) {
                    console.error('Error exchanging authorization code for access token:', error);
                }
            }
        };

        handleAuthorization();
    }, [CLIENT_ID, REDIRECT_URI]);

    return (
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
            <h1>See How You Listen</h1>
            {/*<img height={100} src={"https://banner2.cleanpng.com/20190414/wia/kisspng-spotify-portable-network-graphics-clip-art-compute-5cb33439c9cd98.1004452415552481858266.jpg"} alt={"Spotify Logo"}/>*/}
            <button onClick={handleLogin}>Log in with Spotify</button>
        </div>
    );
};

export default Login;

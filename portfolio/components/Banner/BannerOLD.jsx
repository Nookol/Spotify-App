import {useEffect} from "react";
import axios from "axios";

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

export const Banner = () => {
    let user_id = "fvs56kzukl2czhljdrka80fhh"
    let accessToken = "31a175bc0d4d4adbbb3daaad161ca80d"
    let URL = `https://api.spotify.com/v1/users/${user_id}`
    useEffect(() => {
        async function getProfile(accessToken) {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            });

            const data = await response.json();
            console.log(data)
        }

        async function getToken(accessToken) {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            });

            const data = await response.json();
            console.log(data)
        }


        getProfile(accessToken)
    }, [])
    return (
        <div>

        </div>
    )
}
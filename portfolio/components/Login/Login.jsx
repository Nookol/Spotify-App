export const Login = () => {

    const generateRandomString = (length) => {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    }

    const sha256 = async (plain) => {
        const encoder = new TextEncoder()
        const data = encoder.encode(plain)
        return window.crypto.subtle.digest('SHA-256', data)
    }

    const base64encode = (input) => {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    }


    const handleLogin = async () =>{
        const codeVerifier  = generateRandomString(64);
        const hashed = await sha256(codeVerifier)
        const codeChallenge = base64encode(hashed);

        const clientId = '31a175bc0d4d4adbbb3daaad161ca80d';
        const redirectUri = 'http://localhost:5173/app';

        const scope = 'user-read-private user-read-email user-library-read playlist-read-private playlist-read-collaborative user-top-read user-read-recently-played';
        const authUrl = new URL("https://accounts.spotify.com/authorize")

        window.localStorage.setItem('code_verifier', codeVerifier);

        const params =  {
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: redirectUri,
        }

        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
    }


    return (
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
            <h1>See How You Listen</h1>
            <button onClick={handleLogin}>Log in with Spotify</button>
        </div>
    );
};

export default Login;

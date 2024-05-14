const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = 3000;app.use(express.json());
app.use(cors());

// Spotify API credentials
const CLIENT_ID = '31a175bc0d4d4adbbb3daaad161ca80d';
const CLIENT_SECRET = 'b41922e5d7dc4544b62e62671869c1ba';
const REDIRECT_URI = 'http://localhost:3000/callback';

// Route for initiating Spotify login
app.get('/login', (req, res) => {
    res.redirect(`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=user-read-private%20user-read-email`);
});
app.get('/callback', async (req, res) => {
    const authorizationCode = req.query.code;
    console.log(authorizationCode)

    if (!authorizationCode) {
        return res.status(400).json({error: 'Authorization code not found'});
    }

    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            {
                grant_type: 'authorization_code',
                code: authorizationCode,
                redirect_uri: REDIRECT_URI,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        const accessToken = response.data.access_token;
        console.log("token", accessToken);
        res.redirect(`http://localhost:5173/app/${accessToken}`);
    } catch (error) {
        console.error('Error exchanging authorization code for access token:', error);
        res.status(500).json({error: 'Internal server error'});
        res.redirect(`http://localhost:5173/login/err`);
    }


});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

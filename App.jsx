// import {useEffect, useState} from 'react';
// import {WelcomeBanner} from "../components/Welcome/WelcomeBanner.jsx";
// import {Dashboard} from "../components/Dashboard/Dashboard.jsx";
//
// export const App = () => {
//     const [userProfile, setUserProfile] = useState({
//         username: "",
//         userId: "",
//         profilePic: ""
//     });
//     const [loadDash, setLoadDash] = useState(false);
//
//     useEffect(() => {
//         export const getToken = async () => {
//
//             let codeVerifier = localStorage.getItem('code_verifier');
//             const urlParams = new URLSearchParams(window.location.search);
//             const authCode = urlParams.get('code');
//
//             const payload = {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//                 body: new URLSearchParams({
//                     client_id: '31a175bc0d4d4adbbb3daaad161ca80d',
//                     grant_type: 'authorization_code',
//                     code: authCode,
//                     redirect_uri: 'http://localhost:5173/app',
//                     code_verifier: codeVerifier,
//                 }),
//             }
//
//             const body = await fetch('https://accounts.spotify.com/api/token', payload);
//             const response = await body.json();
//
//             console.log(response)
//
//             localStorage.setItem('access_token', response.access_token.toString());
//             localStorage.setItem('refresh_token', response.refresh_token.toString());
//         }
//
//
//        export async function getProfile() {
//             let accessToken = localStorage.getItem('access_token');
//
//             const response = await fetch('https://api.spotify.com/v1/me', {
//                 headers: {
//                     Authorization: 'Bearer ' + accessToken
//                 }
//             });
//
//             if (response.ok){}
//
//             const data = await response.json();
//
//             setUserProfile({
//                 username: data.display_name,
//                 userId: data.id,
//                 profilePic: data.images['1'].url
//             });
//
//             setTimeout(() => {
//                 setLoadDash(true)
//             }, 4000)
//
//         }
//         getToken()
//             .then(() => getProfile())
//     }, [])
//
//     return (
//         <div>
//             <h1>BLAH</h1>
//             {/*{userProfile.username && !loadDash && (*/}
//             {/*    <WelcomeBanner profileImg={userProfile.profilePic} username={userProfile.username}/>*/}
//             {/*)}*/}
//             {/*{loadDash && <Dashboard/>}*/}
//         </div>
//     );
// };

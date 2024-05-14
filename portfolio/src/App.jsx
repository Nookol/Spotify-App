import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WelcomeBanner } from "../components/Welcome/WelcomeBanner.jsx";
import { Dashboard } from "../components/Dashboard/Dashboard.jsx";
import { useSpotifyAPI } from "../SpotifyApi.jsx";

export const App = () => {
    const [userProfile, setUserProfile] = useState({
        username: "",
        userId: "",
        profilePic: ""
    });
    const [loadDash, setLoadDash] = useState(false);
    const { id } = useParams();
    const { data, isLoading, error } = useSpotifyAPI('/me', id);

    useEffect(() => {
        if (data) {
            setUserProfile((prevState) => ({
                ...prevState,
                username: data.display_name,
                id: data.id,
                profilePic: data.images && data.images.length > 0 ? data.images[0].url : ""
            }));
        }
    }, [data]);

    useEffect(() => {
        let timer = 0;
        const interval = setInterval(() => {
            if (timer > 3) {
                clearInterval(interval);
                setLoadDash(true);
            } else {
                timer++;
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {userProfile.username && !loadDash && (
                <WelcomeBanner profileImg={userProfile.profilePic} username={userProfile.username} />
            )}
            {loadDash && <Dashboard token={id} />}
        </div>
    );
};

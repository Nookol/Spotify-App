import { useEffect, useState } from "react";
import { Grow } from "@material-ui/core";
import { WelcomeBanner } from "../Welcome/WelcomeBanner";
import { TopTracks } from "./TopTracks.jsx";
import { TopArtists } from "./TopArtists.jsx";
import { useSpotifyAPI } from "../../SpotifyApi.jsx";

export const Dashboard = () => {
    const [timer, setTimer] = useState(false);
    const [userData, setUserData] = useState(null);

    const { data, isLoading, error } = useSpotifyAPI('/me');

    useEffect(() => {
        if (data) {
            setUserData(data);
        }
    }, [data]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setTimer(true);
        }, 4000);

        return () => clearTimeout(timerId);
    }, []);

    return (
        <>
            {timer ? (
                <Grow in={timer} timeout={1000}>
                    <div style={{ display: "flex", flexDirection: "column", height: '100vh', width: "100vw" }}>
                        <TopTracks />
                        <TopArtists />
                    </div>
                </Grow>
            ) : (
                userData && (
                    <WelcomeBanner
                        username={userData.display_name}
                        profileImg={userData.images && userData.images.length > 0 ? userData.images[0].url : ""}
                    />
                )
            )}
        </>
    );
};

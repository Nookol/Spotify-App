import { Grow } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSpotifyAPI } from "../../SpotifyApi.jsx";

const TopTracks = ({ accessToken }) => {
    const [topTracks, setTopTracks] = useState([]);

    const { data, isLoading, error } = useSpotifyAPI('/me/top-tracks', accessToken);

    useEffect(() => {
        if (data) {
            setTopTracks(data.items);
        }
    }, [data]);


    return (
        <Grow in={!isLoading}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h2>Top Tracks</h2>
                {topTracks.map((track, index) => (
                    <div key={index} style={{ marginBottom: "20px" }}>
                        <img src={track.album.images[0].url} alt={track.name} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
                        <p>{track.name}</p>
                        <p>{track.artists.map(artist => artist.name).join(", ")}</p>
                    </div>
                ))}
            </div>
        </Grow>
    );
};

export default TopTracks;

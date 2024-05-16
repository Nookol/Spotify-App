import { useEffect, useState } from "react";
import { useSpotifyAPI } from "../../SpotifyApi.jsx";
import {Grow} from "@material-ui/core";

export const Dashboard = () => {
    const accessToken = localStorage.getItem('access_token');
    const { data: tracksData, isLoading: tracksLoading, error: tracksError } = useSpotifyAPI('/me/top/tracks', accessToken);
    const { data: artistsData, isLoading: artistsLoading, error: artistsError } = useSpotifyAPI('/me/top/artists', accessToken);
    const [topTracks, setTopTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (tracksData) {
            setTopTracks(tracksData.items);
            console.log(tracksData.items)
        }
        if (artistsData) {
            setTopArtists(artistsData.items);
        }
        if (tracksError) {
            console.log(tracksError);
        }
        if (artistsError) {
            console.log(artistsError);
        }
    }, [tracksData, artistsData, tracksError, artistsError]);

    useEffect(() => {
        if (!tracksLoading && !artistsLoading && topTracks.length > 0 && topArtists.length > 0) {
            setDataLoaded(true);
        }
    }, [tracksLoading, artistsLoading, topTracks, topArtists]);

    return (
        <Grow in={dataLoaded}>
            <div style={{ display: "flex", height: '100vh'}}>
                {topTracks.length > 0 && <TopTracks tracks={topTracks} />}
                <div style={{width: "55vw"}}>
                    <h1>BLAH</h1>
                </div>
                {topArtists.length > 0 && <TopArtists artists={topArtists} />}
            </div>
        </Grow>
    );
};
const TopTracks = ({ tracks }) => {
    return (
        <div style={{ maxWidth:"20vw", background: "#a61a36", padding: "20px", maxHeight: "100vh", overflowY: "hidden" }}>
            <div style={{ height: "20vh", position: "sticky", top: 0, zIndex: 99, padding: "10px 0", textAlign: "center" }}>
                <h1>Your Top Songs</h1>
            </div>
            <div style={{ overflowY: "scroll", maxHeight: "calc(100vh - 230px)" }}>
                <table style={{ width: '100%' }}>
                    <tbody>
                    {tracks.map((track, index) => (
                        <tr key={index}>
                            <td style={{ marginBottom: "30px", height: "30vh", textAlign: "center" }}>
                                <h3>{track.name}</h3>
                                <img onClick={()=>open(track.external_urls.spotify)} width={250} src={track.album.images[0].url} alt={track.album.name} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const TopArtists = ({ artists }) => {
    return (
        <div style={{ maxWidth:"20vw", background: "#a61a36", padding: "20px", maxHeight: "100vh", overflowY: "hidden" }}>
            <div style={{ height: "20vh", position: "sticky", top: 0, zIndex: 99, padding: "10px 0", textAlign: "center" }}>
                <h1>Your Top Artists</h1>
            </div>
            <div style={{ overflowY: "scroll", maxHeight: "calc(100vh - 140px)" }}> {/* Subtract height of title + padding */}
                <table style={{ width: '100%' }}>
                    <tbody>
                    {artists.map((artist, index) => (
                        <tr key={index}>
                            <td style={{ marginBottom: "30px", height: "20vh", textAlign: "center" }}>
                                <h3>{artist.name}</h3>
                                <img onClick={()=>open(artist.external_urls.spotify)} width={250} src={artist.images[0].url} alt={artist.name} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

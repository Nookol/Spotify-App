import {useState, useEffect} from "react";
import {Table} from 'react-bootstrap';
import {useSpotifyAPI} from "../../SpotifyApi.jsx";
import {MenuItem, Select} from "@material-ui/core";

export const TopTracks = () => {
    const [songData, setSongData] = useState([]);
    const [timeRange, setTimeRange] = useState('short_term');
    const endpoint = `/me/top/tracks?time_range=${timeRange}`;
    const {data, isLoading, error} = useSpotifyAPI(endpoint);

    useEffect(() => {
        if (data) {
            setSongData(data.items);
        }
    }, [data, timeRange]);


    return (
        <div style={{display: "flex", alignItems: "center", background: "#d696bb", height: "100%"}}>
            <div style={{padding: 20, display: "flex", flexDirection: "column"}}>
                <h1 style={{width:"100px"}}>Your Top Songs</h1>
                <Select
                    id="timeRangeSelect"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                >
                    <MenuItem value="short_term">4 Weeks</MenuItem>
                    <MenuItem value="medium_term">6 Months</MenuItem>
                    <MenuItem value="long_term">All time</MenuItem>
                </Select>
            </div>
            <div style={{overflowX: "auto"}}>
                <Table striped bordered hover variant="dark">
                    <tbody>
                    <tr>
                        {songData.map((track, index) => (
                            <td key={index} style={{textAlign: "center"}}>
                                <TrackItem track={track}/>
                            </td>
                        ))}
                    </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};


const TrackItem = ({track}) => {

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
                <img
                    onClick={() => open(track.external_urls.spotify)}
                    width={400}
                    height={400}
                    src={track.album.images['0'].url}
                    alt={track.name}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height:"10%"
                    }}
                >
                <audio style={{height:30}} id="audioPlayer" controls>
                    <source src={track.preview_url} type="audio/mpeg" />
                </audio>
                </div>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        backgroundColor: "rgba(214,150,187,0.64)",
                    }}
                >
                    <h3 style={{ margin: 0, padding: 10 }}>
                        {track.name.length < 20 ? track.name : track.name.substring(0, 20)}
                    </h3>
                </div>
            </div>
        </div>
    );
}
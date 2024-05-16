import {useState, useEffect} from "react";
import {MenuItem, Select} from "@material-ui/core";
import {Table} from "react-bootstrap";
import {useSpotifyAPI} from "../../SpotifyApi.jsx";

export const TopArtists = () => {
    const [artistData, setArtistData] = useState([]);
    const [timeRange, setTimeRange] = useState("short_term");
    const endpoint = `/me/top/artists?time_range=${timeRange}`;
    const {data, isLoading, error} = useSpotifyAPI(endpoint);

    useEffect(() => {
        if (data) {
            setArtistData(data.items);
        }
    }, [data]);

    return (
        <div style={{display: "flex", alignItems: "center", background: "#1db954", height: "100%"}}>
            <div style={{padding: 20, display: "flex", flexDirection: "column"}}>
                <h1 style={{width:"100px"}}>Your Top Artists</h1>
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
                <Table>
                    <tbody>
                        <tr>
                            {artistData.map((artist, index) => (
                                <td key={index}>
                                    <ListItem artist={artist} index={index}/>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};


const ListItem = ({artist}) => {
    return (
        <div style={{textAlign: "center"}}>
            <div style={{position: "relative", display: "inline-block"}}>
                <img
                    onClick={() => open(artist.external_urls.spotify)}
                    width={400}
                    height={400}
                    src={artist.images[0].url}
                    alt={artist.name}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        backgroundColor: "rgba(29,185,84,0.45)",
                    }}
                >
                    <h3 style={{margin: 0, padding: 5}}>
                        {artist.name.length < 20 ? artist.name : artist.name.substring(0, 20)}
                    </h3>
                </div>
            </div>
        </div>
    )
}
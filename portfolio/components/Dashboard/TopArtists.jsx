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

    const isMobile = () => {
        return window.matchMedia("(max-width: 600px)").matches;
    };

    const [mobile, setMobile] = useState(isMobile());

    useEffect(() => {
        const handleResize = () => {
            setMobile(isMobile());
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return ((mobile ? (
            <div style={{
                display: "flex",
                flexDirection: 'column',
                alignItems: "center",
                background: "#d696bb",
                height: "100%",
                padding:5
            }}>
                <div style={{padding: 23, display: "flex", flexDirection: "column"}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 15}}>
                        <h1 style={{fontSize: '1.9rem'}}>Top Artists</h1>
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
                </div>
                <div style={{width: '100%', height: '99%', overflowX: 'auto', overflowY: 'hidden'}}>
                    <Table striped bordered hover variant="dark" style={{minWidth: '600px'}}>
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
        ) :
        (<div style={{display: "flex", alignItems: "center", background: "#1db954", height: "100%"}}>
            <div style={{padding: '1vw', display: "flex", flexDirection: "column"}}>
                <h1 style={{width: "10vw"}}>Your Top Songs</h1>
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
        </div>)));
};


const ListItem = ({artist}) => {

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const baseSize = 400;
    const squareSize = width < 600 ? Math.min(width / 1.1, height / 1.1) : baseSize;

    return (
        <div style={{textAlign: "center"}}>
            <div style={{position: "relative", display: "inline-block"}}>
                <img
                    onClick={() => open(artist.external_urls.spotify)}
                    width={squareSize}
                    height={squareSize}
                    src={artist.images[0].url}
                    alt={artist.name}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        backgroundColor: "rgba(14,19,26,0.6)",
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
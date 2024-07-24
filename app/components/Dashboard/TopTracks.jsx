import {useState, useEffect} from "react";
import {Table} from 'react-bootstrap';
import {useSpotifyAPI} from "../../SpotifyApi.jsx";
import {MenuItem, Select} from "@material-ui/core";

const resetAudio = (id) => {
    document.querySelectorAll('audio').forEach(audio => {
        if (audio.id !== id) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
}

export const TopTracks = () => {
    const [songData, setSongData] = useState([]);
    const [timeRange, setTimeRange] = useState('short_term');
    const endpoint = `/me/top/tracks?time_range=${timeRange}`;
    const {data, isLoading, error} = useSpotifyAPI(endpoint);

    useEffect(() => {
        if (data) {
            setSongData(data.items);
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
            background: "#1db954",
            height: "100%",
            padding:5
        }}>
            <div style={{padding: 23, display: "flex", flexDirection: "column"}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 15}}>
                    <h1 style={{fontSize: '1.9rem'}}>Top Tracks</h1>
                    <Select
                        id="timeRangeSelect"
                        value={timeRange}
                        onChange={(e) => {
                            setTimeRange(e.target.value);
                            resetAudio();
                        }}
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
                        {songData.map((track) => (
                            <td key={track.id} style={{textAlign: "center"}}>
                                <TrackItem track={track}/>
                            </td>
                        ))}
                    </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    ) : (
        <div style={{display: "flex", alignItems: "center", background: "#d696bb", height: "100%"}}>
            <div style={{padding: '1vw', display: "flex", flexDirection: "column"}}>
                <h1 style={{width: "10vw"}}>Your Top Songs</h1>
                <Select
                    id="timeRangeSelect"
                    value={timeRange}
                    onChange={(e) => {
                        setTimeRange(e.target.value);
                        resetAudio();
                    }}>
                    <MenuItem value="short_term">4 Weeks</MenuItem>
                    <MenuItem value="medium_term">6 Months</MenuItem>
                    <MenuItem value="long_term">All time</MenuItem>
                </Select>
            </div>
            <div style={{overflowX: "auto"}}>
                <Table striped bordered hover variant="dark">
                    <tbody>
                    <tr>
                        {songData.map((track) => (<td key={track.id} style={{textAlign: "center"}}>
                            <TrackItem track={track}/>
                        </td>))}
                    </tr>
                    </tbody>
                </Table>
            </div>
        </div>)));
};

const TrackItem = ({track}) => {

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

    return (<div style={{textAlign: "center"}}>
        <div style={{position: "relative", display: "inline-block"}}>
            <img
                onClick={() => window.open(track.external_urls.spotify, '_blank')}
                width={squareSize}
                height={squareSize}
                src={track.album.images[0].url}
                alt={track.name}
            />
            <div
                style={{
                    position: "absolute", bottom: 0, left: 0, width: "100%", height: "10%"
                }}
            >
                <audio
                    onPlay={() => resetAudio(track.id)}
                    id={track.id}
                    style={{height: 30}}
                    controls
                >
                    <source src={track.preview_url} type="audio/mpeg"/>
                </audio>
            </div>
            <div
                style={{
                    position: "absolute", top: 0, left: 0, width: "100%", backgroundColor: "rgba(14,19,26,0.6)",
                }}
            >
                <h3 style={{margin: 0, padding: 10}}>
                    {track.name.length < 20 ? track.name : track.name.substring(0, 20)}
                </h3>
            </div>
        </div>
    </div>);
};

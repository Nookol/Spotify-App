import { useState, useEffect } from "react";
import axios from "axios";

export const useSpotifyAPI = (endpoint) => {
    const token = localStorage.getItem('access_token')
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.spotify.com/v1${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data);
            data && console.log(data)
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [endpoint, token]);

    return { data, isLoading, error };
};

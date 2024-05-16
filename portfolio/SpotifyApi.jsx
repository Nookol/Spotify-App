import { useState, useEffect } from "react";
import axios from "axios";

export const useSpotifyAPI = (endpoint, token) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.spotify.com/v1${endpoint}?offset=0&limit=5`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data);
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

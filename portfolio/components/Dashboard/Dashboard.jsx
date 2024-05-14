import { Grow } from "@material-ui/core";
import {useEffect, useState} from "react";
import {useSpotifyAPI} from "../../SpotifyApi.jsx";

export const Dashboard = ( {token} ) => {

    const { data, isLoading, error } = useSpotifyAPI('/me/following?type=artist', token);

    useEffect(() => {
        if (data) {
            console.log(data)
        }
    }, [data]);


    return(
        <Grow in={true}>
            <div style={{display:"flex", justifyContent:"center", placeItems:"center",width:'100vw', height:'100vh', background:"#1aa64b"}}>
                <h1>Dashboard</h1>
            </div>
        </Grow>
    )
}
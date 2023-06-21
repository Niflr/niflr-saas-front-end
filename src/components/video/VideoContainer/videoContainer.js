import { useEffect, useState,memo } from 'react';
import {
box,
Grid,
Paper,
Typography,
Container,
CardMedia,
CardContent,
Card,
Button

} from '@mui/material'
import {connect} from "react-redux";
import VideoElement from '../VideoCard/videoCard';
// import {useStyles} from "./styles";

// actions
import {
    fetchEventList,
} from "../../../actions";



const VideoContainer = (props)=>{ 
    // const classes= useStyles();
    const [videos, setVideos] = useState([]);
    const renderVideos =(videos) =>{
        console.log("checking videos", videos)
        // if (videos.length>0) {
        //     return videos.map((video)=>(
        //     <VideoElement key= {video.id} video={video}/>
        // ))};
        return null
    }
    // useEffect(() => {
    //     console.log("calling use effect", props)
    //     // props.fetchEventList()
    // }, []);
    useEffect(() => {
        console.log("props.video updated:", props.video);
        setVideos(props.video.videos);
    }, [props.video]);

    return (
        videos?renderVideos(videos): null
    )

}

const mapStateToProps =({video})=>({
    video
})

export default connect(mapStateToProps)(VideoContainer)

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, IconButton, Slider, CircularProgress } from '@mui/material';
import { Add } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import VideoElement from '../video/VideoCard/videoCard';

const useStyles = makeStyles({
  root: {
    //   maxWidth: 600,
    // backgroundColor: 'black',
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    gap: '10px',
    // margin: 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white"
  },

  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 10,
    backgroundColor: '#ddd',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2196f3',
  },
  arrowButton: {
    // position: 'absolute',
    bottom: '5',
    marginLeft: '5px',
    marginRight: '5px',
    // top: '50%',
    // transform: 'translateY(-50%)',
  },
  leftArrow: {
    left: 0,
    marginBottom: '5px',
  },
  rightArrow: {
    right: 0,
    marginBottom: '5px',
  },
});

function VideoSlider(props) {
  console.log('videos propsss', props);
  const classes = useStyles();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [addDummy, setAddDummy] = useState(true);
  const [videos, setVideos] = useState([]);
  const [progressWidth, setProgressWidth] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  // console.log("videoslider props", videos)
  const handleLeftArrowClick = () => {
    setIsLoading(true);
    setCurrentVideoIndex((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1));
    setTimeout(()=> setIsLoading(false), 2000)
  };

  useEffect(() => {
    console.log('calling set videos', JSON.stringify(props.videos));
    setVideos(props.videos);
    setIsLoading(false);
  }, [props.video]);

  const handleRightArrowClick = () => {
    setIsLoading(true);
    setCurrentVideoIndex((prevIndex) => (prevIndex === videos.length - 1 ? 0 : prevIndex + 1));
    setTimeout(()=> setIsLoading(false), 2000)
  };

  // useEffect(() => {
  //   console.log("video updated:", videos);
  //   setCurrentVideoIndex(0);
  // }, [videos]);
  const formatVideoPosition = () => {
    return `${currentVideoIndex + 1}/${videos.length}`;
  };
  console.log(videos[currentVideoIndex], 'videoss current');
  const renderVideos = (videos) => {
    console.log('videos exists', videos);

    return (
      <Card className={classes.root}>
        <VideoElement setEvent={setAddDummy} video={videos[currentVideoIndex]} />

        <div
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Button
            variant="contained"
            color="primary"
            className={`${classes.arrowButton} ${classes.leftArrow}`}
            onClick={handleLeftArrowClick}
            disabled={isLoading || currentVideoIndex === 0}
          >
            {'<'}
          </Button>
          <Typography variant="body2" style={{ marginTop: '7px' }}>
            {formatVideoPosition()}
          </Typography>
          {/* place a counter in here */}
          <Button
            variant="contained"
            color="primary"
            className={`${classes.arrowButton} ${classes.rightArrow}`}
            onClick={handleRightArrowClick}
            disabled={isLoading || currentVideoIndex === videos.length - 1}
          >
            {'>'}
          </Button>
        </div>
      </Card>
    );
  };

  return (
    <div>
  { isLoading ? (
      <div style={{position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '570px' }}>
           <CircularProgress />
      </div>

  ): (
   renderVideos(props.videos)
  )}
    </div>
  );
}

const mapStateToProps = ({ video }) => ({
  video,
});

export default connect(mapStateToProps)(VideoSlider);

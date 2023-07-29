import React, { useEffect, useRef, useState } from 'react';
import { CardContent, Card, CardMedia, Typography, Button, IconButton, Slider } from '@mui/material';
import { connect } from 'react-redux';
import { addIcon, Pause, PlayArrow } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  rootContainer: {
    width: '100%',
    height: '100%',
    margin: 'auto',

    flexDirection: 'column',
  },
  mark: {
    backgroundColor: 'gray',
    height: 8,
    width: 3,
    marginTop: -3,
  },
  markActive: {
    backgroundColor: 'red',
  },
  buttonContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    alignItems: 'center',
  },
  addIcon: {
    fontSize: 40,
    color: '#fff',
  },
  media: {
    '& input[type="range"]': {
      background: 'red', // Change the slider background color to red
    },
  },
});

function VideoElement(props) {
  const classes = useStyles();
  console.log('props', props);
  const videoPath = props.video.video_path_cloud;
  const videoRef = useRef(null);
  const videoStartTime = props.video.start_time;
  const videoEndTime = props.video.end_time;

  const [events, setEvents] = useState([]);
  const [pausedTime, setPausedTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeIntervals, setTimeIntervals] = useState([]);
  const [intervalDuration, setIntervalDuration] = useState(0.01);
  const [numberOfIntervals, setNumberOfIntervals] = useState(0);
  // const [videoDuration, setVideoDuration] = useState(0);
  const videoDuration = videoRef.current ? videoRef.current.duration : 0;

  // const isEventInVideo = (eventTime, videoStartTime, videoEndTime) => {
  //   const eventDate = new Date(eventTime);
  //   const videoStartDate = new Date(videoStartTime);
  //   const videoEndDate = new Date(videoEndTime);

  //   return eventDate >= videoStartDate && eventDate <= videoEndDate;
  // }

  useEffect(() => {
    // setVideoDuration(videoRef.current.duration)
    // setEvents(props.event.events.events);
    // const newIntervals = [];
    // console.log("checking video duration",JSON.stringify(videoRef.current))
    // console.log("checking interval duration",intervalDuration)
    // const numberOfIntervals = Math.ceil(videoDuration / intervalDuration);
    // console.log("checking video start time",videoStartTime)
    // console.log("checking video end time",videoEndTime)
    // const filteredEvents = events.filter(event => isEventInVideo(event.createdAt, videoStartTime, videoEndTime));
    // console.log("checking filtered events",filteredEvents)
    // const intervalDuration = videoDuration / numberOfIntervals;
    // for (let i = 0; i < numberOfIntervals; i+=1) {
    //   const intervalStart = i * intervalDuration;
    //   const intervalEnd = (i + 1) * intervalDuration;
    //   // Check if there are any events within the interval
    //   const eventsWithinInterval = filteredEvents.filter(event => {
    //     const eventTime = new Date(event.createdAt).getTime() / 1000;
    //     return eventTime >= intervalStart && eventTime < intervalEnd;
    //   });
    //   if (eventsWithinInterval.length > 0) {
    //     newIntervals.push(intervalEnd);
    //   }
    // }
    // console.log("new intervals", newIntervals)
    // setTimeIntervals(newIntervals);
  }, [videoRef]);

  //   useEffect(() => {
  //     console.log("video events mapping", JSON.stringify(props.event.events));
  //     setEvents(props.event.events.events);
  // }, [props.event]);
  // const timeIntervals = [0, 0.03, 0.1, 0.5];

  // const marks = timeIntervals.map((time) => ({
  //   value: time * videoRef.current.duration,
  //   // label: `${time.toFixed(2)}s`,
  // }));
  const handleVideoPause = () => {
    props.setEvent(true);
    setIsPlaying(false);
  };
  const handleVideoPlay = () => {
    props.setEvent(false);
    setIsPlaying(true);
  };
  const handleSliderChange = (event, value) => {
    setCurrentTime(value);
    videoRef.current.currentTime = value;
  };
  const handleTimeUpdate = (event) => {
    setCurrentTime(event.target.currentTime);
  };
  const handlePlayPauseClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <Card className={classes.rootContainer}>
      <div
        style={{
          height: '90%',
        }}
      >
        <CardMedia
          component="video"
          height="100%"
          src={videoPath}
          // controls
          ref={videoRef}
          onPause={handleVideoPause}
          onPlay={handleVideoPlay}
          currentTime={currentTime}
          className={classes.media}
          onTimeUpdate={handleTimeUpdate}
        />
      </div>

      <div
        style={{
          bottom: 0,
          // paddingTop: '20px',
          paddingLeft: '20px',
          paddingRight: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <IconButton onClick={handlePlayPauseClick}>{isPlaying ? <Pause /> : <PlayArrow />}</IconButton>
        <Slider
          value={currentTime}
          min={0}
          max={videoDuration}
          onChange={handleSliderChange}
          aria-labelledby="video-slider"
          step={0.01}
          // marks={marks}
          // // disabled={!isVideoLoaded}
          // classes={{
          //   mark: classes.mark,
          //   markActive: classes.markActive,
          // }}
        />
      </div>
    </Card>
  );
}

const mapStateToProps = ({ event }) => ({
  event,
});

export default connect(mapStateToProps)(VideoElement);

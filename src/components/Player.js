import React, { useEffect } from "react";
import { BsFillSkipBackwardFill, BsFillSkipForwardFill } from "react-icons/bs";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";

import { paginate } from "../utils/Paginate";

function Player({
  currentSong,
  isPlaying,
  setPlaying,
  audioRef,
  songInfo,
  songs,
  setSongInfo,
  setCurrentSong,
  setSongs,
  onPageChange,
  currentPage,
  pageSize,
}) {
  useEffect(() => {
    const newSong = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSong);
  }, [currentSong]);

  const playhandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragableHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.currentTarget.value });
  };

  const paginateSongs = paginate(songs, currentPage, pageSize);

  const songTrackHandler = async (direction) => {
    let songIndex = paginateSongs.findIndex(
      (song) => song.id === currentSong.id
    );
    if (direction === "skip-forword") {
      await setCurrentSong(
        paginateSongs[(songIndex + 1) % paginateSongs.length]
      );
      if (isPlaying) audioRef.current.play();
    }
    if (direction === "skip-backword") {
      if ((songIndex - 1) % paginateSongs.length === -1) {
        await setCurrentSong(paginateSongs[paginateSongs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(
        paginateSongs[(songIndex - 1) % paginateSongs.length]
      );
    }
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className="player">
      <div className="time__controler">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          type="range"
          min="0"
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragableHandler}
        />
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play__controler">
        <BsFillSkipBackwardFill
          size={25}
          color={"white"}
          onClick={() => songTrackHandler("skip-backword")}
        />
        <div className="play" onClick={playhandler}>
          {isPlaying ? (
            <AiOutlinePauseCircle
              className="playicon"
              size={55}
              color={"#FF5500"}
            />
          ) : (
            <FaPlay size={40} color={"#FF5500"} />
          )}
        </div>

        <BsFillSkipForwardFill
          size={25}
          color={"white"}
          onClick={() => songTrackHandler("skip-forword")}
        />
      </div>
    </div>
  );
}

export default Player;

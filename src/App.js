import "./style/app.css";

import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";
import { paginate } from "./utils/Paginate";

import React, { useState, useRef } from "react";
import data from "./utils/data";

function App() {
  const [songs, setSongs] = useState(data());

  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [toggle, setToggle] = useState(false);
  const [paginationItem, setPaginationItems] = useState({
    currentPage: 1,
    pageSize: 4,
  });

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    setSongInfo({ ...songInfo, currentTime: current, duration });
  };
  //paginate
  const pSongs = paginate(
    songs,
    paginationItem.currentPage,
    paginationItem.pageSize
  );

  const songEndHandler = async () => {
    let songIndex = pSongs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(pSongs[(songIndex + 1) % pSongs.length]);
    if (isPlaying) audioRef.current.play();
    return;
  };
  const handlePageChange = (page) => {
    setPaginationItems({ ...paginationItem, currentPage: page });
  };
  return (
    <div className={`App ${toggle ? "library__active" : ""}`}>
      <Nav setToggle={setToggle} toggle={toggle} />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setPlaying={setPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        onPageChange={handlePageChange}
        currentPage={paginationItem.currentPage}
        pageSize={paginationItem.pageSize}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        audioRef={audioRef}
        toggle={toggle}
        setSongs={setSongs}
        paginationItem={paginationItem}
        setPaginationItems={setPaginationItems}
        onPageChange={handlePageChange}
        setToggle={setToggle}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        src={currentSong.audio}
        ref={audioRef}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;

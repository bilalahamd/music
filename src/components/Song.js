import React from "react";

function Song({ currentSong }) {
  return (
    <div className="songs__container">
      <img src={currentSong.cover} alt="" />
      <h2>{currentSong.name}</h2>
      <p>{currentSong.artist}</p>
    </div>
  );
}

export default Song;

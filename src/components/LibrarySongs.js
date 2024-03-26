import React from "react";

function LibrarySongs({
  songs,
  song,
  setCurrentSong,
  isPlaying,
  audioRef,
  setSongs,
  id,
  toggle,
  setToggle,
}) {
  const handleSongSelection = async () => {
    await setCurrentSong(song);
    setToggle(!toggle);

    const newSong = songs.map((song) => {
      if (song.id === id) {
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
    await setSongs(newSong);
    if (isPlaying) audioRef.current.play();

    // if (isPlaying) {
    //   const playpromise = audioRef.current.play();
    //   if (playpromise !== undefined) {
    //     playpromise.then((audio) => {
    //       audioRef.current.play();
    //     });
    //   }
    // }
  };
  return (
    <div
      className={`single__song ${song.active ? "selected" : ""}`}
      onClick={handleSongSelection}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song__description">
        <h2>{song.name}</h2>
        <h3>{song.artist}</h3>
      </div>
    </div>
  );
}

export default LibrarySongs;

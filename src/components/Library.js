import React from "react";
import LibrarySongs from "./LibrarySongs";
import Pagination from "./Pagination";

import { paginate } from "./../utils/Paginate";
function Library({
  songs,
  setCurrentSong,
  isPlaying,
  audioRef,
  toggle,
  setSongs,
  paginationItem,
  setPaginationItems,
  onPageChange,
  setToggle,
}) {
  const paginatesongs = paginate(
    songs,
    paginationItem.currentPage,
    paginationItem.pageSize
  );
  return (
    <div className={`library ${toggle ? "toggle" : ""} `}>
      <div className="library_songs">
        {paginatesongs.map((song) => (
          <LibrarySongs
            song={song}
            songs={songs}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            audioRef={audioRef}
            key={song.id}
            id={song.id}
            setSongs={setSongs}
            toggle={toggle}
            setToggle={setToggle}
          />
        ))}
      </div>
      <Pagination
        songs={songs}
        onPageChange={onPageChange}
        currentPage={paginationItem.currentPage}
        pageSize={paginationItem.pageSize}
      />
    </div>
  );
}

export default Library;

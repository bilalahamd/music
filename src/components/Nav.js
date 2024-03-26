import React from "react";
import Logo from "./Logo";
import { MdMusicNote } from "react-icons/md";

function Nav({ setToggle, toggle }) {
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <nav>
      <div className="logo">
        <Logo />
        <h2>Music App</h2>
      </div>

      <button onClick={handleToggle}>
        Library
        <MdMusicNote size={25} className="music-icon" />
      </button>
    </nav>
  );
}

export default Nav;

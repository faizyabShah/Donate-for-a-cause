import { Link } from "react-router-dom";
import "./Sidebar.scss";

function Sidebar({ setPage }) {
  const handleClick = (e) => {
    console.log("HII");
    setPage(e.target.innerText.toLowerCase());
    e.target.classList.add("active");
    for (
      let i = 0;
      i < document.getElementsByClassName("sideItemContainer").length;
      i++
    ) {
      if (
        document.getElementsByClassName("sideItemContainer")[i].children[0]
          .innerText !== e.target.innerText
      ) {
        document
          .getElementsByClassName("sideItemContainer")
          [i].children[0].classList.remove("active");
      }
    }
  };

  return (
    <div className="sidebar">
      <ul>
        <div className="sideItemContainer">
          <li className="active" onClick={handleClick}>
            Overview
          </li>
        </div>
        <div className="sideItemContainer">
          <li onClick={handleClick}> Profile</li>
        </div>
        <div className="sideItemContainer">
          <li onClick={handleClick}> Donations</li>
        </div>
        <div className="sideItemContainer">
          <li onClick={handleClick}> Logout</li>
        </div>
      </ul>
    </div>
  );
}

export default Sidebar;

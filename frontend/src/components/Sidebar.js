import { Link } from "react-router-dom";
import "./Sidebar.scss";

function Sidebar({ setPage, pages }) {
  const handleClick = (e) => {
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
        {pages.map((page, i) => (
          <div className="sideItemContainer">
            <li className={i == 0 ? "active" : null} onClick={handleClick}>
              {page}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;

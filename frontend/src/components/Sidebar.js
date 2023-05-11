import { Link } from "react-router-dom";
import "./Sidebar.scss";

function Sidebar({ setPage, pages, isSpecial }) {
  const handleClick = (e) => {
    if (isSpecial) {
      const index = e.target.parentNode.getAttribute("data-index");
      const clickedOrganization = pages[index];
      setPage(clickedOrganization._id);
    } else {
      setPage(e.target.innerText.toLowerCase());
    }
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
        {isSpecial
          ? pages != null
            ? pages.map((organization, i) => (
                <div className="sideItemContainer" data-index={i}>
                  <li
                    className={i == 0 ? "active" : null}
                    onClick={handleClick}
                  >
                    {organization.name}
                  </li>
                </div>
              ))
            : null
          : pages.map((page, i) => (
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

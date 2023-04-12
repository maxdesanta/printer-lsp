import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import css
import './style.css';

// import icon
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Search({ resultSearch, inputSearch, formulaResult }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="search"
        value={resultSearch}
        onChange={inputSearch}
        onKeyDown={(event) =>
          event.key === "Enter" ? formulaResult(resultSearch) : null
        }
      />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        style={{ color: "#7f5af0", cursor: "pointer" }}
      />
    </div>
  );
}

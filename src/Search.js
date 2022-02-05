import React, { useState } from "react";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import MicIcon from "@material-ui/icons/Mic";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Search({ hideButtons = false }) {
  const [{ term }, dispatch] = useStateValue();

  // sate for my search input
  const [input, setInput] = useState("");
  // history hook
  const history = useHistory();

  //My Search function
  const search = (e) => {
    e.preventDefault();
    const { paragraph } = require('txtgen/dist/cjs/txtgen.js')

    // Generate sentence
    let _sentence = paragraph();

    if( _sentence.length > 5 ) {
      _sentence = _sentence.split(" ").slice(1,5).join(" ")
    }

    dispatch({
     type: actionTypes.SET_SEARCH_TERM,
     term: input,
      actual: _sentence
    });

    history.push("/search");
  };

  return (
    <form className="search">
      <div className="search__input">
        <SearchIcon className="search__inputIcon" />
        <input
          value={input}
          placeholder={term}
          onChange={(e) => setInput(e.target.value)}
        />
        <MicIcon />
      </div>

      {!hideButtons ? (
        <div className="search__buttons">
          <Button type="submit" onClick={search} variant="outlined">
            Wrongle Search
          </Button>
          <Button variant="outlined">I'm Feeling Wrucky</Button>
        </div>
      ) : (
        <div className="search__buttons">
          <Button
            className="search__buttonHidden"
            type="submit"
            onClick={search}
            variant="outlined"
          >
            Wrongle Search
          </Button>
          <Button className="search__buttonHidden" variant="outlined">
            I'm Feeling Wrucky
          </Button>
        </div>
      )}
    </form>
  );
}

export default Search;

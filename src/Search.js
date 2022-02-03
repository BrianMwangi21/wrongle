import React, { useState } from "react";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import MicIcon from "@material-ui/icons/Mic";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { OPENAI_API_KEY } from "./keys";

function Search({ hideButtons = false }) {
  const [{ term }, dispatch] = useStateValue();

  // sate for my search input
  const [input, setInput] = useState("");
  // history hook
  const history = useHistory();

  //My Search function
  const search = (e) => {
    e.preventDefault();
    const OpenAI = require("openai-api");
    const openai = new OpenAI(OPENAI_API_KEY);
    openai
      .complete({
        engine: "davinci",
        prompt: e.target.value,
        maxTokens: 5,
        temperature: 0.9,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ["\n", "testing"],
      })
      .then((response) => {
        dispatch({
          type: actionTypes.SET_SEARCH_TERM,
          term: response.data.choices[0].text,
        });

        history.push("/search");
      })
      .catch((error) => {
        console.log("There is an errrrrrrrr", error);
      });
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
            Boogle Search
          </Button>
          <Button variant="outlined">I'm Feeling Bucky</Button>
        </div>
      ) : (
        <div className="search__buttons">
          <Button
            className="search__buttonHidden"
            type="submit"
            onClick={search}
            variant="outlined"
          >
            Boogle Search
          </Button>
          <Button className="search__buttonHidden" variant="outlined">
            I'm Feeling Bucky
          </Button>
        </div>
      )}
    </form>
  );
}

export default Search;

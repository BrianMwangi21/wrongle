import React from "react";
import "./SearchPage.css";
import { useStateValue } from "./StateProvider";
import useGoogleSearch from "./useGoogleSearch";
import { Link } from "react-router-dom";
import Search from "./Search";
import SearchIcon from "@material-ui/icons/Search";
import DescriptionIcon from "@material-ui/icons/Description";
import ImageIcon from "@material-ui/icons/Image";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import RoomIcon from "@material-ui/icons/Room";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const SearchPage = () => {
  const [{ term, actual }] = useStateValue();
  // LIVE API CALL
  const { data } = useGoogleSearch(actual);

  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <Link to="/">
          <img
            className="searchPage__logo"
            src="wrongle.png"
            alt="Wrongle logo"
          />
        </Link>

        <div className="searchPage__headerBody">
          <Search hideButtons />

          <div className="searchPage__options">
            <div className="searchPage__optionsLeft">
              <div className="searchPage__option">
                <SearchIcon />
                <Link to="#">All</Link>
              </div>

              <div className="searchPage__option">
                <DescriptionIcon />
                <Link to="#">News</Link>
              </div>

              <div className="searchPage__option">
                <ImageIcon />
                <Link to="#">Images</Link>
              </div>

              <div className="searchPage__option">
                <LocalOfferIcon />
                <Link to="#">Shopping</Link>
              </div>

              <div className="searchPage__option">
                <RoomIcon />
                <Link to="#">Maps</Link>
              </div>

              <div className="searchPage__option">
                <MoreVertIcon />
                <Link to="#">More</Link>
              </div>
            </div>
            <div className="searchPage__optionsRight">
              <div className="searchPage__option">
                <Link to="#">Settings</Link>
              </div>

              <div className="searchPage__option">
                <Link to="#">Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {term && !data?.error ? (
        <div className="searchPage__results">
          <p className="searchPage__resultCount">
            About {data?.searchInformation.formattedTotalResults} results (
            {data?.searchInformation.formattedSearchTime} seconds) for {term}
          </p>
          {data?.items.map((item, index) => (
            <div className="searchPage__result" key={index}>
              <a
                className="searchPage__resultLink"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.pagemap?.cse_image?.length > 0 &&
                  item.pagemap?.cse_image[0]?.src && (
                    <img
                      className="searchPage__resultImage"
                      src={
                        item.pagemap?.cse_image?.length > 0 &&
                        item.pagemap?.cse_image[0]?.src
                      }
                      alt=""
                    />
                  )}
                {item.displayLink} ᐁ
              </a>
              <a
                className="searchPage__resultTitle"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2>{item.title}</h2>
              </a>
              <p className="searchPage__resultSnippet">{item.snippet}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="searchPage__results">
          <p className="searchPage__resultCount">
            About 0 results ( 0.2121 seconds ) for {term}
          </p>
          <div className="searchPage__result">
            <a
              className="searchPage__resultLink"
              href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="searchPage__resultImage"
                src="rickroll.jpg"
                alt="rick_roll"
              />
            </a>
            <a
              className="searchPage__resultTitle"
              href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>Ooops, rate limit reached</h2>
            </a>
            <p className="searchPage__resultSnippet">
              So, I'm kinda not paying for an unlimited rate limit from Google
              so today's limit has exceeded. Come back tomorrow <br />
              <br />
              But can I use DuckDuckGo ?
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

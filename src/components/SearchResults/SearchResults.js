import React from 'react';
//import React, { Component } from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

//Passing the search results to TrackList

const SearchResults = (props) => {
  return (
      <div className="SearchResults">
          <h2>Results</h2>
          <TrackList tracks={props.searchResults} onAdd={props.onAdd} isRemoval={false} />
      </div>
  );
}

export default SearchResults;

/*
class SearchResults extends Component {
  constructor(props) {
    super(props);
  }

    render() {
      return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={props.searchResults} onAdd={props.onAdd} isRemoval={false} />
        </div>
      );
    }

export default SearchResults;
*/

import React, { Component } from 'react';
import './SearchBar.css'

//Displays the searchbar at the top.
//The "button" (it's not a button) will display a log in prompt instead of search if there is no access token.

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }

    search = () => {
        this.props.onSearch(this.state.term)
    }

    handleTermChange = (e) => {
        this.setState({
            term: e.target.value
        })
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
                <a onClick={this.search}>SEARCH</a>
            </div>
        );
    }

}

export default SearchBar;

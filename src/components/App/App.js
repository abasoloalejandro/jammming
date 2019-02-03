//import React from 'react';
import React, { Component } from 'react';
import './App.css';

import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
//import Track from '../Track/Track'; no estoy seguro si es necesario; si funciona, borrar esta línea
//En un pp no es necesario ya que se extentiende de SearchResults a TrackList, y a su vez a Track.

import Spotify from '../../util/Spotify';

//class App extends React.Component {}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //property set to an array of objects (see below).
      searchResults: [],
      playlistName: "New playlist",
      playlistTracks: []
    }
  }

  addTrack = (newTrack) => {
    //determine whether the track exists, breaking out if does.
    const songExists = this.state.playlistTracks.find(track => track.id === newTrack.id)
    if (!songExists) {
      this.setState(prevState => {
        return {
          playlistTracks: [
            ...prevState.playlistTracks,
            {
              name: newTrack.name,
              artist: newTrack.artist,
              album: newTrack.album,
              id: newTrack.id,
              uri: newTrack.uri
            }
          ]
        }
      });
    }
  }

  removeTrack = (toRemove) => {
    const newPlaylist = this.state.playlistTracks.filter(track => toRemove.id !== track.id)

    this.setState({
      playlistTracks: newPlaylist
    });
  }

  updatePlaylistName = (name) => {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist = () => {
    console.log('saving playlist')
    const trackURIs = this.state.playlistTracks.map(track => track.uri)
    const playlistName = this.state.playlistName;
    Spotify.savePlaylist(playlistName, trackURIs);
  }

  search = (searchTerm) => {
    console.log(`Search Spotify for "${searchTerm}"`);
    Spotify.getAccessToken()
    Spotify.search(searchTerm).then(tracks => {
      this.setState({
        searchResults: tracks
      });
    })
  }

  render() {
    const { searchResults, playlistName, playlistTracks } = this.state;
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={searchResults} onAdd={this.addTrack} />
            <Playlist
              name={playlistName}
              tracks={playlistTracks}
              onAdd={this.addTrack}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../style/Musics.css';
import Loading from './Loading';

class Musics extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      favoritados: [],
      loading: true,
    };

    this.handleFavorite = this.handleFavorite.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props;
    const response = await getMusics(id);
    this.setState({
      musics: response.filter((_element, index) => index !== 0),
      favoritados: await getFavoriteSongs(),
      loading: false,
    });
  }

  handleFavorite({
    artworkUrl60,
    collectionName,
    trackName,
    previewUrl,
    trackTimeMillis,
    trackId,
  }, { target }) {
    if (!target.checked) {
      this.setState({
        loading: true,
      }, async () => {
        removeSong({
          artworkUrl60,
          collectionName,
          trackName,
          previewUrl,
          trackTimeMillis,
          trackId,
        });
        this.setState({
          favoritados: await getFavoriteSongs(),
          loading: false,
        });
      });
    } else {
      this.setState({
        loading: true,
      }, async () => {
        await addSong({
          artworkUrl60,
          collectionName,
          trackName,
          previewUrl,
          trackTimeMillis,
          trackId,
        });
        this.setState({
          favoritados: await getFavoriteSongs(),
          loading: false,
        });
      });
    }
  }

  render() {
    const { musics, loading, favoritados } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div className="album-music-container">
        { musics.map(({
          artworkUrl60,
          collectionId,
          collectionName,
          trackNumber,
          trackName,
          trackId,
          previewUrl,
          trackTimeMillis,
        }, index) => (
          <MusicCard
            key={ `${collectionId}${index}` }
            artworkUrl60={ artworkUrl60 }
            collectionName={ collectionName }
            trackNumber={ trackNumber }
            trackName={ trackName }
            trackId={ trackId }
            previewUrl={ previewUrl }
            trackTimeMillis={ trackTimeMillis }
            handleFavorite={ this.handleFavorite }
            favoritados={ favoritados }
          />
        )) }
      </div>
    );
  }
}

Musics.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Musics;

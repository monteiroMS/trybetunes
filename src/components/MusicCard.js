import React, { Component } from 'react';
import PropTypes from 'prop-types';
import favIcon from './favIcon.png';
import falseFavIcon from './falseFavIcon.png';
import '../style/MusicCard.css';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      checked: false,
    };
  }

  async componentDidMount() {
    const { trackId, favoritados } = this.props;
    this.setState({
      checked: favoritados.some(({ trackId: songId }) => trackId === songId),
    });
  }

  getMusicDuration(millis) {
    const mil = 1000;
    const minuto = 60;
    const millisseconds = millis;
    const minutes = (millisseconds / mil) / minuto;
    const seconds = (millisseconds / mil) % minuto;
    return `${parseInt(minutes, 10)}:${seconds.toFixed()}`;
  }

  render() {
    const { checked } = this.state;
    const {
      artworkUrl60,
      collectionName,
      trackName,
      previewUrl,
      trackTimeMillis,
      trackId,
      handleFavorite,
    } = this.props;
    return (
      <div className="music-card">
        <img
          src={ artworkUrl60 }
          alt={ `capa do album ${collectionName}` }
          className="music-img"
        />
        <p className="music-name">{trackName}</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
          className="music-player"
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <p className="music-time">{ this.getMusicDuration(trackTimeMillis) }</p>
        <label htmlFor={ trackId } className="favorito-container">
          <p>Favorita</p>
          {
            checked
              ? (
                <img
                  src={ favIcon }
                  alt="coracao vermelho"
                  className="music-card-fav-icon"
                />
              )
              : (
                <img
                  src={ falseFavIcon }
                  alt="coracao preto"
                  className="music-card-fav-icon"
                />
              )
          }
          <input
            id={ trackId }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ (event) => handleFavorite({
              artworkUrl60,
              collectionName,
              trackName,
              previewUrl,
              trackTimeMillis,
              trackId,
            }, event) }
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  artworkUrl60: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackTimeMillis: PropTypes.number.isRequired,
  trackId: PropTypes.number.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  favoritados: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default MusicCard;

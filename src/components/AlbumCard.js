import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/AlbumCard.css';

class AlbumCard extends Component {
  render() {
    const {
      collectionName,
      collectionId,
      artistName,
      trackCount,
      artworkUrl100,
      collectionPrice,
    } = this.props;
    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
        className="artist-card"
      >
        <img
          src={ artworkUrl100 }
          alt={ `capa do album ${collectionName} de ${artistName}` }
        />
        <span className="album-text-container">
          <p><b>{ collectionName }</b></p>
          <p>{ artistName }</p>
          <p>{ `Faixas: ${trackCount}` }</p>
        </span>
        <span className="album-price-container">{ `$ ${collectionPrice}` }</span>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  collectionName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  trackCount: PropTypes.number.isRequired,
  collectionId: PropTypes.number.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionPrice: PropTypes.number,
};

AlbumCard.defaultProps = {
  collectionPrice: 0.00,
};

export default AlbumCard;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import '../style/AlbumInfo.css';
import Loading from './Loading';

class AlbumInfo extends Component {
  constructor() {
    super();

    this.state = {
      album: {},
      loading: true,
    };

    this.getReleaseDate = this.getReleaseDate.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props;
    const response = await getMusics(id);
    this.setState({
      album: response[0],
      loading: false,
    });
  }

  getReleaseDate(releaseDate) {
    if (releaseDate) {
      const dateTime = releaseDate.split('T');
      const date = dateTime[0];
      const data = date.split('-');
      return `${data[2]}/${data[1]}/${data[0]}`;
    }
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Loading />;
    }

    const { album: {
      artworkUrl100,
      collectionName,
      artistName,
      releaseDate,
      trackCount,
      collectionPrice,
    } } = this.state;

    return (
      <div className="album-info-container">
        <span className="album-pic-box">
          <img
            src={ artworkUrl100 }
            alt={ `capa do album ${collectionName}` }
          />
        </span>
        <span className="album-info-box">
          <p className="album-name" data-testid="album-name">
            { collectionName }
          </p>
          <span className="album-description-box">
            <p data-testid="artist-name">{ artistName }</p>
            <p>{ this.getReleaseDate(releaseDate) }</p>
            <p>
              {
                trackCount === 1
                  ? `${trackCount} faixa`
                  : `${trackCount} faixas`
              }
            </p>
          </span>
        </span>
        <span className="album-price-box">
          <p>{ `$ ${collectionPrice}` }</p>
        </span>
      </div>
    );
  }
}

AlbumInfo.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AlbumInfo;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong, addSong } from '../services/favoriteSongsAPI';
import '../style/Favorites.css';
// import PropTypes from 'prop-types';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favoritados: [],
      loading: true,
    };

    this.handleFavorite = this.handleFavorite.bind(this);
  }

  async componentDidMount() {
    this.setState({
      favoritados: await getFavoriteSongs(),
    }, () => {
      this.setState({
        loading: false,
      });
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
    const { loading, favoritados } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-favorites">
        <Header />
        <span className="album-music-container">
          {
            favoritados.length === 0
              ? (
                <span className="not-favorited-message">
                  <h1>Você ainda não favoritou nenhuma música :c</h1>
                  <p>
                    Clique no link abaixo
                    e encontre álbuns com as suas músicas favoritas!
                  </p>
                  <Link to="/search">Procurar</Link>
                </span>
              )
              : (
                favoritados.map(({
                  artworkUrl60,
                  collectionName,
                  trackName,
                  previewUrl,
                  trackTimeMillis,
                  trackId,
                }) => (
                  <MusicCard
                    key={ trackId }
                    artworkUrl60={ artworkUrl60 }
                    collectionName={ collectionName }
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                    trackTimeMillis={ trackTimeMillis }
                    trackId={ trackId }
                    handleFavorite={ this.handleFavorite }
                    favoritados={ favoritados }
                  />
                ))
              )
          }
        </span>
      </div>
    );
  }
}

// Favorites.propTypes = {
//  prop: PropTypes.type.isRequired,
// };

export default Favorites;

import React, { Component } from 'react';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import AlbumCard from './AlbumCard';
import Loading from './Loading';
import '../style/SearchApp.css';

class SearchApp extends Component {
  constructor() {
    super();

    this.state = {
      isSearchArtistDisabled: true,
      nomeArtista: '',
      searchResult: null,
      loading: false,
    };

    this.ableSearch = this.ableSearch.bind(this);
    this.searchArtist = this.searchArtist.bind(this);
  }

  ableSearch({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => {
      this.setState(({ nomeArtista }) => ({
        isSearchArtistDisabled: nomeArtista.length < 2,
        searchResult: null,
      }));
    });
  }

  searchArtist(event) {
    event.preventDefault();
    event.target.previousSibling.value = '';
    const { nomeArtista } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      const result = await searchAlbumsAPIs(nomeArtista);
      if (result.length > 0) {
        this.setState({
          searchResult: result,
          loading: false,
        });
      } else {
        this.setState({
          searchResult: 'not found',
          loading: false,
        });
      }
    });
  }

  render() {
    const { isSearchArtistDisabled, nomeArtista, searchResult, loading } = this.state;
    return (
      <div className="search-main">
        <form className="search-input-container">
          <input
            name="nomeArtista"
            onChange={ this.ableSearch }
            id="nomeArtista"
            data-testid="search-artist-input"
            type="text"
            placeholder="procure por um artista ou banda"
          />
          <button
            type="submit"
            onClick={ this.searchArtist }
            data-testid="search-artist-button"
            disabled={ isSearchArtistDisabled }
          >
            Encontrar
          </button>
        </form>
        {
          loading
            ? <Loading />
            : (
              <span className="search-span-container">
                {
                  searchResult !== 'not found' && searchResult
                    && (
                      <div className="search-results-container">
                        <h1 className="search-results-title">
                          { `Resultado de álbuns de: ${nomeArtista}` }
                        </h1>
                        {
                          searchResult.map(({
                            artistName,
                            collectionId,
                            artworkUrl100,
                            collectionName,
                            collectionPrice,
                            trackCount,
                          }) => (
                            <AlbumCard
                              key={ collectionId }
                              collectionName={ collectionName }
                              collectionId={ collectionId }
                              artistName={ artistName }
                              trackCount={ trackCount }
                              artworkUrl100={ artworkUrl100 }
                              collectionPrice={ collectionPrice }
                            />
                          ))
                        }
                      </div>
                    )
                }
                {
                  searchResult === 'not found'
                    && <p>Nenhum álbum foi encontrado</p>
                }
                {
                  !searchResult && (
                    <span className="principal-text-span">
                      <h1>Digite o nome de um artista ou banda</h1>
                      <p>e encontre seus álbuns de música favoritos!</p>
                    </span>
                  )
                }
              </span>
            )
        }
      </div>
    );
  }
}

export default SearchApp;

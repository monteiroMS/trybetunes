import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import AlbumInfo from '../components/AlbumInfo';
import Musics from '../components/Musics';
import '../style/Album.css';
import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const { loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="whole-album-container">
          <AlbumInfo id={ id } />
          <Musics id={ id } />
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  params: PropTypes.objectOf(PropTypes.any),
  id: PropTypes.number,
};

Album.defaultProps = {
  params: {},
  id: 0,
};

export default Album;

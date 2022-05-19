import React, { Component } from 'react';
import Header from '../components/Header';
import SearchApp from '../components/SearchApp';
import '../style/Search.css';
// import PropTypes from 'prop-types';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <div className="search-container">
          <SearchApp />
        </div>
      </div>
    );
  }
}

// Search.propTypes = {
//  prop: PropTypes.type.isRequired,
// };

export default Search;

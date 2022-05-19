import React, { Component } from 'react';
import '../style/Loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="loading-container">
        <h2>Carregando...</h2>
        <img src="https://www.blogson.com.br/wp-content/uploads/2017/10/d9933c4e2c272f33b74ef18cdf11a7d5.gif" alt="purple loading gif" />
      </div>
    );
  }
}

export default Loading;

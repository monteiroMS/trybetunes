import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/ProfileCard.css';

class ProfileCard extends Component {
  render() {
    const { user: { description, email, image, name } } = this.props;
    return (
      <div className="profile-card-container">
        <span className="user-tools-box">
          {
            image === ''
              ? (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                  alt="foto padrao de pessoa usuaria"
                />
              )
              : (
                <img
                  src={ image }
                  alt="foto de perfil da pessoa usuaria"
                  data-testid="profile-image"
                />
              )
          }
          <Link
            to="/profile/edit"
            className="user-tools-box-link"
          >
            Editar perfil
          </Link>
        </span>
        <span className="user-info-box">
          <h2>Nome de usuário</h2>
          <p>{ name }</p>
          <h2>E-mail</h2>
          <p>{ email }</p>
          <fieldset>
            <legend>Descrição</legend>
            <p>{ description }</p>
          </fieldset>
        </span>
      </div>
    );
  }
}

ProfileCard.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProfileCard;

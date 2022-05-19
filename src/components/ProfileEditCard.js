import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/ProfileEditCard.css';

class ProfileEditCard extends Component {
  render() {
    const {
      isSaveButtonDisabled,
      name,
      image,
      email,
      description,
      onChange,
      invalidEmail,
      onSubmit,
    } = this.props;
    return (
      <form className="user-tools-edit-container" onSubmit={ onSubmit }>
        <span className="user-tools-edit-box">
          <h2>Editar a foto do perfil</h2>
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
                />
              )
          }
          <span className="user-image-options">
            <label htmlFor="image" className="image-input-label">
              Cole aqui a URL da imagem:
              <input
                name="image"
                id="image"
                type="text"
                value={ image }
                data-testid="edit-input-image"
                onChange={ onChange }
                className="image-input"
              />
            </label>
            <p>Ou escolha uma foto do seu computador</p>
            <label htmlFor="inter-image" className="intern-image-input-label">
              Enviar arquivo
              <input
                name="intern-image"
                id="inter-image"
                type="file"
                onChange={ onChange }
                className="intern-image-input"
              />
            </label>
          </span>
        </span>
        <span className="user-info-edit-box">
          <h2>Nome</h2>
          <input
            name="name"
            value={ name }
            type="text"
            data-testid="edit-input-name"
            onChange={ onChange }
            className="edit-input-name"
          />
          <h2>E-mail</h2>
          <span className="user-email-box">
            <input
              name="email"
              value={ email }
              type="text"
              data-testid="edit-input-email"
              onChange={ onChange }
            />
            {
              invalidEmail
                ? <p className="user-email-wrong">Insira um e-mail válido</p>
                : <p className="user-email-right">✔</p>
            }
          </span>
          <h2>Descrição</h2>
          <textarea
            name="description"
            value={ description }
            data-testid="edit-input-description"
            onChange={ onChange }
          />
          <button
            type="submit"
            disabled={ isSaveButtonDisabled }
            data-testid="edit-button-save"
          >
            Salvar
          </button>
        </span>
      </form>
    );
  }
}

ProfileEditCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  invalidEmail: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ProfileEditCard;

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../style/Login.css';
// import PropTypes from 'prop-types';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      isButtonSubmitDisabled: true,
      loggedStatus: 'notLogged',
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.verifiesUsername = this.verifiesUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeInput({ target: { name, value } }) {
    this.setState(() => ({
      [name]: value,
    }), () => {
      if (name === 'username') this.verifiesUsername();
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const { username } = this.state;
    this.setState({
      loggedStatus: 'loading',
    }, async () => {
      await createUser({ name: username });
      this.setState({
        loggedStatus: 'logged',
      });
    });
  }

  verifiesUsername() {
    const MIN_USERNAME_LENGTH = 3;
    this.setState(({ username }) => ({
      isButtonSubmitDisabled: (username.length < MIN_USERNAME_LENGTH),
    }));
  }

  render() {
    const { username, isButtonSubmitDisabled, loggedStatus } = this.state;
    return (
      <div className="login-container">
        { loggedStatus === 'notLogged'
          && (
            <div className="form-container" data-testid="page-login">
              <form className="formulario" onSubmit={ this.onSubmit }>
                <h1>TrybeTunes</h1>
                <input
                  name="username"
                  placeholder="Insira o nome de usuário"
                  type="text"
                  onChange={ this.onChangeInput }
                  value={ username }
                  data-testid="login-name-input"
                />
                <button
                  type="submit"
                  data-testid="login-submit-button"
                  disabled={ isButtonSubmitDisabled }
                >
                  Entrar
                </button>
              </form>
              <img src="https://i.pinimg.com/originals/fe/35/45/fe3545469a6d65137b921656ae976c3e.gif" alt="gatinho ouvindo musica" />
            </div>
          ) }
        { loggedStatus === 'loading' && <Loading /> }
        { loggedStatus === 'logged' && <Redirect to="/search" /> }
      </div>
    );
  }
}

// Login.propTypes = {
//  prop: PropTypes.type.isRequired,
// };

export default Login;

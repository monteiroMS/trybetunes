import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ProfileEditCard from '../components/ProfileEditCard';
import { getUser, updateUser } from '../services/userAPI';
// import PropTypes from 'prop-types';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: '',
      email: '',
      image: '',
      description: '',
      shouldRedirect: false,
      isSaveButtonDisabled: true,
      invalidEmail: false,
    };

    this.onChange = this.onChange.bind(this);
    this.finalCheck = this.finalCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    const { name, email, image, description } = await getUser();
    this.setState({
      loading: true,
      name,
      email,
      image,
      description,
    }, () => {
      this.finalCheck();
      this.setState({
        loading: false,
      });
    });
  }

  onChange({ target: { name, value, files } }) {
    if (name === 'intern-image') {
      this.setState({
        image: URL.createObjectURL(files[0]),
      }, () => {
        this.finalCheck();
      });
    } else if (name === 'email') {
      const emailOK = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i);
      this.setState({
        email: value,
        invalidEmail: !emailOK,
      }, () => {
        this.finalCheck();
      });
    } else {
      this.setState({
        [name]: value,
      }, () => {
        this.finalCheck();
      });
    }
  }

  async onSubmit() {
    const { name, image, description, email } = this.state;
    updateUser({ name, image, description, email });
    this.setState({
      loading: true,
      shouldRedirect: true,
    }, () => {
      this.setState({ loading: false });
    });
  }

  finalCheck() {
    const {
      name,
      image,
      invalidEmail,
      description,
    } = this.state;
    if (
      name.length !== 0
      && image.length !== 0
      && description.length !== 0
      && !invalidEmail
    ) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  }

  render() {
    const {
      loading,
      name,
      email,
      image,
      description,
      shouldRedirect,
      isSaveButtonDisabled,
      invalidEmail,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          loading && <Loading />
        }
        {
          shouldRedirect && <Redirect to="/profile" />
        }
        <ProfileEditCard
          name={ name }
          email={ email }
          image={ image }
          description={ description }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onChange={ this.onChange }
          onSubmit={ this.onSubmit }
          invalidEmail={ invalidEmail }
        />
      </div>
    );
  }
}

// ProfileEdit.propTypes = {
//  prop: PropTypes.type.isRequired,
// };

export default ProfileEdit;

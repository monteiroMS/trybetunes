import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ProfileCard from '../components/ProfileCard';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      this.setState({
        user: await getUser(),
        loading: false,
      });
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading
            ? <Loading />
            : <ProfileCard user={ user } />
        }
      </div>
    );
  }
}

export default Profile;

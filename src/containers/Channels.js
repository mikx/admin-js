import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getChannels, setError } from '../actions/channels';

class Channels extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    channels: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      channels: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    setError: PropTypes.func.isRequired,
  }

  static defaultProps = { }

  componentDidMount = () => this.fetchChannels();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchChannels = () => { }

  render = () => {
    const { Layout, channels } = this.props;
    return (
      <Layout
        error={channels.error}
        loading={channels.loading}
        channels={channels.channels}
        reFetch={() => this.fetchChannels()}
      />
    );
  }
}

const mapStateToProps = state => ({
  channels: state.channels || {
    loading: false,
    channels: []
  },
});

const mapDispatchToProps = {
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Channels);

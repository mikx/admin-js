import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout, getMemberData } from '../actions/user';

class Member extends Component {

  static propTypes = {
    Layout: PropTypes.func.isRequired,
    memberLogout: PropTypes.func.isRequired,
    memberData: PropTypes.func.isRequired,
    user: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }).isRequired,
  }

  componentDidMount = () => { this.props.memberData() }

  render = () => {
    const { Layout, user, memberLogout } = this.props;
    return <Layout user={user} logout={memberLogout} />;
  }
}

const mapStateToProps = state => ({
  user: state.user || {},
})

const getMemberDataFn = getMemberData()
const memberLogoutFn  = logout()

const mapDispatchToProps = (dispatch) => ({
  memberLogout:  () => dispatch(memberLogoutFn),
  memberData: () => dispatch(getMemberDataFn),
})

export default connect(mapStateToProps, mapDispatchToProps)(Member);

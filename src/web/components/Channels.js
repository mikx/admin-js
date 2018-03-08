import React from 'react';
import PropTypes from 'prop-types';
import {
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Error from './Error';

const ChannelListing = ({ error, loading, channels }) => {

  // Error
  if (error) return <Error content={error} />;

  // Build Cards for Listing
  const items = channels.map(item => (
    <ListGroupItem key={`${item.id}`}>
    {item.name}
    </ListGroupItem>
  ));

  // Show Listing
  return (
    <div>
      <ListGroup className={loading ? 'content-loading' : ''}>
        {items}
      </ListGroup>
    </div>
  );
};

ChannelListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  channels: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

ChannelListing.defaultProps = {
  error: null,
};

export default ChannelListing;

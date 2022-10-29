import React from 'react';
import PropTypes from 'prop-types';

function ReviewCard({ product }) {
  return (
    <div className="shoppin-cart-card">
      <div className="shoppin-cart-item">
        <img
          src={ product.thumbnail }
          alt={ product.title }
          className="item-image"
        />
        <p className="item-name">{ product.title }</p>
      </div>
      <hr className="line" />
    </div>
  );
}

ReviewCard.propTypes = {
  product: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default ReviewCard;

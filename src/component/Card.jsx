import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  state = {
    totalQuantity: 1,
  }

  increaseClickButton = () => {
    this.setState((previousState) => ({
      totalQuantity: previousState.totalQuantity + 1,
    }));
  }

  decreaseClickButton = () => {
    const { totalQuantity } = this.state;
    if (totalQuantity >= 2) {
      this.setState((previousState) => ({
        totalQuantity: previousState.totalQuantity - 1,
      }));
    }
  }

  render() {
    const { obj } = this.props;
    const { totalQuantity } = this.state;
    return (
      <div>
        <p data-testid="shopping-cart-product-name">{`Produto ${obj.title}`}</p>
        <img src={ obj.thumbnail } alt={ obj.title } />
        <p>{`R$ ${obj.price}`}</p>
        <div>
          <button
            type="button"
            data-testid="product-increase-quantity"
            onClick={ this.increaseClickButton }
          >
            +
          </button>
          <p data-testid="shopping-cart-product-quantity">{ totalQuantity }</p>
          <button
            type="button"
            data-testid="product-decrease-quantity"
            onClick={ this.decreaseClickButton }
          >
            -
          </button>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  obj: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;

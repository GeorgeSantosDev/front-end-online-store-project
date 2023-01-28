import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

class ProductDetails extends Component {
  state = {
    reviews: [],
    product: undefined,
    email: '',
    description: '',
    ratting: '',
    emailValidation: true,
    rattingValidation: true,
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    api.getProduct(id).then((data) => this.setState({ product: data }));
    if (localStorage[id]) {
      this.getLocalStorage();
      return;
    }
    localStorage.setItem(id, JSON.stringify([]));
  }

  getLocalStorage = () => {
    const { match } = this.props;
    const { id } = match.params;
    const reviewListString = localStorage.getItem(id);
    const reviewList = JSON.parse(reviewListString);
    this.setState({ reviews: reviewList });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'ratting') {
      this.setState({ rattingValidation: false });
    }
    if (name === 'email'
    && (!value.includes('@')
    || !value.includes('.'))) {
      this.setState({ emailValidation: true });
    } else if (name === 'email') {
      this.setState({ emailValidation: false });
    }
    this.setState({ [name]: value });
  }

  storageReview = (event) => {
    event.preventDefault();
    const { email, description, ratting } = this.state;
    const { match } = this.props;
    const { id } = match.params;
    const reviewListString = localStorage.getItem(id);
    const reviewList = JSON.parse(reviewListString);
    const newReview = [email, description, ratting];
    reviewList.push(newReview);
    localStorage.setItem(id, JSON.stringify(reviewList));
    this.getLocalStorage();
    this.setState({ email: '', description: '', ratting: '' });
  }

  handleClick = () => {
    const storage = JSON.parse(localStorage.getItem('productCard'));
    const { product } = this.state;
    const { thumbnail, title, price } = product;
    if (storage) {
      const newStorage = [...storage, { thumbnail, price, title }];
      localStorage.setItem('productCard', JSON.stringify(newStorage));
    } else {
      localStorage.setItem('productCard', JSON.stringify([{ thumbnail, price, title }]));
    }
  }

  render() {
    const { product, email, description,
      reviews, emailValidation, rattingValidation } = this.state;
    return (
      <div>
        <Link
          to="/ShoppingCart"
          data-testid="shopping-cart-button"
        >
          Carrinho de Compras
        </Link>
        <div>Product Details</div>
        {product
          ? (
            <div>
              <p data-testid="product-detail-name">
                {product.title}
              </p>
              <img
                src={ product.thumbnail }
                data-testid="product-detail-image"
                alt="Product"
              />
              <p data-testid="product-detail-price">
                {product.price}
              </p>
              <a
                data-testid="product-detail-link"
                href={ product.permalink }
              >
                link
              </a>
              <button
                type="button"
                data-testid="product-detail-add-to-cart"
                onClick={ this.handleClick }
              >
                Adicionar ao carrinho
              </button>
            </div>
          )
          : <> </>}
        <div>
          <form>
            <label htmlFor="Email">
              Email
              {emailValidation || rattingValidation ? (
                <span data-testid="error-msg">
                  Campos inválidos
                </span>
              )
                : <> </>}
              <input
                type="text"
                data-testid="product-detail-email"
                onChange={ this.handleChange }
                name="email"
                value={ email }
              />
            </label>
            <textarea
              data-testid="product-detail-evaluation"
              rows="5"
              cols="20"
              onChange={ this.handleChange }
              name="description"
              value={ description }
            />
            <input
              type="radio"
              data-testid="1-rating"
              name="ratting"
              onChange={ this.handleChange }
              value="1"
              defaultChecked={ false }
            />
            <input
              type="radio"
              data-testid="2-rating"
              name="ratting"
              onChange={ this.handleChange }
              value="2"
              defaultChecked={ false }
            />
            <input
              type="radio"
              data-testid="3-rating"
              name="ratting"
              onChange={ this.handleChange }
              value="3"
              defaultChecked={ false }
            />
            <input
              type="radio"
              data-testid="4-rating"
              name="ratting"
              onChange={ this.handleChange }
              value="4"
              defaultChecked={ false }
            />
            <input
              type="radio"
              data-testid="5-rating"
              name="ratting"
              onChange={ this.handleChange }
              value="5"
              defaultChecked={ false }
            />
            <button
              type="submit"
              data-testid="submit-review-btn"
              onClick={
                this.storageReview
              }
              disabled={ (emailValidation || rattingValidation) }
            >
              Avaliar
            </button>
          </form>
          <section>
            {reviews.map((review, index) => (
              <section key={ index }>
                <p data-testid="review-card-email">
                  {review[0]}
                </p>
                <p data-testid="review-card-evaluation">
                  { review[1] }
                </p>
                <div data-testid="review-card-rating">
                  {
                    ['1', '1', '1', '1', '1'].map((n, i) => (
                      <input
                        key={ i }
                        type="checkbox"
                        checked={ i < review[2] }
                        name={ n }
                      />
                    ))
                  }
                </div>
              </section>
            ))}
          </section>
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired }),
  }).isRequired,
};

export default ProductDetails;

import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../component/Card';

class ShoppingCart extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.setState({
      products: JSON.parse(localStorage.getItem('productCard')),
    });
  }

  handleDelete = ({ target }) => {
    const { id } = target;
    const { products } = this.state;
    const newProduct = products.filter((product) => id !== product.title);
    this.setState({ products: newProduct });
    localStorage.setItem('productCard', JSON.stringify(newProduct));
  }

  render() {
    const { products } = this.state;
    return (
      <section>
        <Link to="/checkout" data-testid="checkout-products">Finalizar compra</Link>
        {!products ? (
          <div>
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio.
            </p>
            <img src="#" alt="#" />
          </div>
        ) : (
          products.map((item, index) => (
            <div key={ index }>
              <Card obj={ item } />
              <button
                data-testid="remove-product"
                type="button"
                id={ item.title }
                onClick={ this.handleDelete }
              >
                Excluir
              </button>
            </div>
          ))
        )}
      </section>
    );
  }
}

export default ShoppingCart;

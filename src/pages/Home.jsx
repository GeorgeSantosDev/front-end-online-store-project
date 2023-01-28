import React from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';
import Category from '../component/Category';
import cart from '../assets/cart.png';

class Home extends React.Component {
  state = {
    productList: [],
    noProducts: false,
    searchValue: '',
    category: [],
    card: [],
  }

  async componentDidMount() {
    const categories = await api.getCategories();
    this.setState({ category: categories });
  }

  handlerChange = ({ target }) => {
    const { value } = target;
    this.setState({ searchValue: value });
  }

  fetchCategory = async ({ target }) => {
    const { value } = target;
    const data = await api.getProductsFromCategoryAndQuery(value);
    this.setState({ productList: data.results });
  }

  fetchButton = () => {
    const { searchValue } = this.state;
    if (searchValue.trim() === '') {
      this.setState({ productList: [], noProducts: true });
      return;
    }
    api.getProductsFromCategoryAndQuery(null, searchValue)
      .then((data) => { this.setState({ productList: data.results }); });
  }

  handleAddToCard = ({ target }) => {
    const { id } = target;
    const { productList } = this.state;
    const item = productList.filter((product) => product.id === id);
    const { price, title, thumbnail } = item[0];
    this.setState((previousState) => ({
      card: [...previousState.card, { price, title, thumbnail }],
    }), () => {
      const { card } = this.state;
      localStorage.setItem('productCard', JSON.stringify(card));
    });
  }

  render() {
    const { productList, noProducts, category } = this.state;
    return (
      <div>
        <aside>
          {category.map((categoryItem) => (
            <Category
              key={ categoryItem.name }
              name={ categoryItem.name }
              id={ categoryItem.id }
              fetchCategory={ this.fetchCategory }
            />
          ))}
        </aside>
        <main>
          <label htmlFor="search">
            <input
              data-testid="query-input"
              type="text"
              name="search"
              id="search"
              placeholder="Pesquisa"
              onChange={ this.handlerChange }
            />
          </label>
          <button
            data-testid="query-button"
            type="submit"
            onClick={ this.fetchButton }
          >
            Buscar
          </button>
          <Link
            to="/shoppingcart"
            data-testid="shopping-cart-button"
          >
            <img
              className="cart-img"
              src={ cart }
              alt="Imagem do Carrinho"
            />
          </Link>
          {productList.length === 0 && !noProducts
            ? (
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            )
            : (
              <ul>
                {productList.map((product, index) => (
                  <li
                    key={ index }
                    data-testid="product"
                  >
                    <Link
                      to={ `/productdetails/${product.id}` }
                      data-testid="product-detail-link"
                    >
                      Detalhes do Produto
                    </Link>
                    <p>
                      { product.title}
                    </p>
                    <img src={ product.thumbnail } alt={ product.title } />
                    <p>
                      { product.price }
                    </p>
                    <button
                      type="submit"
                      data-testid="product-add-to-cart"
                      onClick={ this.handleAddToCard }
                      id={ product.id }
                    >
                      Adicionar ao Carrinho
                    </button>
                  </li>
                ))}
              </ul>
            )}
          {noProducts && <p>Nenhum produto foi encontrado</p>}
        </main>
      </div>
    );
  }
}

export default Home;

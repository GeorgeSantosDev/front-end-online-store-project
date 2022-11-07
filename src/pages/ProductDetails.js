import React, { useState, useEffect, useContext } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useLocation, Link } from 'react-router-dom';
import StoreContext from '../context/StoreContext';
import { getProduct } from '../services/api';
import { setLocalStorage, getLocalStorage } from '../services/storage';
import Header from '../components/Header';
import EvaluationForm from '../components/EvaluationForm';
import '../styles/ProductDetails.css';

function ProductDetails() {
  const { pathname } = useLocation();
  const { cartItems,
    setCartItems,
    productEvaluations,
    setProductEvaluations } = useContext(StoreContext);

  const [product, setProduct] = useState({});
  console.log(product);

  const urSplit = pathname.split('/');

  const fetchProduct = async () => {
    const item = await getProduct(urSplit[2]);
    setProduct(!item ? {} : item);
  };

  const getEvaluations = () => {
    const evaluationsOfProducts = getLocalStorage('evaluations');

    setProductEvaluations(!evaluationsOfProducts ? productEvaluations
      : evaluationsOfProducts);
  };

  const handleClick = () => {
    const newProductAtCart = [...cartItems, product];

    setLocalStorage('productsAtCart', newProductAtCart);
    setCartItems(newProductAtCart);
  };

  useEffect(() => {
    fetchProduct();
    getEvaluations();
  }, []);

  return (
    <div className="product-details-container">
      <Header />

      <main className="product-details-main-container">
        <Link to="/" className="back-link">Voltar</Link>

        <section className="container-flex">
          {
            product.id && (
              <div className="item-details-container">
                <div className="name-image-container">
                  <p data-testid="product-detail-name" className="product-name">
                    { product.title }
                  </p>

                  <img
                    src={ product.thumbnail }
                    data-testid="product-detail-image"
                    alt="Product"
                    className="image-details-container"
                  />
                </div>

                <div className="item-infos">
                  <p data-testid="product-detail-price" className="item-price">
                    { `R$ ${product.price}` }
                  </p>

                  {
                    product.shipping.free_shipping
                      && (
                        <p data-testid="free-shipping" className="product-shipping">
                          Frete grátis
                        </p>
                      )
                  }

                  <a
                    data-testid="product-detail-link"
                    href={ product.permalink }
                    className="btn btn-dark product-link"
                  >
                    Ver oferta
                  </a>

                  <button
                    type="button"
                    data-testid="product-detail-add-to-cart"
                    onClick={ handleClick }
                    className="btn btn-primary add-btn"
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            )
          }

          <div className="evaluation-field">
            <h2>Avaliação</h2>
            <EvaluationForm product={ product } />
          </div>
        </section>
        <section className="rating-section">
          {
            product.id ? productEvaluations.filter((evals) => evals.id === product.id)
              .map((review, i) => (
                <section key={ `review-${review.id}-${i}` }>
                  <p data-testid="review-card-email" className="user-email">
                    {review.email}
                  </p>
                  <p data-testid="review-card-evaluation" className="product-desc">
                    { review.description }
                  </p>
                  <div data-testid="review-card-rating">
                    {
                      ['1', '2', '3', '4', '5'].map((rate, index) => {
                        if (rate <= review.rate) {
                          return (
                            <AiFillStar
                              key={ `Rate-${rate}-${index}` }
                              className="star-icon"
                            />
                          );
                        }
                        return (
                          <AiOutlineStar
                            key={ `Rate-${rate}-${index}` }
                            className="star-icon"
                          />
                        );
                      })
                    }
                  </div>
                  <hr />
                </section>
              )) : true
          }
        </section>
      </main>
    </div>
  );
}

export default ProductDetails;

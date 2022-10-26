import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import StoreContext from '../context/StoreContext';
import { getProduct } from '../services/api';
import { setLocalStorage, getLocalStorage } from '../services/storage';
import Header from '../components/Header';
import EvaluationForm from '../components/EvaluationForm';

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
    <div>
      <Header />

      <main>
        {
          product.id && (
            <div>
              <p data-testid="product-detail-name">
                { product.title }
              </p>

              <img
                src={ product.thumbnail }
                data-testid="product-detail-image"
                alt="Product"
              />

              <p data-testid="product-detail-price">
                { product.price }
              </p>

              <a
                data-testid="product-detail-link"
                href={ product.permalink }
              >
                link
              </a>

              {
                product.shipping.free_shipping
                  && <p data-testid="free-shipping">Frete grátis</p>
              }

              <button
                type="button"
                data-testid="product-detail-add-to-cart"
                onClick={ handleClick }
              >
                Adicionar ao carrinho
              </button>
            </div>
          )
        }

        <EvaluationForm product={ product } />

        {
          product.id ? productEvaluations.filter((evals) => evals.id === product.id)
            .map((review, i) => (
              <section key={ `review-${review.id}-${i}` }>
                <p data-testid="review-card-email">
                  {review.email}
                </p>
                <p data-testid="review-card-evaluation">
                  { review.description }
                </p>
                <div data-testid="review-card-rating">
                  {
                    ['1', '2', '3', '4', '5'].map((rate, index) => {
                      if (rate <= review.rate) {
                        return (
                          <input
                            key={ `Rate-${rate}-${index}` }
                            type="checkbox"
                            checked
                          />
                        );
                      }
                      return (
                        <input
                          key={ `Rate-${rate}-${index}` }
                          type="checkbox"
                          checked={ false }
                        />
                      );
                    })
                  }
                </div>
              </section>
            )) : true
        }
      </main>
    </div>
  );
}

export default ProductDetails;

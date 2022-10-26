import React, { useState, useEffect, useContext } from 'react';
import { getCategories } from '../services/api';
import StoreContext from '../context/StoreContext';
import CategoryButton from '../components/CategoryButton';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

function Home() {
  const { productList, productNotFound } = useContext(StoreContext);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const allCategories = await getCategories();
    setCategories(allCategories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <Header />

      <main>
        <aside>
          {
            categories.map((category) => (
              <CategoryButton
                key={ category.name }
                id={ category.id }
                category={ category.name }
              />
            ))
          }
        </aside>

        {
          productNotFound ? <div>Nenhum produto foi encontrado</div> : (
            <section>
              {
                productList[0] ? productList.map((product, i) => (
                  <ProductCard key={ `${product.id}-${i}` } product={ product } />
                )) : (
                  <p data-testid="home-initial-message">
                    Digite algum termo de pesquisa ou escolha uma categoria.
                  </p>
                )
              }
            </section>
          )
        }

      </main>
    </div>
  );
}

export default Home;

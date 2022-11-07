import React, { useState, useEffect, useContext } from 'react';
import { getCategories } from '../services/api';
import StoreContext from '../context/StoreContext';
import CategoryButton from '../components/CategoryButton';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';

function Home() {
  const { productList } = useContext(StoreContext);

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const allCategories = await getCategories();
    setCategories(allCategories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="home-container">
      <Header />

      <main className="home-main-container">
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

        <section className="home-products-container">
          {
            productList[0] ? productList.map((product, i) => (
              <ProductCard key={ `${product.id}-${i}` } product={ product } />
            )) : (
              <p data-testid="home-initial-message" className="home-initial-phrase">
                Digite algum termo de pesquisa ou escolha uma categoria
              </p>
            )
          }
        </section>

      </main>
    </div>
  );
}

export default Home;

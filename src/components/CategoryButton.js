import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import StoreContext from '../context/StoreContext';
import { getProductsFromCategoryAndQuery } from '../services/api';
import '../styles/CategoryButton.css';

function CategoryButton({ category, id }) {
  const { setProductList } = useContext(StoreContext);

  const fetchCategory = async () => {
    const data = await getProductsFromCategoryAndQuery(id);
    setProductList(data ? data.results : []);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="category"
        className="btn btn-dark category-btn"
        onClick={ fetchCategory }
        value={ id }
      >
        { category }
      </button>
    </div>
  );
}

CategoryButton.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default CategoryButton;

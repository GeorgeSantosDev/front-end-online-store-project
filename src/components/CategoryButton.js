import React from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';

function CategoryButton({ category, id }) {
  const fetchCategory = async () => {
    const data = await getProductsFromCategoryAndQuery(id);
    return data;
  };

  return (
    <div>
      <button
        type="button"
        data-testid="category"
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Category extends Component {
  render() {
    const { fetchCategory, name, id } = this.props;
    return (
      <button
        type="button"
        data-testid="category"
        name="category"
        onClick={ fetchCategory }
        value={ id }
      >
        { name }
      </button>
    );
  }
}

Category.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fetchCategory: PropTypes.func.isRequired,
};

export default Category;

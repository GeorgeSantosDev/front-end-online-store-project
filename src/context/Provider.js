import React from 'react';
import PropTypes from 'prop-types';
import StoreContext from './StoreContext';

function Provider({ children }) {
  const contextValues = {
    set: 'Provider',
  };

  return (
    <StoreContext.Provider value={ contextValues }>
      { children }
    </StoreContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

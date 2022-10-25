import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { setLocalStorage, getLocalStorage } from '../services/storage';
import StoreContext from '../context/StoreContext';

function EvaluationForm({ product }) {
  const { setProductEvaluations } = useContext(StoreContext);

  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [rate, setRate] = useState('');

  const inputs = {
    email: setEmail,
    description: setDescription,
    ratting: setRate,
  };

  const handleChange = ({ target: { value, name } }) => {
    inputs[name](value);
  };

  const handleClick = () => {
    const evaluations = getLocalStorage('evaluations');
    const evaluation = { email, description, rate, id: product.id };
    const newEvaluation = evaluations ? [...evaluations, evaluation]
      : [evaluation];

    setLocalStorage('evaluations', newEvaluation);

    setProductEvaluations(newEvaluation);
    setEmail('');
    setDescription('');
    setRate('');
  };

  const rateValidation = !rate;

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const emailValidation = !emailRegex.test(email);

  return (
    <form>
      <label htmlFor="email">
        Email
        <input
          type="text"
          data-testid="product-detail-email"
          onChange={ handleChange }
          id="email"
          name="email"
          value={ email }
          required
        />
      </label>
      <textarea
        data-testid="product-detail-evaluation"
        rows="5"
        cols="20"
        onChange={ handleChange }
        id="description"
        name="description"
        value={ description }
      />
      <input
        type="radio"
        data-testid="1-rating"
        name="ratting"
        onChange={ handleChange }
        value="1"
        checked={ rate === '1' }
      />
      <input
        type="radio"
        data-testid="2-rating"
        name="ratting"
        onChange={ handleChange }
        value="2"
        checked={ rate === '2' }
      />
      <input
        type="radio"
        data-testid="3-rating"
        name="ratting"
        onChange={ handleChange }
        value="3"
        checked={ rate === '3' }
      />
      <input
        type="radio"
        data-testid="4-rating"
        name="ratting"
        onChange={ handleChange }
        value="4"
        checked={ rate === '4' }
      />
      <input
        type="radio"
        data-testid="5-rating"
        name="ratting"
        onChange={ handleChange }
        value="5"
        checked={ rate === '5' }
      />

      <button
        type="submit"
        data-testid="submit-review-btn"
        onClick={ handleClick }
        disabled={ emailValidation || rateValidation }
      >
        Avaliar
      </button>
    </form>
  );
}

EvaluationForm.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default EvaluationForm;

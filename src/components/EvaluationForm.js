import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { setLocalStorage, getLocalStorage } from '../services/storage';
import StoreContext from '../context/StoreContext';
import '../styles/EvaluationForm.css';

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
    <form className="evaluation-form">
      <label htmlFor="email" className="evaluation-size">
        <input
          type="text"
          data-testid="product-detail-email"
          onChange={ handleChange }
          id="email"
          className="form-control"
          placeholder="Email"
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
        className="form-control evaluation-size"
        placeholder="Descrição"
        name="description"
        value={ description }
      />

      <div className="rating-container">
        <labe htmlFor="1">
          <input
            type="radio"
            id="1"
            data-testid="1-rating"
            name="ratting"
            onChange={ handleChange }
            value="1"
            checked={ rate === '1' }
          />
          1
        </labe>
        <labe htmlFor="2">
          <input
            type="radio"
            id="2"
            data-testid="2-rating"
            name="ratting"
            onChange={ handleChange }
            value="2"
            checked={ rate === '2' }
          />
          2
        </labe>
        <labe htmlFor="3">
          <input
            type="radio"
            id="3"
            data-testid="3-rating"
            name="ratting"
            onChange={ handleChange }
            value="3"
            checked={ rate === '3' }
          />
          3
        </labe>
        <labe htmlFor="4">
          <input
            type="radio"
            id="4"
            data-testid="4-rating"
            name="ratting"
            onChange={ handleChange }
            value="4"
            checked={ rate === '4' }
          />
          4
        </labe>
        <labe htmlFor="5">
          <input
            type="radio"
            id="5"
            data-testid="5-rating"
            name="ratting"
            onChange={ handleChange }
            value="5"
            checked={ rate === '5' }
          />
          5
        </labe>
      </div>

      <button
        type="submit"
        data-testid="submit-review-btn"
        className="evaluation-btn-size btn btn-primary"
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

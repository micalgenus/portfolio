import React from 'react';
import ReactDOM from 'react-dom';
import Introduce from './Introduce';

describe('Introduce', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Introduce />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

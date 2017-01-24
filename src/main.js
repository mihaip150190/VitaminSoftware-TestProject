import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import Chart from './Chart-v2';
import 'react-select/dist/react-select.css';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(Chart),
    document.getElementById('mount')
  );
});
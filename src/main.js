import 'bootstrap/dist/css/bootstrap.css';
import 'rc-checkbox/assets/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './ChartComponent';


document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(Chart),
    document.getElementById('mount')
  );
});
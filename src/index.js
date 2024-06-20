import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Components/Router';
import AntdConfig from './Components/AntdConfig';
import './stylesheets/general_style.css'
import './stylesheets/style.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AntdConfig>
    <Router />
  </AntdConfig>
);

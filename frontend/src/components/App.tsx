import React from 'react';
import { ContainerCategories } from './behavior/categories/ContainerCategories';
import 'mdb-ui-kit/css/mdb.min.css';
require('mdb-ui-kit')



function App() {
  //@TODO read from .env
  const imagesBaseUrl = 'http://localhost:3000/images/';

  return (
    <div className="App">
      <ContainerCategories
        imagesBaseUrl={imagesBaseUrl}
      />
    </div>
  );
}

export default App;

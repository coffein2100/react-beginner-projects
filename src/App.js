import React from 'react';
import './index.scss';
import {Collection} from './Collection';

const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
];

function App() {
  const [categoryId, setCotegoryId] = React.useState(0);
  const [serchValue, setSerchValue] = React.useState('');
  const [collections, setCollections ] = React.useState([]);
  const [isLoading, setIsLoading ] = React.useState(true);
  const [page, setPage ] = React.useState(1);

React.useEffect ( () => {
  setIsLoading(true);

  const category = categoryId ? `category=${categoryId}` : '';

  fetch(`https://663284dec51e14d69564b3a5.mockapi.io/photo?page=${page}&limit=2&${category}`)
  .then (res => res.json())
  .then(json => {
    setCollections(json);
  }).catch(err =>{
    console.warn(err);
    alert('Ошибка получения пользователей');
  }).finally(() => {
    setIsLoading(false);
  })
}, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj, i) => 
            <li onClick={() => setCotegoryId(i)} className={categoryId === i ? 'active' : ''} key={obj.name}>{obj.name}</li>)
          }
        </ul>
        <input value={serchValue} onChange={e => setSerchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? (
        <h2>Идет загрузка...</h2>
        ) : (
          collections.filter(obj => {return obj.name.toLowerCase().includes(serchValue.toLowerCase());}).map((obj, index) => (
  <Collection key={index} name={obj.name} images={obj.photos} />
        )))}
      </div>
      <ul className="pagination">
        {
          [...Array(4)].map((_, i) => <li onClick={() => setPage(i + 1 )} className={page === i  + 1? 'active' : ''}>{i+1}</li>
          )}

      </ul>
    </div>
  );
}

export default App;

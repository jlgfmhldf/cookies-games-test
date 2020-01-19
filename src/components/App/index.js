import React, { useState } from 'react';
import { getArticles } from '../../api';
import Article from '../Article'
import Pagination from "../Pagination";
import { usePrevious } from "./helpers";
import './style.css';


function App() {
  const initialCount = 12;

  const articlesInitialState = {
    count: 0,
    items: [],
  };

  const [id, setID] = useState('');
  const prevId = usePrevious(id)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadOffset, setLoadOffset] = useState(0);
  const [articles, setArticles] = useState(articlesInitialState);


  const loadArticles = () => {
    getArticles({ id, count: initialCount, offset: loadOffset })
      .then(data => {
        if (data.error) {
          setError(data.error.error_msg);
        }

        if (data.response) {
          const { items, count } = data.response;

          setArticles({ items, count });
        }

      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const handleFormSubmit = event  => {
    event.preventDefault();

    if (id === prevId) {
      return;
    }

    setLoading(true);
    setError('');
    setArticles(articlesInitialState);


    loadArticles();
  }

  const handleChangeID = ({ target }) => {
    setLoadOffset(0);
    setID(target.value);
  }


  const handlePaginationBtnClick = (type) => {
    let offset = undefined;

    if (type === 'prev') {
      offset = loadOffset - initialCount;
    }

    if (type === 'next') {
      offset = loadOffset + initialCount;
    }

    setArticles({
      ...articles,
      items: [],
    });

    setLoading(true);
    setLoadOffset(offset);

    console.log(loadOffset, loading);

    loadArticles();
  }


  const renderArticles = ({
    id: articleID,
    owner_id,
    copy_history,
    text,
    attachments
   }) => {
    const props = {
      text,
      link: `https://vk.com/wall${owner_id}_${articleID}`
    };

    // Не вывожу репост
    if (copy_history) {
      return;
    }


    if (attachments) {
      const images = attachments.find(({ type }) => type === 'photo');
      const link = attachments.find(({ type }) => type === 'link');

      if (images) {
        const imagesSizes = images.photo.sizes;
        const imageR = imagesSizes.find(({type}) => type === 'r');


        props.image = (imageR && imageR.url) || (imagesSizes[3] && imagesSizes[3].url);
      }

      if (link) {
        props.additionalLink = link.link.url;
      }

    }

    return (
      <div className="App-article" key={articleID}>
        <Article {...props} />
      </div>
    )
  }

  return (
    <div className="App">
      <div className="container">
        <form className="App-form" onSubmit={handleFormSubmit}>

          <div className="field  is-grouped">
            <div className="control is-expanded">
              <input type="text" className="input" placeholder="ID пользователя или группы Вконтакте" onChange={handleChangeID}/>
            </div>
            <div className="control">
              <button className="button is-link" onClick={handleFormSubmit}>Submit</button>
            </div>
          </div>
        </form>


        {loadOffset}

        {!!articles.items.length && <div className="App-articles ">
          {articles.items.map(renderArticles)}
        </div>}

        {!id && <div className="App-status">
          Пока здесь ничего нет, введите ID в текстовое поле выше :)
        </div>}

        {loading && <div className="App-status">
          Загрузка...
        </div>}

        {error && <div className="App-status App-status--error ">
          {error}
        </div>}


        {!!articles.items.length && <div className="App-pagination">
          <Pagination
            onBtnClick={handlePaginationBtnClick}
            prevDisabled={loadOffset <= 0}
            nextDisabled={loadOffset >= articles.count}
          />
        </div>}


      </div>
    </div>
  );
}

export default App;

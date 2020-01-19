import React, { useState, useRef, useEffect } from 'react';
import { getArticles } from '../../api';
import Article from '../Article'
import Pagination from "../Pagination";
import './style.css';

function App() {
  const [id, setID] = useState('');
  const prevId = usePrevious(id)
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [articles, setArticles] = useState({});
  const initialCount = 12;
  const [loadOffset, setLoadOffset] = useState(0);
  const articlesCount = articles.length;

  const loadArticles = () => {
    getArticles({ id, count: initialCount, offset: loadOffset })
      .then(data => {
        if (data.error) {
          setError(data.error.error_msg);
        }

        if (data.response) {
          setArticles(data.response.items)
        }

      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleFormSubmit = event  => {
    event.preventDefault();

    if (id === prevId) {
      return;
    }

    setLoadOffset(initialCount);
    setIsLoading(true);
    setError('');
    setArticles({})

    loadArticles();
  }

  const handleChangeID = ({ target }) => {
    setID(target.value);
  }

  const handlePaginationBtnClick = (type) => {
    if (type === 'prev') {
      setLoadOffset(loadOffset - initialCount)
    }

    if (type === 'next') {
      setLoadOffset(loadOffset + initialCount)
    }

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

        {articlesCount && <div className="App-articles ">
          {articles.map(renderArticles)}
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


        {articlesCount && <div className="App-pagination">
          <Pagination
            onBtnClick={handlePaginationBtnClick}
            prevDisabled={loadOffset < 0}
            nextDisabled={loadOffset > articlesCount}
          />
        </div>}
      </div>
    </div>
  );
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default App;

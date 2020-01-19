import React, { useState, useRef, useEffect } from 'react';
import { getArticles } from '../../api';
import Article from '../Article'
import './style.css';

function App() {
  const [id, setID] = useState('');
  const prevId = usePrevious(id)
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [articles, setArticles] = useState({})

  const handleFormSubmit = event  => {
    event.preventDefault();

    if (id === prevId) {
      return;
    }

    setIsLoading(true);
    setError('');
    setArticles({})

    getArticles({ id, count: 12 })
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

  const handleChangeID = ({ target }) => {
    setID(target.value);
  }

  const renderArticles = ({
    id: articleID,
    owner_id,
    text,
    attachments
   }) => {
    const props = {
      text,
      link: `https://vk.com/wall${owner_id}_${articleID}`
    };

    if (attachments) {
      const image = attachments.find(({ type }) => type === 'photo');
      const link = attachments.find(({ type }) => type === 'link')

      if (image) {
        props.image = image.photo.sizes.find(({type}) => type === 'r').url;
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

        {articles.length && <div className="App-articles ">
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

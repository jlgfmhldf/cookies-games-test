import React, { useState } from 'react';
import { getArticles } from '../../api';
import './style.css';
import 'bulma/css/bulma.css'

function Index() {
  const [id, setID] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [articles, setArticles] = useState({})

  const handleFormSubmit = event  => {
    event.preventDefault();

    setIsLoading(true);
    setError('');
    setArticles({})

    getArticles({ id, count: 20 })
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

  return (
    <div className="App">
      <div className="container">
        <form className="App-form" onSubmit={handleFormSubmit}>

          <div className="field is-grouped">
            <div className="control">
              <input type="text" className="input" placeholder="ID пользователя или группы Вконтакте" onChange={handleChangeID}/>
            </div>
            <div className="control">
              <button className="button is-link" onClick={handleFormSubmit}>Submit</button>
            </div>
          </div>
        </form>

        {articles.length && <div className="App-articles">
          {articles.length}
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

export default Index;

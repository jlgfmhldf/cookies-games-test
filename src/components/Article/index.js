import React from 'react';
import './style.css';


function Article({
  text,
  link,
  additionalLink,
  image,
}) {
  return <a href={link} target="_blank" rel="noopener noreferrer" className="Article card">

    <div className="card-content">
      {additionalLink && <p className="title is-4">{additionalLink}</p>}

      {text && <div className="Article-text content">
        {text}
      </div>}
    </div>

    {image && <div className="card-image">
      <figure className="image">
        <img src={image} alt="" />
      </figure>
    </div>}
  </a>
}

export default Article;

import React from 'react';
import './style.css';


function Article({
  text,
  link,
  additionalLink,
  image,
}) {
  return <a href="TODO" target="_blank"  className="Article card">

    <div className="card-content">
      <div className="Article-text content">
        {text && text}
      </div>
    </div>

    {image && <div className="card-image">
      <figure className="image">
        <img src={image} alt="Placeholder image" />
      </figure>
    </div>}
  </a>
}

export default Article;

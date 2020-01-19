import React from 'react';
import './style.css';


function Article({
  text,
  link,
  additionalLink,
  image,
}) {
  return <a href={link} target="_blank"  className="Article card">

    <div className="card-content">
      {additionalLink && <p className="title is-4">{additionalLink}</p>}

      {text && <div className="Article-text content">
        {text}
      </div>}
    </div>

    {image && <div className="card-image">
      <figure className="image">
        <img src={image} alt="Placeholder image" />
      </figure>
    </div>}
  </a>
}

export default Article;

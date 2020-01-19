import React from 'react';
import './style.css';


function Pagination({
  onBtnClick,
  prevDisabled,
  nextDisabled
}) {

  const handlePrevClick = () => {
    onBtnClick('prev')
  }

  const handleNextClick = () => {
    onBtnClick('next')
  }

  return <nav className="pagination" role="navigation" aria-label="pagination">
    <a className="pagination-previous" onClick={handlePrevClick} disabled={prevDisabled}>Назад</a>
    <a className="pagination-next" onClick={handleNextClick} disabled={nextDisabled}>Вперёд</a>

  </nav>
}

export default Pagination;

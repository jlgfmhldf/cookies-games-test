import React from 'react';
import './style.css';


function Pagination({
  onBtnClick,
  prevDisabled,
  nextDisabled
}) {

  const handlePrevClick = () => {
    if (!prevDisabled) {
      onBtnClick('prev')
    }
  }

  const handleNextClick = () => {
    if (!nextDisabled) {
      onBtnClick('next')
    }
  }

  return <nav className="pagination" role="navigation" aria-label="pagination">
    <button className="pagination-previous" onClick={handlePrevClick} disabled={prevDisabled}>Назад</button>
    <button className="pagination-next" onClick={handleNextClick} disabled={nextDisabled}>Вперёд</button>

  </nav>
}

export default Pagination;

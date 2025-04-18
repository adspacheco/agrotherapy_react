import React, { useState } from "react";

const RatingSystem = ({ initialValue = 0, onChange, readOnly = false }) => {
  const [rating, setRating] = useState(initialValue);
  const [hover, setHover] = useState(null);

  const handleRatingChange = (newRating) => {
    if (readOnly) return;

    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  return (
    <div className="rating-container">
      <div className="d-flex align-items-center mb-2">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;

          return (
            <button
              type="button"
              key={index}
              className={`btn btn-link p-0 m-0 me-1 rating-star ${
                (hover || rating) >= ratingValue ? "text-warning" : "text-muted"
              }`}
              onClick={() => handleRatingChange(ratingValue)}
              onMouseEnter={() => !readOnly && setHover(ratingValue)}
              onMouseLeave={() => !readOnly && setHover(null)}
              disabled={readOnly}
              aria-label={`${ratingValue} ${
                ratingValue === 1 ? "estrela" : "estrelas"
              }`}
              style={{ cursor: readOnly ? "default" : "pointer" }}
            >
              <i className="bi bi-star-fill fs-4"></i>
            </button>
          );
        })}
        <span className="ms-2">
          {!readOnly && (
            <span className={hover || rating ? "text-success" : "text-danger"}>
              {hover || rating || "Clique para avaliar"}
            </span>
          )}
          {readOnly && rating > 0 && (
            <span className="text-muted">({rating})</span>
          )}
        </span>
      </div>
      {!readOnly && (
        <div className="rating-help text-muted small mb-3">
          <em>
            Clique nas estrelas acima para selecionar sua pontuação de 1 a 5
          </em>
        </div>
      )}
    </div>
  );
};

export default RatingSystem;

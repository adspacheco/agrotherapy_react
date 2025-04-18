import React, { useState } from "react";
import RatingSystem from "./RatingSystem";
import useRating from "../hooks/useRating";

const PropertyRatings = ({ propertyId, propertyName }) => {
  const {
    ratings,
    userRating,
    handleRatingChange,
    submitRating,
    getAverageRating,
    submitted,
    setSubmitted,
  } = useRating(propertyId);

  const [showForm, setShowForm] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    if (userRating.score === 0) {
      setValidationError(
        "Por favor, selecione uma pontuação de 1 a 5 estrelas."
      );
      return;
    }

    if (!userRating.name || !userRating.email || !userRating.comment) {
      setValidationError("Por favor, preencha todos os campos do formulário.");
      return;
    }

    submitRating(e);
  };

  return (
    <div className="property-ratings my-4">
      <h3 className="mb-3">Avaliações de {propertyName}</h3>

      <div className="ratings-summary d-flex align-items-center mb-4">
        <div className="ratings-average me-3">
          <span className="display-4 fw-bold text-success">
            {getAverageRating()}
          </span>
          <span className="text-muted ms-2">/ 5</span>
        </div>
        <div className="ratings-stars me-3">
          <RatingSystem
            initialValue={parseFloat(getAverageRating())}
            readOnly={true}
          />
        </div>
        <div className="ratings-count text-muted">
          ({ratings.length} {ratings.length === 1 ? "avaliação" : "avaliações"})
        </div>
      </div>

      {ratings.length > 0 ? (
        <div className="ratings-list mb-4">
          {ratings.map((rating) => (
            <div key={rating.id} className="rating-item card mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 className="h6 mb-0">{rating.name}</h4>
                  <small className="text-muted">{rating.date}</small>
                </div>
                <div className="mb-2">
                  <RatingSystem initialValue={rating.score} readOnly={true} />
                </div>
                <p className="card-text mb-0">{rating.comment}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted mb-4">
          Ainda não há avaliações para esta propriedade.
        </p>
      )}

      {!showForm && !submitted && (
        <button
          className="btn btn-outline-success mb-4"
          onClick={() => setShowForm(true)}
        >
          Avaliar esta propriedade
        </button>
      )}

      {showForm && !submitted && (
        <div className="rating-form card mb-4">
          <div className="card-header bg-success bg-gradient text-white">
            <h3 className="h5 mb-0">Deixe sua avaliação</h3>
          </div>
          <div className="card-body">
            {validationError && (
              <div className="alert alert-danger" role="alert">
                {validationError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="ratingScore" className="form-label fw-bold">
                  Sua avaliação *
                </label>
                <RatingSystem
                  initialValue={userRating.score}
                  onChange={(value) => handleRatingChange("score", value)}
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="ratingName" className="form-label">
                    Nome *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ratingName"
                    value={userRating.name}
                    onChange={(e) => handleRatingChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="ratingEmail" className="form-label">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="ratingEmail"
                    value={userRating.email}
                    onChange={(e) =>
                      handleRatingChange("email", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="ratingComment" className="form-label">
                  Comentário *
                </label>
                <textarea
                  className="form-control"
                  id="ratingComment"
                  rows="3"
                  value={userRating.comment}
                  onChange={(e) =>
                    handleRatingChange("comment", e.target.value)
                  }
                  required
                ></textarea>
              </div>
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-success">
                  Enviar Avaliação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {submitted && (
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Avaliação enviada com sucesso!</h4>
          <p>Agradecemos por compartilhar sua experiência.</p>
          <hr />
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => {
                setSubmitted(false);
                setShowForm(false);
              }}
            >
              Enviar outra avaliação
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyRatings;

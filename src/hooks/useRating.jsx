import { useState, useEffect } from "react";

const useRating = (propertyId) => {
  const [ratings, setRatings] = useState([]);
  const [userRating, setUserRating] = useState({
    score: 0,
    comment: "",
    name: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (propertyId === 1) {
      setRatings([
        {
          id: 1,
          propertyId: 1,
          name: "João Silva",
          score: 5,
          comment:
            "Excelente experiência para meu filho! O contato com os animais foi muito benéfico.",
          date: "2025-04-15",
        },
        {
          id: 2,
          propertyId: 1,
          name: "Maria Oliveira",
          score: 4,
          comment: "Adoramos o passeio, muito bem organizado e acolhedor.",
          date: "2025-03-02",
        },
      ]);
    }
  }, [propertyId]);

  const handleRatingChange = (name, value) => {
    setUserRating((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitRating = (e) => {
    e.preventDefault();

    const newRating = {
      id: ratings.length + 1,
      propertyId,
      name: userRating.name,
      score: userRating.score,
      comment: userRating.comment,
      date: new Date().toISOString().split("T")[0],
    };

    setRatings((prev) => [...prev, newRating]);

    setUserRating({
      score: 0,
      comment: "",
      name: "",
      email: "",
    });

    setSubmitted(true);
  };

  const getAverageRating = () => {
    if (ratings.length === 0) return 0;

    const sum = ratings.reduce((acc, rating) => acc + rating.score, 0);
    return (sum / ratings.length).toFixed(1);
  };

  return {
    ratings,
    userRating,
    handleRatingChange,
    submitRating,
    getAverageRating,
    submitted,
    setSubmitted,
  };
};

export default useRating;

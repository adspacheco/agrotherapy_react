import React, { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);

  const [ratings, setRatings] = useState([]);

  const [bookings, setBookings] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const initialProperties = [
      {
        id: 1,
        name: "Sítio Feliz",
        type: "Fazendinha",
        description:
          "Um espaço lúdico e acolhedor onde crianças podem descobrir o mundo rural e os animais da fazenda.",
        status: "Disponível",
      },
      {
        id: 2,
        name: "Rancho Azul",
        type: "Equoterapia",
        description:
          "Especializado em terapias com cavalos, aqui crianças desenvolvem coordenação e autoconfiança.",
        status: "Em Breve",
      },
      {
        id: 3,
        name: "Recanto Rural",
        type: "Plantação",
        description:
          "Aqui você vai encontrar cultivo de hortas e jardins sensoriais, desenvolvendo várias habilidades.",
        status: "Em Breve",
      },
      {
        id: 4,
        name: "Fazenda do Lago",
        type: "Hidroterapia",
        description:
          "Terapias aquáticas com a vida rural, permitindo que as crianças se desenvolvam no nosso lago.",
        status: "Em Breve",
      },
    ];

    const initialRatings = [
      {
        id: 1,
        propertyId: 1,
        userId: "user123",
        name: "João Silva",
        score: 5,
        comment:
          "Excelente experiência para meu filho! O contato com os animais foi muito benéfico.",
        date: "2025-04-15",
      },
      {
        id: 2,
        propertyId: 1,
        userId: "user456",
        name: "Maria Oliveira",
        score: 4,
        comment: "Adoramos o passeio, muito bem organizado e acolhedor.",
        date: "2025-03-02",
      },
    ];

    setProperties(initialProperties);
    setRatings(initialRatings);
  }, []);

  const addRating = (newRating) => {
    const ratingWithId = {
      ...newRating,
      id: ratings.length + 1,
      date: new Date().toISOString().split("T")[0],
    };

    setRatings([...ratings, ratingWithId]);
    return ratingWithId;
  };

  const getPropertyAverageRating = (propertyId) => {
    const propertyRatings = ratings.filter(
      (rating) => rating.propertyId === propertyId
    );

    if (propertyRatings.length === 0) return 0;

    const sum = propertyRatings.reduce((acc, rating) => acc + rating.score, 0);
    return (sum / propertyRatings.length).toFixed(1);
  };

  const getPropertyRatings = (propertyId) => {
    return ratings.filter((rating) => rating.propertyId === propertyId);
  };

  const addBooking = (newBooking) => {
    const bookingWithId = {
      ...newBooking,
      id: bookings.length + 1,
      status: "Pendente",
      createdAt: new Date().toISOString(),
    };

    setBookings([...bookings, bookingWithId]);
    return bookingWithId;
  };

  const getPropertyById = (propertyId) => {
    return properties.find((property) => property.id === parseInt(propertyId));
  };

  const contextValue = {
    properties,
    ratings,
    bookings,
    currentUser,
    addRating,
    getPropertyAverageRating,
    getPropertyRatings,
    addBooking,
    getPropertyById,
    setCurrentUser,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContext;

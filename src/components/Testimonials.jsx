import React, { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Família Silva",
    text: "A experiência no Sítio Feliz foi transformadora para nosso filho com autismo. O contato com os animais ajudou na socialização dele de forma impressionante!",
  },
  {
    id: 2,
    name: "Maria Santos",
    text: "Minha filha sempre teve dificuldade de concentração. As atividades na fazenda ajudaram ela a desenvolver foco e paciência. Recomendo para todas as famílias!",
  },
  {
    id: 3,
    name: "Pedro e Juliana",
    text: "Buscávamos uma alternativa às terapias tradicionais. Encontramos no AgroTherapy um ambiente natural que complementou perfeitamente o tratamento do nosso filho.",
  },
];

const TestimonialCard = ({ testimonial, isActive }) => {
  return (
    <div className={`carousel-item ${isActive ? "active" : ""}`} role="tabpanel">
      <div className="card border-0 bg-light p-4 h-100">
        <div className="d-flex align-items-center mb-3">
          <div className="flex-shrink-0">
            <img
              src="https://placehold.co/50"
              alt={`Foto de ${testimonial.name}`}
              className="rounded-circle"
              width={60}
              height={60}
            />
          </div>
          <div className="flex-grow-1 ms-3">
            <h3 className="h5 mb-0">{testimonial.name}</h3>
          </div>
        </div>
        <p className="card-text fst-italic mb-0">"{testimonial.text}"</p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="container my-5" aria-labelledby="testimonials-title" role="region">
      <h2 id="testimonials-title" className="text-center m-5">
        Depoimentos de Famílias
      </h2>
      <div id="testimonialCarousel" className="carousel slide" data-bs-ride="false">
        <div className="carousel-inner">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} isActive={index === activeIndex} />
          ))}
        </div>
        <div className="carousel-controls mt-4 d-flex justify-content-center">
          <button type="button" className="btn btn-success me-2" onClick={handlePrev}>
            Anterior
          </button>
          <button type="button" className="btn btn-success" onClick={handleNext}>
            Próximo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
import React, { useState } from "react";
import sitio_feliz from "./../assets/images/sitio-feliz.svg";
import rancho from "./../assets/images/rancho-azul.svg";
import recanto_rural from "./../assets/images/recanto-rural.svg";
import fazenda_do_lago from "./../assets/images/fazenda-do-lago.svg";

const properties = [
  {
    id: 1,
    name: "Sítio Feliz",
    type: "Fazendinha",
    description: "Um espaço lúdico e acolhedor onde crianças podem descobrir o mundo rural e os animais da fazenda.",
    img: sitio_feliz,
    status: "Disponível",
    show_modal: true,
  },
  {
    id: 2,
    name: "Rancho Azul",
    type: "Equoterapia",
    description: "Especializado em terapias com cavalos, aqui crianças desenvolvem coordenação e autoconfiança.",
    img: rancho,
    status: "Em Breve",
    show_modal: false,
  },
  {
    id: 3,
    name: "Recanto Rural",
    type: "Plantação",
    description: "Aqui você vai encontrar cultivo de hortas e jardins sensoriais, desenvolvendo várias habilidades.",
    img: recanto_rural,
    status: "Em Breve",
    show_modal: false,
  },
  {
    id: 4,
    name: "Fazenda do Lago",
    type: "Hidroterapia",
    description: "Terapias aquáticas com a vida rural, permitindo que as crianças se desenvolvam no nosso lago.",
    img: fazenda_do_lago,
    status: "Em Breve",
    show_modal: false,
  },
];

const FeaturedProperties = () => {
    const [selectedProperty, setSelectedProperty] = useState(null);
  
    return (
      <section className="container mb-5" aria-labelledby="properties-title" role="region">
        <h2 id="properties-title" className="text-center m-5">Propriedades Rurais em Destaque</h2>
        <div className="row g-4">
          {properties.map((property) => (
            <div key={property.id} className="col-12 col-sm-6 col-lg-3">
              <a
                href="#"
                className="text-decoration-none"
                data-bs-toggle="modal"
                data-bs-target={`#${property.id}`}
                onClick={() => setSelectedProperty(property)}
              >
                <div className="card h-100">
                  <div className="position-relative">
                    <img src={property.img} className="card-img-top" alt={`Foto de ${property.name}`} />
                    {property.status === "Em Breve" && (
                      <div className="position-absolute top-50 start-50 translate-middle bg-warning text-dark px-3 py-2 rounded-pill" role="status">
                        Em Breve
                      </div>
                    )}
                  </div>
                  <div className="card-body">
                    <h3 className="card-title h5">{property.name}</h3>
                    <p className="card-subtitle text-muted">{property.type}</p>
                    <p className="card-text">{property.description}</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
  
        {/* Modal */}
        {selectedProperty && (
          <div className="modal fade show d-block" id={selectedProperty.id} tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-success bg-gradient text-white">
                  <h2 className="modal-title h5">{selectedProperty.name} - Agende sua Visita</h2>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedProperty(null)} aria-label="Fechar modal"></button>
                </div>
                <div className="modal-body">
                  <p>
                    O {selectedProperty.name} é um espaço especialmente projetado para proporcionar experiências únicas de aprendizado e desenvolvimento através do contato com a natureza.
                  </p>
                  <ul>
                    <li>Alimentação dos animais</li>
                    <li>Colheita de ovos</li>
                    <li>Horta sensorial</li>
                    <li>Passeio de charrete</li>
                    <li>Ordenha didática</li>
                  </ul>
                  
                  {/* Formulário de Agendamento */}
                  <form id="agendamentoForm" className="needs-validation" noValidate>
                    <h3 className="text-success fw-bold h6 mb-3">Agende sua Visita</h3>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="nomeVisita" className="form-label">Nome Completo</label>
                        <input type="text" className="form-control" id="nomeVisita" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="emailVisita" className="form-label">E-mail</label>
                        <input type="email" className="form-control" id="emailVisita" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="dataVisita" className="form-label">Data da Visita</label>
                        <input type="date" className="form-control" id="dataVisita" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="numeroVisitantes" className="form-label">Número de Visitantes</label>
                        <input type="number" className="form-control" id="numeroVisitantes" min="1" required />
                      </div>
                      <div className="col-12">
                        <label htmlFor="observacoes" className="form-label">Observações</label>
                        <textarea className="form-control" id="observacoes" rows="3"></textarea>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedProperty(null)}>Fechar</button>
                  <button type="submit" className="btn btn-success">Agendar Visita</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  };
  
  export default FeaturedProperties;
  
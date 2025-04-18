import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PropertyRatings from "../components/PropertyRatings";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = () => {
      setLoading(true);

      const properties = [
        {
          id: 1,
          name: "Sítio Feliz",
          type: "Fazendinha",
          description:
            "Um espaço lúdico e acolhedor onde crianças podem descobrir o mundo rural e os animais da fazenda.",
          img: "/src/assets/images/sitio-feliz.svg",
          status: "Disponível",
          longDescription:
            "O Sítio Feliz é um ambiente especialmente projetado para proporcionar experiências enriquecedoras para crianças em desenvolvimento. Com área de 5 hectares, oferecemos atividades supervisionadas por profissionais especializados, incluindo alimentação de animais, colheita de vegetais na horta sensorial, passeios de charrete, e ordenha didática. Tudo isso em um ambiente seguro e acolhedor para estimular os sentidos e promover o bem-estar.",
          activities: [
            "Alimentação dos animais",
            "Colheita de ovos",
            "Horta sensorial",
            "Passeio de charrete",
            "Ordenha didática",
          ],
          address: "Estrada Rural, km 5 - Zona Rural",
          phone: "(11) 99999-9999",
          email: "contato@sitiofeliz.com.br",
        },
        {
          id: 2,
          name: "Rancho Azul",
          type: "Equoterapia",
          description:
            "Especializado em terapias com cavalos, aqui crianças desenvolvem coordenação e autoconfiança.",
          img: "/src/assets/images/rancho-azul.svg",
          status: "Em Breve",
          longDescription:
            "O Rancho Azul é especializado em equoterapia, oferecendo um ambiente tranquilo onde crianças com diferentes necessidades podem interagir com cavalos treinados. Nossa abordagem terapêutica ajuda no desenvolvimento motor, emocional e cognitivo através do vínculo com estes animais dóceis e da prática de exercícios adaptados.",
          activities: [
            "Equoterapia assistida",
            "Passeios a cavalo",
            "Cuidados com os animais",
            "Exercícios de equilíbrio",
            "Atividades sensoriais com cavalos",
          ],
          address: "Rodovia das Fazendas, km 12 - Área Rural",
          phone: "(11) 98888-8888",
          email: "contato@ranchoazul.com.br",
        },
      ];

      const foundProperty = properties.find((p) => p.id === parseInt(id));

      if (foundProperty) {
        setProperty(foundProperty);
      }

      setLoading(false);
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          <h2>Propriedade não encontrada</h2>
          <p>
            A propriedade que você está procurando não existe ou foi removida.
          </p>
          <Link to="/" className="btn btn-success mt-3">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main id="main-content" className="container my-5" role="main">
      <div className="row">
        <div className="col-lg-8">
          <h1 className="mb-3">{property.name}</h1>
          <div className="badge bg-success mb-3">{property.type}</div>

          <div className="card mb-4">
            <img
              src={property.img}
              className="card-img-top"
              alt={`Foto de ${property.name}`}
              style={{ height: "300px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h2 className="h4 mb-3">Sobre esta propriedade</h2>
              <p className="mb-4">{property.longDescription}</p>

              <h3 className="h5 mb-3">Atividades disponíveis</h3>
              <ul className="list-group mb-4">
                {property.activities.map((activity, index) => (
                  <li key={index} className="list-group-item">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <PropertyRatings
            propertyId={property.id}
            propertyName={property.name}
          />
        </div>

        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-header bg-success bg-gradient text-white">
              <h2 className="h5 mb-0">Informações de Contato</h2>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li className="mb-3">
                  <i className="bi bi-geo-alt-fill text-success me-2"></i>
                  <strong>Endereço:</strong> {property.address}
                </li>
                <li className="mb-3">
                  <i className="bi bi-telephone-fill text-success me-2"></i>
                  <strong>Telefone:</strong> {property.phone}
                </li>
                <li className="mb-3">
                  <i className="bi bi-envelope-fill text-success me-2"></i>
                  <strong>E-mail:</strong> {property.email}
                </li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-success bg-gradient text-white">
              <h2 className="h5 mb-0">Agende sua Visita</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="visitName" className="form-label">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="visitName"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="visitEmail" className="form-label">
                    E-mail
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="visitEmail"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="visitDate" className="form-label">
                    Data da Visita
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="visitDate"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="visitPeople" className="form-label">
                    Número de Visitantes
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="visitPeople"
                    min="1"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Agendar Visita
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PropertyDetail;

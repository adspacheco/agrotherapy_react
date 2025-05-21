import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PropertyRatings from "../components/PropertyRatings";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  ScaleControl,
} from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const PropertyDetail = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const [weatherNow, setWeatherNow] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [weatherError, setWeatherError] = useState(false);

  useEffect(() => {
    const load = () => {
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
            "O Sítio Feliz é um ambiente especialmente projetado para proporcionar experiências enriquecedoras para crianças em desenvolvimento. Com área de 5 hectares, oferecemos atividades supervisionadas por profissionais especializados, incluindo alimentação de animais, colheita de vegetais na horta sensorial, passeios de charrete e ordenha didática.",
          activities: [
            "Alimentação dos animais",
            "Colheita de ovos",
            "Horta sensorial",
            "Passeio de charrete",
            "Ordenha didática",
          ],
          address: "Estrada do Capivari, 500 – Capivari, Mairiporã/SP",
          phone: "(11) 99999‑9999",
          email: "contato@sitiofeliz.com.br",
          lat: -23.3689,
          lon: -46.5896,
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
            "O Rancho Azul é especializado em equoterapia, oferecendo um ambiente tranquilo onde crianças com diferentes necessidades podem interagir com cavalos treinados.",
          activities: [
            "Equoterapia assistida",
            "Passeios a cavalo",
            "Cuidados com os animais",
            "Exercícios de equilíbrio",
            "Atividades sensoriais com cavalos",
          ],
          address: "Rodovia das Fazendas, km 12 – Área Rural",
          phone: "(11) 98888‑8888",
          email: "contato@ranchoazul.com.br",
          lat: -23.6465,
          lon: -47.3343,
        },
      ];

      const found = properties.find((p) => p.id === Number(id));
      setProperty(found || null);
      setLoading(false);
    };
    load();
  }, [id]);

  useEffect(() => {
    if (!property) return;

    const fetchWeather = async () => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${property.lat}&longitude=${property.lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
        const res = await fetch(url);
        const data = await res.json();

        setWeatherNow(data.current_weather);

        // Constrói array de {date, tMax, tMin, rain}
        const daily = data.daily;
        const days = daily.time.map((d, idx) => ({
          date: d,
          tMax: daily.temperature_2m_max[idx],
          tMin: daily.temperature_2m_min[idx],
          rain: daily.precipitation_probability_max[idx],
        }));
        setForecast(days.slice(0, 5)); // próximos 5 dias
      } catch (e) {
        console.error("Erro ao buscar clima:", e);
        setWeatherError(true);
      }
    };

    fetchWeather();
  }, [property]);

  if (loading) {
    return (
      <div className="container py‑5 text-center">
        <div className="spinner-border text-success" role="status" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container py‑5">
        <div className="alert alert-warning">
          <h2>Propriedade não encontrada</h2>
          <Link to="/" className="btn btn-success mt‑3">
            Voltar
          </Link>
        </div>
      </div>
    );
  }

  const position = [property.lat, property.lon];

  return (
    <main id="main-content" className="container my-4" role="main">
      <div className="row">
        <div className="col-lg-8">
          <h1 className="mb‑3">{property.name}</h1>
          <div className="badge bg-success mb-3">{property.type}</div>

          <div className="card mb‑4">
            <img
              src={property.img}
              alt={property.name}
              className="card-img-top"
              style={{ height: 300, objectFit: "cover" }}
            />
            <div className="card-body">
              <h2 className="h4 mb‑3">Sobre esta propriedade</h2>
              <p className="mb‑4">{property.longDescription}</p>

              <h3 className="h5 mb‑3">Atividades disponíveis</h3>
              <ul className="list-group mb‑4">
                {property.activities.map((act) => (
                  <li key={act} className="list-group-item">
                    <i className="bi bi-check-circle-fill text-success me‑4" />
                    <span className="ml-2"> {act}</span>
                  </li>
                ))}
              </ul>

              <h3 className="h5 mb‑3 mt-3">Como chegar</h3>
              <MapContainer
                center={position}
                zoom={14}
                style={{ height: 320 }}
                scrollWheelZoom={false}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position}>
                  <Popup>
                    {property.name}
                    <br />
                    {property.address}
                  </Popup>
                </Marker>
                <Circle
                  center={position}
                  radius={1000}
                  pathOptions={{ color: "#28a745", fillOpacity: 0.1 }}
                />
                <ScaleControl position="bottomleft" />
              </MapContainer>
            </div>
          </div>

          <PropertyRatings
            propertyId={property.id}
            propertyName={property.name}
          />
        </div>

        <div className="col-lg-4">
          <div className="card mb‑4">
            <div className="card-header bg-success text-white">
              <h2 className="h5 m‑0">Informações de Contato</h2>
            </div>
            <div className="card-body">
              <p className="mb‑2">
                <i className="bi bi-geo-alt-fill text-success me‑2" />
                <strong>Endereço:</strong> {property.address}
              </p>
              <p className="mb‑2">
                <i className="bi bi-telephone-fill text-success me‑2" />
                <strong>Telefone:</strong> {property.phone}
              </p>
              <p className="mb‑3">
                <i className="bi bi-envelope-fill text-success me‑2" />
                <strong>E-mail:</strong> {property.email}
              </p>

              {weatherError && (
                <p className="text-danger">Clima indisponível 😕</p>
              )}
              {weatherNow && (
                <div className="alert alert-success p‑2">
                  <strong>Agora:</strong> {weatherNow.temperature}°C, vento{" "}
                  {weatherNow.windspeed}km/h
                </div>
              )}
              {forecast.length > 0 && (
                <table className="table table-sm table-bordered text-center">
                  <thead className="table-success">
                    <tr>
                      <th colSpan="4">Próximos 5 dias</th>
                    </tr>
                    <tr>
                      <th>Data</th>
                      <th>Máx</th>
                      <th>Mín</th>
                      <th>Chuva%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {forecast.map((d) => (
                      <tr key={d.date}>
                        <td>
                          {new Date(d.date).toLocaleDateString("pt-BR", {
                            weekday: "short",
                            day: "2-digit",
                            month: "2-digit",
                          })}
                        </td>
                        <td>{d.tMax}°C</td>
                        <td>{d.tMin}°C</td>
                        <td>{d.rain ?? 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header bg-success text-white">
              <h2 className="h5 m‑0">Agende sua Visita</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="mb‑3">
                  <label className="form-label" htmlFor="visitName">
                    Nome Completo
                  </label>
                  <input id="visitName" className="form-control" required />
                </div>
                <div className="mb‑3">
                  <label className="form-label" htmlFor="visitEmail">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="visitEmail"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb‑3">
                  <label className="form-label" htmlFor="visitDate">
                    Data da Visita
                  </label>
                  <input
                    type="date"
                    id="visitDate"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb‑3">
                  <label className="form-label" htmlFor="visitPeople">
                    Nº de Visitantes
                  </label>
                  <input
                    type="number"
                    min="1"
                    id="visitPeople"
                    className="form-control"
                    required
                  />
                </div>
                <button className="btn btn-success w‑100">
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

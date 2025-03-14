import React from "react";
import horse from "./../assets/images/horse.svg";

const AboutUs = () => {
  return (
    <main id="main-content" className="container hero-section" role="main">
      <article className="row align-items-center my-5">
        <header className="d-flex justify-content-center">
          <h1 className="section-title w-50 text-center">
            Nós criamos oportunidades para o produtor rural e protagonismo para
            crianças.
          </h1>
        </header>
        <div className="col-lg-7 hero-text">
          <section className="about-content">
            <p className="mb-3">
              No AgroTherapy, acreditamos no poder transformador do campo para
              promover bem-estar e desenvolvimento.
            </p>
            <p className="mb-3">
              Conectamos pequenos produtores a famílias em busca de espaços
              terapêuticos, oferecendo locais onde o contato com a natureza
              inspira o crescimento e acolhimento para crianças e seus
              familiares.
            </p>
            <p className="mb-3">
              Valorizamos o trabalho do produtor rural, criando uma nova
              oportunidade de renda ao transformar suas propriedades em
              ambientes de inclusão e terapia natural.
            </p>
            <p className="mb-3">
              Ao unir o campo e as necessidades do desenvolvimento infantil,
              cultivamos um espaço onde as crianças podem explorar, aprender e
              se desenvolver em harmonia com a natureza.
            </p>
            <p className="mb-3">
              Nossa missão é fomentar uma experiência única e significativa,
              onde cada propriedade rural se torna um ponto de impacto positivo,
              fortalecendo comunidades e contribuindo para um futuro mais
              inclusivo e sustentável.
            </p>
          </section>
        </div>
        <div className="col-lg-5 text-center">
          <img
            src={horse}
            alt="Ilustração de crianças interagindo com um cavalo em ambiente rural"
            className="img-fluid rounded"
            width="400"
            height="300"
          />
        </div>
      </article>
    </main>
  );
};

export default AboutUs;

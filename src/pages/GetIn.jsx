import React from "react";
import get_in_1 from "./../assets/images/get_in_1.svg";
import get_in_2 from "./../assets/images/get_in_2.svg";

const GetIn = () => {
  return (
    <main id="main-content" className="container my-5" role="main">
      <h1 className="section-title">Faça Parte</h1>

      <section className="row align-items-center content-section" aria-labelledby="produtores-heading">
        <div className="col-lg-7">
          <p className="section-heading text-uppercase">Para Produtores</p>
          <h2 id="produtores-heading" className="section-subtitle">Tenha uma Renda Extra</h2>
          <p className="section-text">
            Transforme sua propriedade em um espaço de acolhimento para famílias e aumente sua renda com o AgroTherapy.
            Ofereça um ambiente natural onde crianças podem explorar e se desenvolver, enquanto você valoriza seu trabalho
            e contribui para uma causa de impacto. Com suporte da nossa equipe, você abre as portas do seu campo para uma
            experiência transformadora para todos.
          </p>
        </div>
        <div className="col-lg-5 text-center">
          <img src={get_in_1} alt="Ilustração de um produtor rural cuidando de sua propriedade" className="img-fluid rounded" width="400" height="300" />
        </div>
      </section>

      <section className="row align-items-center content-section" aria-labelledby="familias-heading">
        <div className="col-lg-5 text-center">
          <img src={get_in_2} alt="Ilustração de uma família aproveitando momentos juntos no campo" className="img-fluid rounded" width="400" height="300" />
        </div>
        <div className="col-lg-7">
          <p className="section-heading text-uppercase">Para Famílias</p>
          <h2 id="familias-heading" className="section-subtitle">Um Campo para Crescer</h2>
          <p className="section-text">
            Proporcione à sua criança um espaço natural de desenvolvimento. No AgroTherapy, conectamos sua família a
            propriedades rurais adaptadas para estimular o crescimento e o bem-estar em contato com a natureza. Faça parte
            dessa rede e descubra o poder transformador do campo!
          </p>
        </div>
      </section>
    </main>
  );
};

export default GetIn;

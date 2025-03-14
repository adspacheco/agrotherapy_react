import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({ nome: "", email: "", mensagem: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nome.split(" ").length < 2 || formData.mensagem.length < 30) {
      alert("Nome completo e mensagem com pelo menos 30 caracteres são obrigatórios.");
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <main id="main-content" className="container my-5" role="main">
      <h1 className="section-title">Vamos Conversar?</h1>
      {isSubmitted ? (
        <div className="alert alert-success" role="alert">
          <h2 className="alert-heading h4">Mensagem enviada com sucesso!</h2>
          <p>Recebemos sua mensagem com os seguintes dados:</p>
          <ul>
            <li><strong>Nome:</strong> {formData.nome}</li>
            <li><strong>Email:</strong> {formData.email}</li>
            <li><strong>Mensagem:</strong> {formData.mensagem}</li>
          </ul>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <h2>Formulário de Contato</h2>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome Completo</label>
            <input type="text" className="form-control" id="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="mensagem" className="form-label">Mensagem</label>
            <textarea className="form-control" id="mensagem" rows="3" value={formData.mensagem} onChange={handleChange} required></textarea>
            <div class="form-text" id="charCountHelp">
              <span id="charCount">{formData.mensagem.length}</span>/500 caracteres
            </div>
          </div>
          <button type="submit" className="btn btn-success">Enviar Mensagem</button>
        </form>
      )}
    </main>
  );
};

export default ContactUs;
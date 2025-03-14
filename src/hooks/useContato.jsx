import { useState } from "react";

const useContato = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nome.split(" ").length < 2 || formData.mensagem.length < 30) {
      return;
    }
    setSubmitted(true);
  };

  return { formData, handleChange, handleSubmit, submitted };
};

export default useContato;

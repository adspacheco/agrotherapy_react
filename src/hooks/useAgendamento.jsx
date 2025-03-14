import { useState } from "react";

const useAgendamento = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    data: "",
    numeroVisitantes: "",
    observacoes: "",
  });
  const [agendado, setAgendado] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.data || !formData.numeroVisitantes) return;
    setAgendado(true);
  };

  return { formData, handleChange, handleSubmit, agendado };
};

export default useAgendamento;

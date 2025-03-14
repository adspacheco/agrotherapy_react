import React, { useRef } from "react";
import { Toast } from "bootstrap";

const ToastNotification = () => {
  const toastRef = useRef(null);

  const mostrarAviso = (event) => {
    event.preventDefault();
    const toastElement = toastRef.current;
    const toastInstance = new Toast(toastElement, { delay: 2000 });
    toastInstance.show();
  };

  return (
    <div className="toast-container position-fixed top-0 end-0 p-3">
      <div
        ref={toastRef}
        id="disponibilidadeToast"
        className="toast align-items-center bg-warning border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body text-dark">Esta propriedade estará disponível em breve!</div>
          <button
            type="button"
            className="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Fechar"
          ></button>
        </div>
      </div>
      <button className="btn btn-primary" onClick={mostrarAviso}>
        Mostrar Aviso
      </button>
    </div>
  );
};

export default ToastNotification;
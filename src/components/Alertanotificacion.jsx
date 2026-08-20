import { useEffect } from "react";
import "./AlertaNotificacion.css";

function AlertaNotificacion({ mensaje, onCerrar }) {
  useEffect(() => {
    // Al montarse arranca un temporizador de 3 segundos.
    const temporizador = setTimeout(() => {
      onCerrar();
    }, 3000);

    // Si el componente se desmonta antes, cancelamos el temporizador.
    return () => clearTimeout(temporizador);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="alerta">
      <span className="alerta-icono">✓</span>
      <span>{mensaje}</span>
    </div>
  );
}

export default AlertaNotificacion;
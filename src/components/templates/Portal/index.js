import ReactDOM from "react-dom";

function Portal({ children }) {
  const $target = document.querySelector("#portal-root");

  return ReactDOM.createPortal(children, $target);
}

export default Portal;

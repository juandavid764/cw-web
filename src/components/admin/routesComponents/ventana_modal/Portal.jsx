import { useState } from "react";
import { createPortal } from "react-dom";
import ModalContent from "./ModalContent";
import ButtonComponent from "../../../web/ButtonComponent";

export default function Portal({ domiciliarios, requests, reloadRoutes }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <ButtonComponent
        title={"Crear Ruta"}
        onClickButton={() => setShowModal(true)}
      />

      {showModal &&
        createPortal(
          <ModalContent
            onClose={() => setShowModal(false)}
            domiciliarios={domiciliarios}
            requests={requests}
            reloadRoutes={reloadRoutes}
          />,
          document.getElementById("modal")
        )}
    </>
  );
}

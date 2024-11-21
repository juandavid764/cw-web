import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './ModalContent';
import ButtonComponent from '../../../web/ButtonComponent';

export default function Portal({ domiciliarios, idPedidos }) {

    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <ButtonComponent title={'Crear Ruta'} onClickButton={() => setShowModal(true)} />


            {showModal && createPortal(
                <ModalContent onClose={() => setShowModal(false)} domiciliarios={domiciliarios} pedidos={idPedidos} />,
                document.getElementById("modal")
            )}
        </>
    );
}

import { useState } from "react";
import RequestFounded from "../../components/web/RequestFounded";
import CustomizedInputBase from "../../components/web/TextFieldWithIcon";

const InfoDeliveryPage = () => {
  const [orderDetails, setOrderDetails] = useState(null); // Estado para almacenar los detalles
  const [error, setError] = useState(null); // Estado para manejar errores

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center p-2 gap-5  w-full">
        <h1 className="font-bold text-center lg:text-3xl lg:text-left text-2xl mt-3">
          ¡Consulta el estado de tu pedido!
        </h1>
        <div>
          <CustomizedInputBase
            setOrderDetails={setOrderDetails}
            setError={setError}
          />
        </div>
        <div className="flex justify-center w-full  ">
          {error && <p className="text-red-500">{error}</p>}
          {orderDetails && <RequestFounded orderDetails={orderDetails} />}
        </div>
        <br />
      </div>
    </div>
  );
};

export default InfoDeliveryPage;

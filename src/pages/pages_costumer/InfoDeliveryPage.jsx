import CustomizedSteppers from "../../components/web/CustomizedSteppers";
import CustomizedInputBase from "../../components/web/TextFieldWithIcon"

const InfoDeliveryPage = () => {

    return (
        <div className="">
            <div className="flex flex-col items-center p-10 gap-5">
                <h1 className="font-bold text-center lg:text-left text-2xl mt-3">Estado de tu pedido</h1>
                <br></br>
                <div className="">
                    <CustomizedInputBase />
                </div>
                <div className="">
                    <CustomizedSteppers />
                </div>
                <br></br>
            </div>
        </div>
    );
}

export default InfoDeliveryPage;

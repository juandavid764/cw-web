import Button from "@mui/material/Button";
import { orange } from "@mui/material/colors";

const ButtonComponent = ({ title }) => {
    return (
        <button className="mt-4 bg-orange-300 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg">
            {title}
        </button>
    );

};

export default ButtonComponent;

import Button from "@mui/material/Button";
import { orange } from "@mui/material/colors";

const ButtonComponent = ({ title }) => {
    return (
        <Button
            size="large"
            sx={{ background: orange[300] }}
            variant="contained"
        >
            {title}
        </Button>
    );

};

export default ButtonComponent;

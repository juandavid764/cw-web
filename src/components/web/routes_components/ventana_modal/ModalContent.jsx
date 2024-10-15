import ButtonComponent from "../../ButtonComponent";
import { ButtonGroupComponent } from "../ButtonGroupComponent";
import { DropdownButton } from "../DropdownButton";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function ModalContent({ onClose, domiciliarios, pedidos }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <DropdownButton options={domiciliarios} onClickButton={() => { }} />

                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="option" />
                    <FormControlLabel control={<Checkbox />} label="option" />
                    <FormControlLabel control={<Checkbox />} label="option" />
                    <FormControlLabel control={<Checkbox />} label="option" />
                    <FormControlLabel control={<Checkbox />} label="option" />

                </FormGroup>
                <ButtonComponent title={'Guardar'} onClickButton={onClose} />
            </div>
        </div>
    );
}

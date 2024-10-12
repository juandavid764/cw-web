import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { useState } from "react";

export function DropdownButton({ estados }) {
    const [buttonTitle, setButtonTitle] = useState(Object.keys(estados[0])[0]);
    const [colorStatus, setColorStatus] = useState("red");

    const pulseButton = (estado) => {
        stateKey = Object.keys(estado)[0]
        stateValue = estado[stateKey]

        setButtonTitle(stateKey)
        setColorStatus(stateValue)
    };

    return (
        <Menu>
            <MenuHandler>
                <Button className={`bg-${colorStatus}-300 hover:bg-${colorStatus}-400 text-white font-bold py-2 px-4 rounded`}>
                    {buttonTitle}
                </Button>
            </MenuHandler>
            <MenuList>
                {estados.map((estado, index) => (
                    <MenuItem onClick={() => pulseButton(estado)} key={index}>{Object.keys(estado)[0]}</MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}
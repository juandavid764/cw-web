import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button

} from "@material-tailwind/react";
import { useState } from "react";

export function DropdownButton({ estados }) {
    const [buttonTitle, setButtonTitle] = useState(estados[0]);
    const [colorStatus, setColorStatus] = useState("yellow");

    const pulseButton = (estado) => {
        switch (estado) {
            case "En camino":
                setColorStatus("yellow")
                break;
            case "Completado":
                setColorStatus("orange")
                break;
            case "Cancelado":
                setColorStatus("yellow")
                break;
        }

        setButtonTitle(estado)

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
                    <MenuItem onClick={() => pulseButton(estado)} key={index}>{estado}</MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}
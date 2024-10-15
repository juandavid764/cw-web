import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

//Recibe los titilos de botones en un array de Strings
//Recibe una funcion a usar cuando se de click a los botones
export function ButtonGroupComponent({ titles, onClickButton }) {
    const [selectedIndex, setSelectedIndex] = React.useState();

    const handleClick = (index) => {
        setSelectedIndex(index)

        onClickButton(titles[index])


    };

    return (
        <ButtonGroup variant="contained">
            {titles.map((title, index) => (
                <Button
                    key={index}
                    onClick={() => handleClick(index)}
                    color='white'
                    sx={{
                        textTransform: 'none',
                        color: selectedIndex === index ? 'orange' : 'black'
                    }}
                >
                    {title}
                </Button>
            ))}
        </ButtonGroup>
    );
}
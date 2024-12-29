import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";

function Pricefilter({ onPriceChange }) {
    const [value, setValue] = useState([0, 100000]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onPriceChange(newValue);
    };

    const handleMinChange = (event) => {
        const newValue = [parseInt(event.target.value), value[1]];
        setValue(newValue);
        onPriceChange(newValue);
    };

    const handleMaxChange = (event) => {
        const newValue = [value[0], parseInt(event.target.value)];
        setValue(newValue);
        onPriceChange(newValue);
    };

    return (
        <div className='w-[300px]'>
            <hr></hr>
            <div className='flex '>
                <span className='text-[22px] mt-[50px] ml-[60px] flex text-8xl sm:text-[30px] font-Poppins whitespace-pre-line text-center tracking-wide'>Price </span>
            </div>
            <div className="my-[30px] text-gray-300">
                <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100000}
                    sx={{
                        color: "#EF7215",
                    }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", margin: 10, padding: 10 }} className="gap-4 ">
                    <TextField
                        type="number"
                        value={value[0]}
                        onChange={handleMinChange}
                        label="Min"
                    />
                    <TextField
                        type="number"
                        value={value[1]}
                        onChange={handleMaxChange}
                        label="Max"
                    />
                </div>
            </div>
            <p className='mt-8 h-8'></p>
        </div>
    );
}

export default Pricefilter;

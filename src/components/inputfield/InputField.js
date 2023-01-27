import React from "react";
import './InputField.css'

function InputField({label, name, type, value, setState}) {
    return (
    <div className='InputField'>
        <label>{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => setState(e.target.value)}
        />
    </div>
    )
}

export default InputField;
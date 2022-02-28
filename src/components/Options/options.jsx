import React from 'react';
import './style.css';

const CurrencyOptions = (props) => {
    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form 
            className='currency-options__select'
            onSubmit={onSubmit}
        >
            <select value={props.value} onChange={props.onChange}>
                {props.options.map((option, index) => {
                    return (
                        <option key={index} value={option}>{option}</option>
                    );
                })}
            </select>
        </form>
    );
};

export default CurrencyOptions;
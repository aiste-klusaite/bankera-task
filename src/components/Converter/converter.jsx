import React, {useState, useEffect} from 'react';
import CurrencyOptions from '../Options/options';
import './style.css';

const Converter = () => {
    const [state, setState] = useState({
        currency: '',
        code: '',
        rate: 0,
        symbol: '',
        value: 0,
    });
    const [options, setOptions] = useState([]);
    const [option, setOption] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const requestURL = 'https://api.coindesk.com/v1/bpi/currentprice.json';
    const request = new Request(requestURL);

    const currencyFormat = (num) => {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     };

    const fetchCurrency = async () =>  {
        const response = await fetch(request);
        const currencies = await response.json();
        
        Object.values(currencies.bpi).map(opt => 
            setState({
                ...state,
                rate: opt.rate_float,
                code: opt.code,
                symbol: opt.symbol
            })
        );
        setOptions(Object.keys(currencies.bpi));
        setSelectedOptions(Object.values(currencies.bpi));
    };   

    const onValueChange = async (e) => {
        setState({
            ...state,
            value: e.target.value
        })
    };
 
    useEffect(() => {
        fetchCurrency();
    }, [option]);

    const onCurrencyChange = (e) => {
        setOption(e.target.value);
        addInput(option);
    };

    const addInput = (opt) => {
        setSelectedOptions([...selectedOptions, opt]);
        console.log('added', opt);
    };

    const deleteInput = (i) => {
        const deletedOption = [...selectedOptions];
        deletedOption.splice(i, 1);
        setSelectedOptions(deletedOption)
    };

    const currencyInput = (code, rate, index) => {
        const value = rate * state.value;
        return (
            <React.Fragment key={index}>
                <label>
                    {code}
                    <input
                       value={currencyFormat(value)}
                    />
                    <button 
                        type="button" 
                        onClick={() => deleteInput(index)}
                    ><div/><div/></button>
                </label>
            </React.Fragment>
        );
    };

    const renderInput = () => {
        return selectedOptions.map((o, index) => currencyInput(o.code, o.rate_float, index));
    };

    const onSubmit = async () => {
        await fetchCurrency();
        console.log('updated');
    }

    useEffect(() => {
        setTimeout(() => {
            onSubmit()
        }, 60000);
    }, [state]);

    return (
        <div className='converter' onSubmit={onSubmit}>
           {selectedOptions.length <= 2 && <CurrencyOptions options={options} onChange={onCurrencyChange} value={option}/>}
            <form className='converter__form'>
                <label>BTC
                    <input
                        value={state.value}
                        onChange={onValueChange}
                    />
                </label>
                {renderInput()}
            </form>
        </div>
    )
};

export default Converter;
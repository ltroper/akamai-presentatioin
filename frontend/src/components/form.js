import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getBankThunk } from '../store/bank';


import "./form.css"

const Form = () => {

    const dispatch = useDispatch()


    const [bank, setBank] = useState('');
    const [bankWithoutSpaces, setBankWithoutSpaces] = useState(bank.replace(/\s/g, ''))

    // let bankWithoutSpaces = bank.replace(/\s/g, '')

    const allBanks = useSelector(state => state?.bank["[object Object]"]?.bank);

    let thisBank = allBanks?.filter(ele => ele[0].toLowerCase().includes(bankWithoutSpaces.toLowerCase()))

    if (thisBank){
        for (let bank of thisBank){
            if(bank[0].includes("Bancospúblicos")) bank[0] = bank[0].slice(14)
            console.log(bank[0])
        }
    }


    // let amPm = thisBank?.substr(thisBank.length - 4);
    // console.log(thisBank)
    // if (thisBank?.includes("cooperativascoope-anden°1r.l.")) {
    //     thisBank = thisBank?.replace(/\D/g,'');
    //     thisBank = thisBank.substring(1);
    // }
    // console.log(thisBank)

    // thisBank = thisBank?.replace(/\D/g,'');


    // let buyPrice = (thisBank?.slice(0, 5)/100).toFixed(2)
    // let sellPrice = (thisBank?.slice(5, 10)/100).toFixed(2)
    // let differential = (thisBank?.slice(10, 14)/100).toFixed(2)

    // let day = thisBank?.slice(14, 16)
    // let month = thisBank?.slice(16, 18)
    // let year = thisBank?.slice(18, 22)

    // let hour = thisBank?.slice(22, 24)
    // let minute = thisBank?.slice(24, 26)


    const toggleBank = e => {
        e.preventDefault();
        setBank(e.target.value)
        setBankWithoutSpaces(bank.replace(/\s/g, ''))
    }


    useEffect(() => {
        dispatch(getBankThunk(bank));
    }, [dispatch, bank]);



    return (
        <div className='body'>
            <h1 className='title'>Seleccione su Banco</h1>
            <div>
                <form >
                    <input
                    onChange={toggleBank}
                    className='bank-select-menu'
                    ></input>
                </form>
            </div>
            <div>
                {bank.length > 0 && (
                    <div>
                        <h3>Compra: ₡{}</h3>
                        <h3>Venta: ₡{}</h3>
                        <h3>Diferencial Cambiario: ₡{}</h3>
                        <h3>Última Actualización: {}/{}/{} {}:{}{}</h3>
                    </div>
                )}
            </div>
        </div>
    )
}


export default Form

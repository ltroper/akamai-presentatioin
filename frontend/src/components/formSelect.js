import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getBankThunk } from '../store/bank';


import "./form.css"

const FormSelect = () => {

    const dispatch = useDispatch()


    const [bank, setBank] = useState('');


    const allBanks = useSelector(state => state?.bank["[object Object]"]?.bank);



    // let entidad

    // if (thisBank?.includes("bancodecostarica") || thisBank?.includes("banconacionaldecostarica") || thisBank?.includes("bancopopularydedesarrollocomunal")){
    //     entidad = "Banco Público"
    // }
    // else if (thisBank?.includes("banco") || thisBank?.includes("bank")){
    //     entidad = "Banco Privado"
    // }
    // else if (thisBank?.includes("financiera")){
    //     entidad = "Financiera"
    // }
    // else if (thisBank?.includes("mutual")){
    //     entidad = "Mutuales de Vivienda"
    // }
    // else if (thisBank?.includes("coope")){
    //     entidad = "Cooperativa"
    // }
    // else if (thisBank?.includes("casadecambio")){
    //     entidad = "Casa de Cambio"
    // }
    // else if (thisBank?.includes("puestodebolsa") || thisBank?.includes("pbinversiones")){
    //     entidad = "Puesto de Bolsa"
    // }





    useEffect(() => {
        dispatch(getBankThunk(bank));
    }, [dispatch, bank]);



    return (
        <div className='body'>
            <h1 className='title'>Seleccione su Banco</h1>
            <div>
                <form >
                    <input
                        type="text"
                        placeholder='Buscar Bancos'
                        onChange={e => setBank(e.target.value)}
                    ></input>
                </form>
            </div>
            <div>
                {allBanks?.length < 36 && allBanks?.map(element => (
                    <div>
                        <h3>{element[1]}</h3>
                        <p>Compra: ₡{element[2]} Venta: ₡{element[3]} Diferencial Cambiario: ₡{element[4]}</p>
                        <p>Actualizado el {element[6]}</p>
                        <p>{element[0]}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default FormSelect

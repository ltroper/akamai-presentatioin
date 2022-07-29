import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getBankThunk } from '../store/bank';


import "./form.css"

const Form = () => {

    const dispatch = useDispatch()


    const [bank, setBank] = useState('');

    const bankWithoutSpaces = bank.replace(/\s/g, '')

    const allBanks = useSelector(state => state?.bank["[object Object]"]?.bank);
    let thisBank = allBanks?.filter(ele => ele[0].includes(bankWithoutSpaces))[0][0].toLowerCase()

    let amPm = thisBank?.substr(thisBank.length - 4);
    console.log(thisBank)
    if (thisBank?.includes("cooperativascoope-anden°1r.l.")) {
        thisBank = thisBank?.replace(/\D/g,'');
        thisBank = thisBank.substring(1);
    }
    console.log(thisBank)

    thisBank = thisBank?.replace(/\D/g,'');


    let buyPrice = (thisBank?.slice(0, 5)/100).toFixed(2)
    let sellPrice = (thisBank?.slice(5, 10)/100).toFixed(2)
    let differential = (thisBank?.slice(10, 14)/100).toFixed(2)

    let day = thisBank?.slice(14, 16)
    let month = thisBank?.slice(16, 18)
    let year = thisBank?.slice(18, 22)

    let hour = thisBank?.slice(22, 24)
    let minute = thisBank?.slice(24, 26)


    // let abc = [
    //     "a", "b", "c", "d", "e", "f",
    //     "g", "h", "i", "j", "k", "l",
    //     "m", "n", "o", "p", "q", "r",
    //     "s", "t", "u", "v", "w", "x",
    //     "y", "z"
    // ]
    // while(abc.includes(thisBank[0])){
    //     thisBank.shift()
    // }
    // console.log(buyPrice, sellPrice, differential)
    // console.log(day, month, year)
    // console.log(hour, minute, amPm)


    useEffect(() => {
        dispatch(getBankThunk(bank));
    }, [dispatch, bank]);

    const toggleBank = e => {
        e.preventDefault();
        setBank(e.target.value)
    }

    return (
        <div className='body'>
            <h1 className='title'>Seleccione su Banco</h1>
            <div>
                <form >
                    <select
                        className="bank-select-menu"
                        onChange={toggleBank}>
                        <option value=""></option>
                        <option value="Banco de Costa Rica">Banco de Costa Rica</option>
                        <option value="Banco Nacional de Costa Rica">Banco Nacional de Costa Rica</option>
                        <option value="Banco Popular y de Desarrollo Comunal">Banco Popular y de Desarrollo Comunal</option>
                        <option value="Banco BAC San José S.A.">Banco BAC San José S.A.</option>
                        <option value="Banco BCT S.A.">Banco BCT S.A.</option>
                        <option value="Banco Cathay de Costa Rica S.A.">Banco Cathay de Costa Rica S.A.</option>
                        <option value="Banco CMB">Banco CMB</option>
                        <option value="Banco Davivienda (Costa Rica) S.A">Banco Davivienda (Costa Rica) S.A</option>
                        <option value="Banco General (Costa Rica) S.A.">Banco General (Costa Rica) S.A.</option>
                        <option value="Banco Improsa S.A.">Banco Improsa S.A.</option>
                        <option value="Banco Lafise S.A.">Banco Lafise S.A.</option>
                        <option value="Banco Promérica S.A.">Banco Promérica S.A.</option>
                        <option value="Banco Scotiabank de Costa Rica S.A.">Banco Scotiabank de Costa Rica S.A.</option>
                        <option value="Prival Bank (Costa Rica) S.A">Prival Bank (Costa Rica) S.A</option>
                        <option value="Financiera Cafsa S.A.">Financiera Cafsa S.A.</option>
                        <option value="Financiera Comeca S.A.">Financiera Comeca S.A.</option>
                        <option value="Financiera Desyfin S.A.">Financiera Desyfin S.A.</option>
                        <option value="Financiera Gente SA">Financiera Gente SA</option>
                        <option value="Grupo Mutual Alajuela - La Vivienda de Ahorro y Préstamo">Grupo Mutual Alajuela - La Vivienda de Ahorro y Préstamo</option>
                        <option value="Mutual Cartago de Ahorro y Préstamo">Mutual Cartago de Ahorro y Préstamo</option>
                        <option value="Coope-ANDE N°1 R.L.">Coope-ANDE N°1 R.L.</option>
                        <option value="Coopecaja R.L.">Coopecaja R.L.</option>
                        <option value="Coopemep R.L.">Coopemep R.L.</option>
                        <option value="Cooperativa COOCIQUE R.L.">Cooperativa COOCIQUE R.L.</option>
                        <option value="Cooperativa Coopealianza R.L.">Cooperativa Coopealianza R.L.</option>
                        <option value="Cooperativa CREDECOOP R.L.">Cooperativa CREDECOOP R.L.</option>
                        <option value="Cooperativa Nacional de Educadores R.L. (COOPENAE)">Cooperativa Nacional de Educadores R.L. (COOPENAE)</option>
                        <option value="Cooperativa San Marcos R.L.">Cooperativa San Marcos R.L.</option>
                        <option value="Coopeservidores R.L.">Coopeservidores R.L.</option>
                        <option value="Casa de Cambio Global Exchange">Casa de Cambio Global Exchange</option>
                        <option value="Casa de Cambio Teledolar S. A.">Casa de Cambio Teledolar S. A.</option>
                        <option value="BCT Valores, Puesto De Bolsa, S.A.">BCT Valores, Puesto De Bolsa, S.A.</option>
                        <option value="BN Valores S.A., Puesto de Bolsa">BN Valores S.A., Puesto de Bolsa</option>
                        <option value="Mercado Valores de Costa Rica Puesto de Bolsa">Mercado Valores de Costa Rica Puesto de Bolsa</option>
                        <option value="PB Inversiones SAMA">PB Inversiones SAMA</option>
                        <option value="Popular Valores, Puesto de Bolsa">Popular Valores, Puesto de Bolsa</option>
                    </select>
                </form>
            </div>
            <div>
                {bank.length > 0 && (
                    <div>
                        <h3>Compra ₡{buyPrice}</h3>
                        <h3>Venta ₡{sellPrice}</h3>
                        <h3>Diferencial Cambiario: ₡{differential}</h3>
                        <h3>Última Actualización: {day}/{month}/{year} {hour}:{minute}{amPm}</h3>
                    </div>
                )}
            </div>
        </div>
    )
}


export default Form

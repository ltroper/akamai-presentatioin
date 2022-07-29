const cors = require("cors")({origin: true})


const GET_BANK = "bank/get"


const getBank = bank => {
    return {
        type: GET_BANK,
        bank
    };
}

export const getBankThunk = bank => async dispatch => {
    
    const res = await fetch("/api/banks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bank),
    });

    const data = await res.json();
    dispatch(getBank(data));
}

const initialState = {};

const bankReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_BANK:
            console.log(action)
            newState[action] = action
            return newState;

        default:
            return state;
    }
}


export default bankReducer

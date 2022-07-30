const GET_BANK = "bank/get"


const getBank = bank => {
    return {
        type: GET_BANK,
        bank
    };
}

export const getBankThunk = bank => async dispatch => {

    let datas = {bank: bank}
    const res = await fetch("/api/banks", {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json" },
        body: JSON.stringify(datas),
        // body: "this is the body"
    });

    const data = await res.json();
    dispatch(getBank(data));
}

const initialState = {};

const bankReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_BANK:
            newState[action] = action
            return newState;

        default:
            return state;
    }
}


export default bankReducer

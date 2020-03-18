const SET_CURRENT_TAB = "SET_CURRENT_TAB";

const setCurrentType = number => {
    return {
        type: SET_CURRENT_TAB,
        payload: number
    };
};

export { SET_CURRENT_TAB, setCurrentType };

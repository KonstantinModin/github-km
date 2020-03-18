const SET_CURRENT_TAB = "SET_CURRENT_TAB";

const setCurrentTab = number => {
    return {
        type: SET_CURRENT_TAB,
        payload: number
    };
};

export { SET_CURRENT_TAB, setCurrentTab };

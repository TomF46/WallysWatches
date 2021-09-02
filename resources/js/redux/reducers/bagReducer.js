import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function BagReducer(
    state = initialState.bag,
    action
) {
    switch (action.type) {
        case types.ADD_ITEM_TO_BAG:
            return [...state, { ...action.item }];
        case types.REMOVE_ITEM_FROM_BAG:
            return state.filter((item) => item.id != action.item.id);
        default:
            return state;
    }
}

import * as types from "./actionTypes";

export function addItemToBagSuccess(item) {
    return { type: types.ADD_ITEM_TO_BAG, item };
}

export function removeItemFromBagSuccess(item) {
    return { type: types.REMOVE_ITEM_FROM_BAG, item };
}

export function removeAllItemsFromBagSuccess(item) {
    return { type: types.REMOVE_ALL_ITEMS_FROM_BAG };
}

export function addItemToBag(item) {
    return function (dispatch) {
        dispatch(addItemToBagSuccess(item));
    };
}

export function removeItemFromBag(item) {
    return function (dispatch) {
        dispatch(removeItemFromBagSuccess(item));
    };
}

export function removeAllItemsFromBag() {
    return function (dispatch) {
        dispatch(removeAllItemsFromBagSuccess());
    };
}


import { put } from "redux-saga/effects";
import { success, failed } from '../../slice/paymentSlice'
import { postRequest } from "../ApiInstence";

export function* getOrderIDAPI({ payload }) {
    try {
        const response = yield postRequest(`payment/getToken`, payload);
        if (response?.status === 200) {
            yield put(success([response?.data]));
        } else {
            yield put(failed(response));
        }

    } catch (error) {
        yield put(failed(error));
    }
}

export function* postOrderAPI({ payload }) {
    try {
        const response = yield postRequest(`payment`, payload);
        if (response?.status === 200) {
            yield put(success([response?.data]));
        } else {
            yield put(failed(response));
        }

    } catch (error) {
        yield put(failed(error));
    }
}

export function* postOrderDeatils({ payload }) {
    try {
        const response = yield postRequest(`order`, payload);
        if (response?.status === 200) {
            yield put(success([response?.data]));
        } else {
            yield put(failed(response));
        }

    } catch (error) {
        yield put(failed(error));
    }
}

export function* postMakePaymentAPI({ payload }) {
    try {
        const response = yield postRequest(`payment/makepayment`, payload);
        if (response?.status === 200 || response?.status === 201) {
            yield put(success([response?.data]));
        } else {
            yield put(failed(response));
        }

    } catch (error) {
        yield put(failed(error));
    }
}
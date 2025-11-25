import { put } from "redux-saga/effects";
import { success, failed } from '../../slice/contactusSlice'
import { postRequest } from "../ApiInstence";

export function* postContactUsAPI({ payload }) {
    try {

        const response = yield postRequest(`contactus`, payload);
        if (response?.status === 200 || response?.status === 201) {
            yield put(success([response?.data]));
        } else {
            yield put(failed(response));
        }

    } catch (error) {
        yield put(failed(error));
    }
}

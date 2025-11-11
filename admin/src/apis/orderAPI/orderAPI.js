import { getRequest, patchRequest } from 'apis/ApiInstence';
import { put } from 'redux-saga/effects';
import { successOrderListDB, failedOrderListDB } from 'slice/orderSliceDB';

export function* updateOrderAPI({ payload }) {
  try {
    yield patchRequest(`order/${payload.id}`, payload.data);
    const response = yield getRequest('order');
    if (response?.status == 200) {
      yield put(successOrderListDB(response?.data));
    } else {
      yield put(failedOrderListDB(response));
    }
  } catch (error) {
    console.log(error);
    // toast('resposnse.message')
  }
}


import { put,  takeLatest } from "redux-saga/effects";
import { signup, signin, success, failed, otpverification, successLogin, getoneuser } from '../slice/userSlice';
import { getRequest, postRequest } from "./ApiInstence";
import { toast } from "react-toastify";
import { addContectUs } from "../slice/contactusSlice";
import { postContactUsAPI } from "./contactus/contactUsApi";

function* signinUser({ payload }) {
  try {
    const response = yield postRequest('customer/login', payload); // payload has identifier & password
    if (response?.status === 200) {
      yield put(successLogin(response));
    } else {
      yield put(failed(response));
    }
  } catch (error) {
    yield put(failed(error));
  }
}


function* getoneuserFun({ payload }) {
  try {
    const response = yield getRequest('customer/one/' + payload?.id); // payload.id can be ID, email, or mobile
    if (response?.status === 200) {
      yield put(success(response));
    } else {
      yield put(failed(response));
    }
  } catch (error) {
    yield put(failed(error));
  }
}


function* otpverification_fun({ payload }) {
  try {
    const response = yield postRequest('customer/otp', payload);
    if (response?.status === 200) {
      yield put(success(response));
    } else {
      yield put(failed(response));
    }
  } catch (error) {
    yield put(failed(error));
  }
}

function* signupUser({ payload }) {
  try {
    const response = yield postRequest('customer', payload);
    if (response?.status === 200) {
      yield put(success(response));
    } else {
      yield put(failed(response));
    }
  } catch (error) {
    console.log(error);
    toast(error.message);
  }
}

// Generator function
export function* watchGetUser() {
  yield takeLatest(signin, signinUser);
  yield takeLatest(signup, signupUser);
  yield takeLatest(otpverification, otpverification_fun);
  yield takeLatest(getoneuser, getoneuserFun);
  yield takeLatest(addContectUs, postContactUsAPI);
}
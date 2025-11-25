import { put, takeLatest } from 'redux-saga/effects';
import { signup, signin, success, failed } from '../slice/userSlice';
import { postRequest, getRequest, deleteRequest, patchRequest } from './ApiInstence';
import { toast } from 'react-toastify';
import { getContactUs, successContactUs, failedContactUs, removeContactUs, getDashboardData } from '../slice/contactUsSlice';
import { getEnquire, successEnquire, failedEnquire, removeEnquire } from '../slice/enquireSlice';
import {
  addProduct,
  getProduct,
  updateProduct,
  successProduct,
  removeProduct,
  getOneProduct,
  searchProductByName
} from '../slice/productSlice';
import { getGallery, successGallery, removeGallery, failedGallery, addGallery, updateGallery, getOneGallery } from '../slice/gallerySlice';
import { getMedia, successMedia, removeMedia, addMedia, updateMedia, getOneMedia } from '../slice/mediaSlice';
import { getBanner, successBanner, removeBanner, addBanner, updateBanner, getOneBanner } from '../slice/bannerSlice';
import { getOurteam, successOurteam, removeOurteam, addOurteam, updateOurteam, getOneOurteam, failedOurteam } from 'slice/ourteamSlice';
import {
  getCustomer,
  successCustomer,
  removeCustomer,
  addCustomer,
  updateCustomer,
  getOneCustomer,
  searchByMobile
} from '../slice/customerSlice';
import {
  addOrderListDB,
  getOrderListDB,
  getOrderDeatilsDB,
  successOrderListDB,
  failedOrderListDB,
  updateOrderListDB
} from '../slice/orderSliceDB';

import { getAdmissions, removeAdmission, successAdmission, failedAdmission } from '../slice/admissionSlice';
import { getEvent, getOneEvent, addEvent, updateEvent, removeEvent, successEvent, failedEvent } from '../slice/eventSlice';
import {
  getManagement,
  getOneManagement,
  addManagement,
  updateManagement,
  removeManagement,
  successManagement,
  failedManagement
} from '../slice/managementSlice';
import { getApplyForm, removeApplyForm, successApplyForm, failedApplyForm } from '../slice/applyFormSlice';
import { getBlog, getOneBlog, addBlog, updateBlog, removeBlog, successBlog, failedBlog } from '../slice/blogSlice';
import { getCareer, getOneCareer, addCareer, updateCareer, removeCareer, successCareer, failedCareer } from '../slice/careerSlice';

import { getService, getOneService, addService, updateService, removeService, successService, failedService } from '../slice/serviceSlice';

import { addFaq, getFaqs, getOneFaq, updateFaq, removeFaq, successFaq, failedFaq } from '../slice/faqSlice';

import { updateOrderAPI } from './orderAPI/orderAPI';

// Generator function
function* signinUser({ payload }) {
  try {
    // You can also export the axios call as a function.
    console.log('ddddddddddddddddddddddddd111111111111');
    let response = yield postRequest('admin/signin', payload, {
      withCredentials: true // Include cookies in the request
    });
    if (response == undefined) {
      response = {
        message: 'something wrong try after sometime'
      };
    }
    if (response?.status == 200) {
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
    const response = yield postRequest('register', payload);
    if (response?.status == 200) {
      yield put(success(response?.data));
    } else {
      yield put(failed(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

//apply start
function* getApplyFormFun({ payload }) {
  try {
    const response = yield getRequest('apply', payload);
    if (response?.status === 200) {
      // ✅ Correct: extract actual data array
      yield put(successApplyForm(response.data.data));
    } else {
      yield put(failedApplyForm(response));
    }
  } catch (error) {
    console.error(error);
    toast('Something went wrong while fetching apply forms');
  }
}

// ✅ Delete Apply Form entry
function* removeApplyFormFun({ payload }) {
  try {
    const response = yield deleteRequest(`apply/${payload}`);
    if (response?.status === 200) {
      const newList = yield getRequest('apply');
      // ✅ Fix here too
      yield put(successApplyForm(newList.data.data));
      toast('Apply form removed successfully');
    } else {
      yield put(failedApplyForm(response));
    }
  } catch (error) {
    console.error(error);
    toast('Something went wrong while deleting apply form');
  }
}

//apply end

export function* getServiceFun() {
  try {
    const response = yield getRequest('service');
    console.log('SERVICE API RESPONSE:', response);

    if (response?.status === 200 && response?.data?.success) {
      yield put(successService(response.data.data));
    } else {
      yield put(failedService(response?.data?.message || 'Failed to fetch services'));
    }
  } catch (error) {
    console.error('SERVICE FETCH ERROR:', error);
    yield put(failedService(error?.message || 'Something went wrong'));
    toast.error('Failed to fetch services');
  }
}

// ✅ Get single service
export function* getOneServiceFun({ payload }) {
  try {
    const response = yield getRequest(`service/one/${payload}`);
    if (response?.status === 200) {
      yield put(successService(response?.data));
    } else {
      yield put(failedService(response));
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.message || 'Failed to fetch service details');
  }
}

export function* addServiceFun({ payload }) {
  try {
    const response = yield postRequest('service', payload);

    if (response?.status === 200) {
      // ✅ dispatch only the useful data
      yield put(successService(response?.data));
      toast.success('Service added successfully!');

      // Optionally refresh list
      yield put(getService());
    } else {
      // ❌ don’t send whole object
      yield put(failedService(response?.message || 'Failed to add service'));
      toast.error(response?.message || 'Failed to add service');
    }
  } catch (error) {
    console.error('Add service error:', error);
    yield put(failedService(error?.message || 'Something went wrong'));
    toast.error(error?.message || 'Failed to add service');
  }
}

// ✅ Update service
export function* updateServiceFun({ payload }) {
  try {
    const response = yield patchRequest(`service/${payload.id}`, payload.data);
    if (response?.status === 200) {
      yield put(successService(response?.data));
      toast.success('Service updated successfully!');
    } else {
      yield put(failedService(response));
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.message || 'Failed to update service');
  }
}

// ✅ Delete service
export function* removeServiceFun({ payload }) {
  try {
    const response = yield deleteRequest(`service/${payload}`);
    if (response?.status === 200) {
      const res = yield getRequest('service');
      yield put(successService(res?.data?.data || []));
      toast.success('Service deleted successfully!');
    } else {
      yield put(failedService(response));
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.message || 'Failed to delete service');
  }
}

// admission start
function* getAdmissionsFun({ payload }) {
  try {
    const response = yield getRequest('admission', payload); // GET /admission
    if (response?.status === 200) {
      yield put(successAdmission(response.data));
    } else {
      yield put(failedAdmission(response));
    }
  } catch (error) {
    console.error(error);
    toast.error(error.message || 'Error fetching admissions');
    yield put(failedAdmission(error));
  }
}

// Delete one admission, then refresh list
function* removeAdmissionFun({ payload }) {
  try {
    const response = yield deleteRequest(`admission/${payload}`); // DELETE /admission/:id
    if (response?.status === 200) {
      const refresh = yield getRequest('admission');
      yield put(successAdmission(refresh.data));
    } else {
      yield put(failedAdmission(response));
    }
  } catch (error) {
    console.error(error);
    toast.error(error.message || 'Error deleting admission');
    yield put(failedAdmission(error));
  }
}

// admissioin end

//carrier
export function* getCareerFun() {
  try {
    const response = yield getRequest('career');
    console.log('CAREER API RESPONSE:', response);

    if (response?.status === 200 && response?.data?.success) {
      yield put(successCareer(response.data.data));
    } else {
      yield put(failedCareer(response?.data?.message || 'Failed to fetch careers'));
    }
  } catch (error) {
    console.error('CAREER FETCH ERROR:', error);
    yield put(failedCareer(error?.message || 'Something went wrong'));
    toast.error('Failed to fetch careers');
  }
}

// ✅ Get single career
export function* getOneCareerFun({ payload }) {
  try {
    const response = yield getRequest(`career/one/${payload}`);
    if (response?.status === 200) {
      yield put(successCareer(response?.data));
    } else {
      yield put(failedCareer(response));
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.message || 'Failed to fetch career details');
  }
}

// ✅ Add career
export function* addCareerFun({ payload }) {
  try {
    const response = yield postRequest('career', payload);

    if (response?.status === 200) {
      // ✅ only send clean data
      yield put(successCareer(response?.data));
      toast.success('Career added successfully!');

      // Optional: refresh career list
      yield put(getCareer());
    } else {
      // ❌ don’t send full axios response object
      yield put(failedCareer(response?.message || 'Failed to add career'));
      toast.error(response?.message || 'Failed to add career');
    }
  } catch (error) {
    console.error('Add career error:', error);
    yield put(failedCareer(error?.message || 'Something went wrong'));
    toast.error(error?.message || 'Failed to add career');
  }
}

// ✅ Update career
export function* updateCareerFun({ payload }) {
  try {
    const response = yield patchRequest(`career/${payload.id}`, payload.data);
    if (response?.status === 200) {
      yield put(successCareer(response?.data));
      toast.success('Career updated successfully!');
    } else {
      yield put(failedCareer(response));
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.message || 'Failed to update career');
  }
}

// ✅ Delete career
export function* removeCareerFun({ payload }) {
  try {
    const response = yield deleteRequest(`career/${payload}`);
    if (response?.status === 200) {
      const res = yield getRequest('career'); // Refresh list
      yield put(successCareer(res?.data?.data || []));
      toast.success('Career deleted successfully!');
    } else {
      yield put(failedCareer(response));
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.message || 'Failed to delete career');
  }
}

function* getContactUsFun({ payload }) {
  try {
    const response = yield getRequest('contactus', payload);
    if (response?.status === 200) {
      yield put(successContactUs(response.data.data)); // ✅ Fix here
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast(error?.message || 'Something went wrong');
  }
}

function* getDashboardDataFun({ payload }) {
  try {
    const response = yield getRequest('dashboard', payload);
    if (response?.status == 200) {
      yield put(successContactUs(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* getProductFun() {
  try {
    const response = yield getRequest('product');
    if (response?.status == 200) {
      yield put(successProduct(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* getOneProductFun({ payload }) {
  try {
    const response = yield getRequest(`product/one/${payload}`);
    if (response?.status == 200) {
      yield put(successProduct(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* removeContactUsFun({ payload }) {
  try {
    const response = yield deleteRequest(`contactus/${payload}`);
    if (response?.status == 200) {
      const response = yield getRequest('contactus', payload);
      yield put(successContactUs(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* removeProductFun({ payload }) {
  try {
    const response = yield deleteRequest(`product/${payload}`);
    if (response?.status == 200) {
      const response = yield getRequest('product', payload);
      yield put(successProduct(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* addProductFun({ payload }) {
  try {
    const response = yield postRequest(`product`, payload);
    if (response?.status == 200) {
      yield put(successProduct(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* searchProductByNameFun({ payload }) {
  try {
    const response = yield getRequest(`product/search?product=${payload}`);
    if (response?.status == 200) {
      yield put(successProduct(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* updateProductFun({ payload }) {
  try {
    const response = yield patchRequest(`product/${payload.id}`, payload.data);
    if (response?.status == 200) {
      yield put(successProduct(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

//Gallery Functions
function* getGalleryFun() {
  try {
    const response = yield getRequest('gallery');
    if (response?.status == 200) {
      yield put(successGallery(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* getOneGalleryFun({ payload }) {
  try {
    const response = yield getRequest(`gallery/one/${payload}`);
    if (response?.status == 200) {
      yield put(successGallery(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* removeGalleryFun({ payload }) {
  try {
    const response = yield deleteRequest(`gallery/${payload}`);
    if (response?.status == 200) {
      const response = yield getRequest('gallery', payload);
      yield put(successGallery(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

export function* addGalleryFun({ payload }) {
  try {
    const headers = { 'Content-Type': 'multipart/form-data' }; // ✅ important if image upload
    const response = yield postRequest('gallery', payload, headers);

    if (response?.status === 200) {
      // ✅ Store only clean data, not full axios response
      yield put(successGallery(response?.data?.data || response?.data));
      toast.success('Gallery added successfully!');
    } else {
      // ✅ Extract message safely
      const message = response?.data?.message || response?.message || 'Failed to add gallery';
      yield put(failedGallery(message));
      toast.error(message);
    }
  } catch (error) {
    console.error('Error adding gallery:', error);
    const message = error?.response?.data?.message || error?.message || 'Something went wrong';
    yield put(failedGallery(message));
    toast.error(message);
  }
}

function* updateGalleryFun({ payload }) {
  try {
    const response = yield patchRequest(`gallery/${payload.id}`, payload.data);
    if (response?.status == 200) {
      yield put(successGallery(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}
//Media Functions
function* getMediaFun() {
  try {
    const response = yield getRequest('media');
    if (response?.status == 200) {
      yield put(successMedia(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* getOneMediaFun({ payload }) {
  try {
    const response = yield getRequest(`media/one/${payload}`);
    if (response?.status == 200) {
      yield put(successMedia(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* removeMediaFun({ payload }) {
  try {
    const response = yield deleteRequest(`media/${payload}`);
    if (response?.status == 200) {
      const response = yield getRequest('media', payload);
      yield put(successMedia(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* addMediaFun({ payload }) {
  try {
    const response = yield postRequest(`media`, payload);
    if (response?.status == 200) {
      yield put(successMedia(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* updateMediaFun({ payload }) {
  try {
    const response = yield patchRequest(`media/${payload.id}`, payload.data);
    if (response?.status == 200) {
      yield put(successMedia(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}
// Enquire
function* getEnquireFun({ payload }) {
  try {
    const response = yield getRequest('enquire', payload, payload.header);
    if (response?.status == 200) {
      yield put(successEnquire(response?.data));
    } else {
      yield put(failedEnquire(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* removeEnquireFun({ payload }) {
  try {
    const response = yield deleteRequest(`enquire/${payload}`);
    if (response?.status == 200) {
      const response = yield getRequest('enquire', payload);
      yield put(successEnquire(response?.data));
    } else {
      yield put(failedEnquire(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

//managemnt start
function* getManagementFun() {
  try {
    const response = yield getRequest('management');
    if (response?.status === 200) {
      yield put(successManagement(response?.data));
    } else {
      yield put(failedManagement(response));
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.message || 'Failed to fetch management team');
  }
}

// ✅ Fetch single management member
function* getOneManagementFun({ payload }) {
  try {
    const response = yield getRequest(`management/${payload}`);
    if (response?.status === 200) {
      yield put(successManagement(response?.data));
    } else {
      yield put(failedManagement(response));
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.message || 'Failed to fetch management details');
  }
}

// ✅ Delete management
function* removeManagementFun({ payload }) {
  try {
    const response = yield deleteRequest(`management/${payload}`);
    if (response?.status === 200) {
      const res = yield getRequest('management');
      yield put(successManagement(res?.data));
      toast.success('Management member deleted successfully');
    } else {
      yield put(failedManagement(response));
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.message || 'Failed to delete management member');
  }
}

// ✅ Add management
function* addManagementFun({ payload }) {
  try {
    const response = yield postRequest('management', payload);
    if (response?.status === 200) {
      yield put(successManagement(response?.data));
      toast.success('Management member added successfully');
    } else {
      yield put(failedManagement(response));
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.message || 'Failed to add management member');
  }
}

// ✅ Update management
function* updateManagementFun({ payload }) {
  try {
    const headers = { 'Content-Type': 'multipart/form-data' };
    const response = yield patchRequest(`management/${payload.id}`, payload.data, headers);
    if (response?.status === 200) {
      yield put(successManagement(response?.data));
      toast.success('Management member updated successfully');
    } else {
      yield put(failedManagement(response));
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.message || 'Failed to update management member');
  }
}
//management end

// ✅ Get all blogs
function* getBlogFun() {
  try {
    const response = yield getRequest('blog');
    if (response?.status === 200) {
      // ✅ FIX: use response.data.data
      yield put(successBlog(response.data.data));
    } else {
      yield put(failedBlog(response));
    }
  } catch (error) {
    console.log(error);
    toast(error?.message || 'Failed to fetch blogs');
  }
}

// ✅ Get one blog
function* getOneBlogFun({ payload }) {
  try {
    const response = yield getRequest(`blog/one/${payload}`);
    if (response?.status === 200) {
      yield put(successBlog(response.data.data));
    } else {
      yield put(failedBlog(response));
    }
  } catch (error) {
    console.log(error);
    toast(error?.message || 'Failed to fetch blog details');
  }
}

export function* addBlogFun({ payload }) {
  try {
    const headers = { 'Content-Type': 'multipart/form-data' };
    const response = yield postRequest('blog', payload, headers);

    if (response?.status === 200) {
      // ✅ Only store actual response data
      yield put(successBlog(response?.data?.data));
      toast.success('Blog added successfully!');

      // Optionally refresh blog list
      yield put(getBlog());
    } else {
      // ❌ Never send full response object
      const errorMessage = response?.data?.message || response?.message || 'Failed to add blog';
      yield put(failedBlog(errorMessage));
      toast.error(errorMessage);
    }
  } catch (error) {
    console.error('Add blog error:', error);
    const message = error?.response?.data?.message || error?.message || 'Failed to add blog';
    yield put(failedBlog(message));
    toast.error(message);
  }
}

// ✅ Update blog
function* updateBlogFun({ payload }) {
  try {
    const formData = new FormData();

    // ✅ Append all fields safely
    if (payload?.data?.title) formData.append('title', payload.data.title);
    if (payload?.data?.description) formData.append('description', payload.data.description);
    if (payload?.data?.category) formData.append('category', payload.data.category);

    // ✅ Append image only if file selected
    if (payload?.data?.image instanceof File) {
      formData.append('image', payload.data.image);
    }

    // ✅ Axios headers
    const headers = {
      'Content-Type': 'multipart/form-data'
    };

    // ✅ API call — removed extra "/" in URL
    const response = yield patchRequest(`blog/${payload.id}`, formData, headers);

    // ✅ Handle success
    if (response?.status === 200 || response?.status === 201) {
      yield put(successBlog(response.data.data));
      toast.success('Blog updated successfully!');
      yield put(getBlog()); // Refresh list after update
    }
    // ❌ Handle backend errors gracefully
    else {
      const errorMessage = response?.data?.message || 'Failed to update blog';
      yield put(failedBlog(errorMessage));
      toast.error(errorMessage);
    }
  } catch (error) {
    console.error('Update blog error:', error);
    const errorMessage = error?.response?.data?.message || error?.message || 'Failed to update blog';
    yield put(failedBlog(errorMessage));
    toast.error(errorMessage);
  }
}

// ✅ Delete blog
function* removeBlogFun({ payload }) {
  try {
    const response = yield deleteRequest(`blog/${payload}`);
    if (response?.status === 200) {
      const res = yield getRequest('blog');
      // ✅ FIX: again use res.data.data
      yield put(successBlog(res.data.data));
      toast.success('Blog deleted successfully!');
    } else {
      yield put(failedBlog(response));
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.message || 'Failed to delete blog');
  }
}

//Banner Start
function* getBannerFun() {
  try {
    const response = yield getRequest('banner');
    if (response?.status == 200) {
      yield put(successBanner(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* getOneBannerFun({ payload }) {
  try {
    const response = yield getRequest(`banner/one/${payload}`);
    if (response?.status == 200) {
      yield put(successBanner(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* removeBannerFun({ payload }) {
  try {
    const response = yield deleteRequest(`banner/${payload}`);
    if (response?.status == 200) {
      const response = yield getRequest('banner', payload);
      yield put(successBanner(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* addBannerFun({ payload }) {
  try {
    const response = yield postRequest(`banner`, payload);
    if (response?.status == 200) {
      yield put(successBanner(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* updateBannerFun({ payload }) {
  try {
    const response = yield patchRequest(`banner/${payload.id}`, payload.data);
    if (response?.status == 200) {
      yield put(successBanner(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

//Banner End

export function* getFaqsFun() {
  try {
    const response = yield getRequest('faq');
    console.log('📘 FAQ API Response:', response);

    if (response?.status === 200 && response?.data?.success) {
      // ✅ Only send FAQ array
      yield put(successFaq(response.data.data));
    } else {
      yield put(failedFaq(response?.data?.message || 'Failed to fetch FAQs'));
      toast.error(response?.data?.message || 'Failed to fetch FAQs');
    }
  } catch (error) {
    console.error('❌ FAQ Fetch Error:', error);
    yield put(failedFaq(error?.message || 'Something went wrong'));
    toast.error(error?.message || 'Failed to fetch FAQs');
  }
}

// ✅ Get single FAQ
function* getOneFaqFun({ payload }) {
  try {
    const response = yield getRequest(`faq/one/${payload}`);
    if (response?.status === 200) {
      yield put(successFaq([response?.data?.data]));
    } else {
      yield put(failedFaq(response?.message || 'Failed to fetch FAQ'));
    }
  } catch (error) {
    yield put(failedFaq(error?.message));
  }
}

// ✅ Add FAQ
function* addFaqFun({ payload }) {
  try {
    const response = yield postRequest('faq', payload);
    if (response?.status === 200) {
      toast.success('FAQ added successfully');
      yield put(getFaqs()); // Refresh list
    } else {
      yield put(failedFaq(response?.message || 'Failed to add FAQ'));
    }
  } catch (error) {
    yield put(failedFaq(error?.message));
  }
}

// ✅ Update FAQ
function* updateFaqFun({ payload }) {
  try {
    const response = yield patchRequest(`faq/${payload.id}`, payload.data);
    if (response?.status === 200) {
      toast.success('FAQ updated successfully');
      yield put(getFaqs());
    } else {
      yield put(failedFaq(response?.message || 'Failed to update FAQ'));
    }
  } catch (error) {
    yield put(failedFaq(error?.message));
  }
}

// ✅ Delete FAQ
function* removeFaqFun({ payload }) {
  try {
    const response = yield deleteRequest(`faq/${payload}`);
    if (response?.status === 200) {
      toast.success('FAQ deleted successfully');
      yield put(getFaqs());
    } else {
      yield put(failedFaq(response?.message || 'Failed to delete FAQ'));
    }
  } catch (error) {
    yield put(failedFaq(error?.message));
  }
}
//faq end

//events start
function* getEventFun() {
  try {
    const response = yield getRequest('events');
    if (response?.status === 200) {
      yield put(successEvent(response?.data));
    } else {
      yield put(failedEvent(response));
    }
  } catch (error) {
    console.log(error);
    toast(error?.message || 'Failed to fetch events');
  }
}

// GET single event
function* getOneEventFun({ payload }) {
  try {
    const response = yield getRequest(`events/one/${payload}`);
    if (response?.status === 200) {
      yield put(successEvent(response?.data));
    } else {
      yield put(failedEvent(response));
    }
  } catch (error) {
    console.log(error);
    toast(error?.message || 'Failed to fetch event details');
  }
}

// DELETE event
function* removeEventFun({ payload }) {
  try {
    const response = yield deleteRequest(`events/${payload}`);
    if (response?.status === 200) {
      const res = yield getRequest('events');
      yield put(successEvent(res?.data));
    } else {
      yield put(failedEvent(response));
    }
  } catch (error) {
    console.log(error);
    toast(error?.message || 'Failed to delete event');
  }
}

// ADD event
function* addEventFun({ payload }) {
  try {
    const response = yield postRequest(`events`, payload);
    if (response?.status === 200) {
      yield put(successEvent(response?.data));
    } else {
      yield put(failedEvent(response));
    }
  } catch (error) {
    console.log(error);
    toast(error?.message || 'Failed to add event');
  }
}

// UPDATE event
function* updateEventFun({ payload }) {
  try {
    const headers = { 'Content-Type': 'multipart/form-data' };
    const response = yield patchRequest(`events/${payload.id}`, payload.data, headers);
    if (response?.status === 200) {
      yield put(successEvent(response?.data));
    } else {
      yield put(failedEvent(response));
    }
  } catch (error) {
    console.log(error);
    toast(error?.message || 'Failed to update event');
  }
}

//events end

//Ourteam Start
function* getOurteamFun() {
  try {
    const response = yield getRequest('team');
    console.log('OUR TEAM API RESPONSE:', response);

    if (response?.status === 200 && response?.data?.success) {
      yield put(successOurteam(response.data.data)); // store only the array
    } else {
      yield put(failedOurteam(response?.data?.message || 'Failed to fetch team members'));
    }
  } catch (error) {
    console.error('OUR TEAM FETCH ERROR:', error);
    yield put(failedOurteam(error?.message || 'Something went wrong'));
    toast.error('Failed to fetch team members');
  }
}

// ✅ Get single team member
function* getOneOurteamFun({ payload }) {
  try {
    const response = yield getRequest(`team/one/${payload}`);
    if (response?.status === 200 && response?.data?.success) {
      yield put(successOurteam(response.data.data));
    } else {
      yield put(failedOurteam(response?.data?.message || 'Failed to fetch team details'));
    }
  } catch (error) {
    console.log(error);
    yield put(failedOurteam(error?.message || 'Failed to fetch team details'));
  }
}

// ✅ Add team member
function* addOurteamFun({ payload }) {
  try {
    const response = yield postRequest('team', payload);
    if (response?.status === 200 && response?.data?.success) {
      toast.success('Team member added successfully!');
      const res = yield getRequest('team'); // refresh list
      yield put(successOurteam(res.data.data));
    } else {
      yield put(failedOurteam(response));
    }
  } catch (error) {
    console.log(error);
    yield put(failedOurteam(error?.message || 'Failed to add team member'));
  }
}

export function* updateOurteamFun({ payload }) {
  try {
    const header = { 'Content-Type': 'multipart/form-data' };
    const response = yield patchRequest(`team/${payload.id}`, payload.data, header);

    if (response?.status === 200 && response?.data?.success) {
      toast.success('Team member updated successfully!');
      const res = yield getRequest('team');
      yield put(successOurteam(res.data.data));
    } else {
      yield put(failedOurteam(response?.data?.message || 'Failed to update team member'));
    }
  } catch (error) {
    console.error('Saga error:', error);
    yield put(failedOurteam(error.message || 'Error updating team member'));
  }
}

// ✅ Delete team member
function* removeOurteamFun({ payload }) {
  try {
    const response = yield deleteRequest(`team/${payload}`);
    if (response?.status === 200 && response?.data?.success) {
      toast.success('Team member deleted successfully!');
      const res = yield getRequest('team');
      yield put(successOurteam(res.data.data));
    } else {
      yield put(failedOurteam(response));
    }
  } catch (error) {
    console.log(error);
    yield put(failedOurteam(error?.message || 'Failed to delete team member'));
  }
}
//Ourteam End

// customer start
function* addCustomerFun({ payload }) {
  try {
    const response = yield postRequest(`customer`, payload);
    if (response?.status == 200) {
      yield put(successCustomer(response?.data));
    } else {
      yield put(failedOurteam(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* getCustomerFun() {
  try {
    const response = yield getRequest('customer');
    if (response?.status == 200) {
      yield put(successCustomer(response?.data));
    } else {
      yield put(failedOurteam(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* removeCustomerFun({ payload }) {
  try {
    const response = yield deleteRequest(`customer/${payload}`);
    if (response?.status == 200) {
      const response = yield getRequest('customer', payload);
      yield put(successCustomer(response?.data));
    } else {
      yield put(failedOurteam(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* getOneCustomerFun({ payload }) {
  try {
    const response = yield getRequest(`customer/one/${payload}`);
    if (response?.status == 200) {
      yield put(successCustomer(response?.data));
    } else {
      yield put(failedOurteam(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* updateCustomerFun({ payload }) {
  try {
    let header = {
      'Content-Type': 'multipart/form-data'
    };
    const response = yield patchRequest(`customer/${payload.id}`, payload.data, header);
    if (response?.status == 200) {
      yield put(successCustomer(response?.data));
    } else {
      yield put(failedOurteam(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* searchByMobileFun({ payload }) {
  try {
    const response = yield getRequest(`customer/search?name=${payload}`);
    if (response?.status == 200) {
      yield put(successCustomer(response?.data));
    } else {
      yield put(failedContactUs(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

// customer end

// order list DB start
function* addOrderListDBFun({ payload }) {
  try {
    const response = yield postRequest(`order`, payload);
    if (response?.status == 200) {
      yield put(successOrderListDB(response?.data));
    } else {
      yield put(failedOrderListDB(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* getOrderListDBFun() {
  try {
    const response = yield getRequest('order');
    if (response?.status == 200) {
      yield put(successOrderListDB(response?.data));
    } else {
      yield put(failedOrderListDB(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

function* getOrderDeatilsDBFun({ payload }) {
  try {
    const response = yield getRequest(`order/order_details/${payload}`);
    if (response?.status == 200) {
      yield put(successOrderListDB(response?.data));
    } else {
      yield put(failedOrderListDB(response));
    }
  } catch (error) {
    console.log(error);
    toast('resposnse.message');
  }
}

// function* removeAppointmentFun({ payload }) {
//   try {
//     const deleteResponse = yield deleteRequest(`appointments/${payload}`);
//     if (deleteResponse?.status == 200) {
//       const appointmentsResponse = yield getRequest('appointments');
//       yield put(successAppointment(appointmentsResponse?.data));
//     } else {
//       yield put(failedAppointment(deleteResponse?.data));
//       toast(deleteResponse?.data?.message || 'Failed to delete appointment');
//     }
//   } catch (error) {
//     console.log(error);
//     toast(error.response?.data?.message || error.message);
//   }
// }

// appointemnt
// order list db end

// Generator function
export function* watchGetUser() {
  yield takeLatest(signin, signinUser);
  yield takeLatest(signup, signupUser);

  // contact us
  yield takeLatest(getContactUs, getContactUsFun);
  yield takeLatest(getDashboardData, getDashboardDataFun);
  yield takeLatest(removeContactUs, removeContactUsFun);

  //contact
  yield takeLatest(getApplyForm, getApplyFormFun);
  yield takeLatest(removeApplyForm, removeApplyFormFun);

  //admission
  yield takeLatest(getAdmissions, getAdmissionsFun);
  yield takeLatest(removeAdmission, removeAdmissionFun);
  //Enquire
  yield takeLatest(getEnquire, getEnquireFun);
  yield takeLatest(removeEnquire, removeEnquireFun);

  yield takeLatest(addProduct, addProductFun);
  yield takeLatest(getProduct, getProductFun);
  yield takeLatest(getOneProduct, getOneProductFun);
  yield takeLatest(searchProductByName, searchProductByNameFun);
  yield takeLatest(removeProduct, removeProductFun);
  yield takeLatest(updateProduct, updateProductFun);

  //gallery
  yield takeLatest(addGallery, addGalleryFun);
  yield takeLatest(getGallery, getGalleryFun);
  yield takeLatest(removeGallery, removeGalleryFun);
  yield takeLatest(getOneGallery, getOneGalleryFun);
  yield takeLatest(updateGallery, updateGalleryFun);

  //media
  yield takeLatest(addMedia, addMediaFun);
  yield takeLatest(getMedia, getMediaFun);
  yield takeLatest(removeMedia, removeMediaFun);
  yield takeLatest(getOneMedia, getOneMediaFun);
  yield takeLatest(updateMedia, updateMediaFun);

  //Banner
  yield takeLatest(addBanner, addBannerFun);
  yield takeLatest(getBanner, getBannerFun);
  yield takeLatest(removeBanner, removeBannerFun);
  yield takeLatest(getOneBanner, getOneBannerFun);
  yield takeLatest(updateBanner, updateBannerFun);

  //Our Team
  yield takeLatest(addOurteam, addOurteamFun);
  yield takeLatest(getOurteam, getOurteamFun);
  yield takeLatest(removeOurteam, removeOurteamFun);
  yield takeLatest(getOneOurteam, getOneOurteamFun);
  yield takeLatest(updateOurteam, updateOurteamFun);

  //faq
  yield takeLatest(getFaqs.type, getFaqsFun);
  yield takeLatest(getOneFaq, getOneFaqFun);
  yield takeLatest(addFaq, addFaqFun);
  yield takeLatest(updateFaq, updateFaqFun);
  yield takeLatest(removeFaq, removeFaqFun);

  //Customer
  yield takeLatest(addCustomer, addCustomerFun);
  yield takeLatest(getCustomer, getCustomerFun);
  yield takeLatest(removeCustomer, removeCustomerFun);
  yield takeLatest(getOneCustomer, getOneCustomerFun);
  yield takeLatest(updateCustomer, updateCustomerFun);
  yield takeLatest(searchByMobile, searchByMobileFun);

  // order DB
  yield takeLatest(addOrderListDB, addOrderListDBFun);
  yield takeLatest(getOrderListDB, getOrderListDBFun);
  yield takeLatest(getOrderDeatilsDB, getOrderDeatilsDBFun);
  yield takeLatest(updateOrderListDB, updateOrderAPI);

  //events
  yield takeLatest(getEvent, getEventFun);
  yield takeLatest(getOneEvent, getOneEventFun);
  yield takeLatest(removeEvent, removeEventFun);
  yield takeLatest(addEvent, addEventFun);
  yield takeLatest(updateEvent, updateEventFun);

  yield takeLatest(getCareer, getCareerFun);

  yield takeLatest(getOneCareer, getOneCareerFun);
  yield takeLatest(addCareer, addCareerFun);
  yield takeLatest(updateCareer, updateCareerFun);
  yield takeLatest(removeCareer, removeCareerFun);

  yield takeLatest(getService, getServiceFun);
  yield takeLatest(getOneService, getOneServiceFun);
  yield takeLatest(addService, addServiceFun);
  yield takeLatest(updateService, updateServiceFun);
  yield takeLatest(removeService, removeServiceFun);

  yield takeLatest(getManagement, getManagementFun);
  yield takeLatest(getOneManagement, getOneManagementFun);
  yield takeLatest(addManagement, addManagementFun);
  yield takeLatest(updateManagement, updateManagementFun);
  yield takeLatest(removeManagement, removeManagementFun);

  yield takeLatest(getBlog, getBlogFun);
  yield takeLatest(getOneBlog, getOneBlogFun);
  yield takeLatest(addBlog, addBlogFun);
  yield takeLatest(updateBlog, updateBlogFun);
  yield takeLatest(removeBlog, removeBlogFun);
}

// src/components/ToastComponent/Toaster.js
import Toast from 'react-native-toast-message';

const showToast = ({ type = 'success', text1 = '', text2 = '', position = 'top' }) => {
  Toast.show({
    type,
    text1,
    text2,
    position,
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
  });
};

const SuccessToaster = (message, subMessage = '') =>
  showToast({ type: 'success', text1: message, text2: subMessage });

const ErrorToaster = (message, subMessage = '') =>
  showToast({ type: 'error', text1: message, text2: subMessage });

const InfoToaster = (message, subMessage = '') =>
  showToast({ type: 'info', text1: message, text2: subMessage });

export default {
  SuccessToaster,
  ErrorToaster,
  InfoToaster,
};

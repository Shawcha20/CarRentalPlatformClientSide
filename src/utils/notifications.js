import Swal from 'sweetalert2';

export const showSuccess = (message, title = 'Success') => {
  Swal.fire({
    icon: 'success',
    title: title,
    text: message,
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: 'top-end'
  });
};

export const showError = (message, title = 'Error') => {
  Swal.fire({
    icon: 'error',
    title: title,
    text: message,
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: 'top-end'
  });
};

export const showWarning = (message, title = 'Warning') => {
  Swal.fire({
    icon: 'warning',
    title: title,
    text: message,
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: 'top-end'
  });
};

export const showConfirm = (message, title = 'Confirm', confirmText = 'Yes', cancelText = 'No') => {
  return Swal.fire({
    icon: 'question',
    title: title,
    text: message,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: '#FF6B6B',
    cancelButtonColor: '#9CA3AF'
  });
};

export const showLoading = (message = 'Loading...') => {
  Swal.fire({
    title: message,
    allowOutsideClick: false,
    didOpen: async () => {
      await Swal.showLoading();
    }
  });
};

export const hideLoading = () => {
  Swal.close();
};

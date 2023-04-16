import Swal from "sweetalert2";

export const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    iconColor: 'white',
    showConfirmButton: false,
    customClass: {
        popup: 'colored-toast'
    },
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
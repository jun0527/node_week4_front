import swal from 'sweetalert';

const iconAlert = (content, status) => {
  swal(content, {
    icon: status,
    buttons: false,
    timer: 1000,
  });
};

export default iconAlert;

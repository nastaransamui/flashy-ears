import { useTranslation } from 'react-i18next'
import Swal from 'sweetalert2'
import { useTheme } from '@mui/material';

const CustomAlert = () => {

  const { t } = useTranslation('common')
  const theme = useTheme();
  const sweetAlert = (data: any, title: string, callBackFunction: (data: string[], status: string) => {}) => {

    Swal.fire({
      title: `${t(`${title}Title`, { ns: 'common', index: `${data.length || ''}` })}`,
      text: `${t(`${title}Confirm`, { ns: 'common' })}`,
      showCancelButton: true,
      background: theme.palette.background.default,
      confirmButtonColor: theme.palette.secondary.main,
      cancelButtonColor: theme.palette.primary.main,
      confirmButtonText: `<i class="fa fa-thumbs-up" ></i> <span style="color:${theme.palette.primary.contrastText
        }">${t(`${title}ConfirmButton`, { ns: 'common' })}<span>`,
      cancelButtonText: `<i class="fa fa-thumbs-down" ></i> <span style="color:${theme.palette.primary.contrastText
        }">${t(`${title}CancelButton`, { ns: 'common' })}<span>`,
      color: theme.palette.text.color,
      icon: 'question',
      showClass: {
        popup: 'animate__animated animate__zoomInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOutDown',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        callBackFunction(data, title);
      }
    })
  }

  return sweetAlert;
}

export default CustomAlert;
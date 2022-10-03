import Error from '@/src/components/ErrorPage/Error'
import { FC } from 'react'
import { CustomPropsTypes } from '@/interfaces/react.interface'
import { useTranslation } from 'react-i18next';

const NotFound:FC<CustomPropsTypes> =(props: CustomPropsTypes) =>{

  const {i18n, t} = useTranslation('404')
  return(
    <Error
      {...props}
      t={t}
      i18n={i18n}
      errorCode={404}
      text={ t('title')}
      type="react"
    />
  )
}

export default NotFound;
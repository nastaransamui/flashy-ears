
import { render } from '@testing-library/react'

import { Provider } from 'react-redux'
import { wrapper } from '@/src/redux/store'
import { NextProps } from '@/interfaces/next.interface'


export const WithReduxRender = (Children: any) => {
  return function MyApp({ Component, ...rest }: NextProps) {
    const { store } = wrapper.useWrappedStore(rest);
    render(<Provider store={store}><Children /></Provider>)
  }
}
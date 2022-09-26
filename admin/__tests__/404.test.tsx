import { cleanup, render, screen, } from '@testing-library/react'
import Custom404 from '@/pages/404'
import userEvent from '@testing-library/user-event'
import i18next from 'i18next';
import { defaultNS, resources } from '../lib/i18n';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { act } from 'react-dom/test-utils';
import mockRouter from 'next-router-mock';
import singletonRouter from 'next/router';
import { Store } from 'redux';
import { makeStore } from '../lib/testlib'
import { Provider } from 'react-redux';
let store: Store;

i18next
  .use(detector)
  .use(initReactI18next)
  .init({
    returnObjects: true,
    lng: 'en',
    fallbackLng: 'en',
    keySeparator: false,
    defaultNS: defaultNS,
    resources: resources
  });

afterEach(cleanup)


jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('load 404 page', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
    store = makeStore();
  });
  it('renders the 404 page', async () => {
    const promise = Promise.resolve()
    render(<Provider store={store}><Custom404 router={{ route: "/404", push: jest.fn() }} /></Provider>)
    await act(async () => {
      await promise
    })
  })

  test('404 page should have back button', async () => {
    const promise = Promise.resolve()
    render(<Provider store={store}><Custom404 router={{ route: "/404" }} /></Provider>)
    const backButton = screen.getByRole('button')
    expect(backButton).toBeVisible();
    expect(backButton).toHaveClass('MuiButtonBase-root')
    await act(async () => {
      await promise
    })
  })

  test('404 page click back button and go to /', async () => {
    const user = userEvent.setup();
    const promise = Promise.resolve()
    render(<Provider store={store}><Custom404 router={{ route: "/404" }} /></Provider>)
    const backButton = screen.getByRole('button')
    await act(async () => {
      await promise
      user.click(backButton)
    })
    expect(singletonRouter).toMatchObject({
      asPath: '/',
      pathname: '/',
    })
  })
})
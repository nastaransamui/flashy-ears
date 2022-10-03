
import { getByRole, cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react'
import UserEvent from "@testing-library/user-event";
import Index from '@/pages/index'
import '@testing-library/jest-dom'
import { Store } from 'redux';
import { makeStore } from '../lib/testlib'
import { Provider } from 'react-redux';
let store: Store;
import i18next from 'i18next';
import { defaultNS, resources } from '../lib/i18n';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { act } from 'react-dom/test-utils';

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
describe('app wrapper  inside Index page', () => {
  beforeEach(() => {
    store = makeStore();
  });
  test('Index has app wrapper and has loading bar was removed', async () => {
    const promise = Promise.resolve()
    const { container } = render(<Provider store={store}><Index /></Provider>)
    const loader = container.getElementsByClassName('top-loading-bar');
    expect(loader[0]).toBeUndefined()
    await act(async () => {
      await promise
    })
  });
  test('Index has app wrapper and has tosify', async () => {
    const { container } = render(<Provider store={store}><Index /></Provider>)
    const toastify = container.getElementsByClassName('Toastify');
    expect(toastify[0]).toBeVisible()
  });

  describe('index should load LangPack', () => {

    test('Index has select Mode ', async () => {
      render(<Provider store={store}><Index /></Provider>)
      const modeSelect = screen.getByLabelText('mode-select')
      expect(modeSelect).toBeInTheDocument()
    });

    test('Select Mode should work', async () => {
      render(<Provider store={store}><Index /></Provider>)
      UserEvent.click(getByRole(screen.getByLabelText("mode-select"), "button"));
      await waitFor(() => UserEvent.click(screen.getByText(/light/i)));
      expect(screen.getByLabelText("mode-select")).toHaveTextContent(/light/i)
    });


    test('Index has select Theme ', async () => {
      render(<Provider store={store}><Index /></Provider>)
      const languageSelect = screen.getByLabelText('theme-select')
      expect(languageSelect).toBeInTheDocument()
    });

    test('Select Theme should work', async () => {
      render(<Provider store={store}><Index /></Provider>)
      UserEvent.click(getByRole(screen.getByLabelText("theme-select"), "button"));
      await waitFor(() => UserEvent.click(screen.getByText(/Dark Violet/i)));
      expect(screen.getByLabelText("theme-select")).toHaveTextContent(/Dark Violet/i)
    });

    test('Index has select language ', async () => {
      render(<Provider store={store}><Index /></Provider>)
      const languageSelect = screen.getByLabelText('language-select')
      expect(languageSelect).toBeInTheDocument()
    });

    test('Select language should work', async () => {
      render(<Provider store={store}><Index /></Provider>)
      UserEvent.click(getByRole(screen.getByLabelText("language-select"), "button"));
      await waitFor(() => UserEvent.click(screen.getByText(/فارسی/i)));
      expect(screen.getByLabelText("email-input")).toHaveTextContent(/ایمیل/i);
    });

  })

  describe('index should load loginForm', () => {
    test('Index has email field ', async () => {
      render(<Provider store={store}><Index /></Provider>)
      const emailField = screen.getByLabelText('email-input').querySelector('input')!
      expect(emailField).toBeInTheDocument()

      fireEvent.change(emailField, { target: { value: 'email@check.com' } });
      expect(emailField?.value).toBe('email@check.com');
    });


    test('Index has password field with password type', async () => {
      render(<Provider store={store}><Index /></Provider>)
      const passwordField = screen.getByLabelText('password-input').querySelector('input')!
      expect(passwordField).toBeInTheDocument()

      fireEvent.change(passwordField, { target: { value: 'password' } });
      expect(passwordField?.value).toBe('password');
      expect(passwordField?.type).toBe('password')
    });

    test('Index has submit Button', async () => {
      const { container } = render(<Provider store={store}><Index /></Provider>)
      const submitButton = container.getElementsByClassName('MuiButtonBase-root')
      expect(submitButton[0]).toBeVisible()
    });
  })
})
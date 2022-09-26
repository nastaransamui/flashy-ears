import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CustomToaster, ToastMessage } from '@/src/components/Shared/CustomToaster/CustomToaster'
import { toast, } from 'react-toastify'
import { act } from 'react-dom/test-utils';

import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import { defaultNS, resources } from '../lib/i18n';
import detector from 'i18next-browser-languagedetector';
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

beforeAll(() => {
  jest.useFakeTimers();
})
afterEach(cleanup)

describe('Custom Toaster ', () => {
  it('should render toaster', async () => {
    render(<CustomToaster />)
  })

  it('should show toast on ToasMessage call and show custom toast', async () => {
    render(<CustomToaster />);

    act(() => {
      toast(<ToastMessage>toastTest</ToastMessage>);
      jest.runAllTimers();
    });

    const toasts = screen.getByRole('alert');
    expect(toasts).not.toBeNull();
  })

  it('should show not show more-less button less than 85', async () => {
    const { container } = render(<CustomToaster />);

    act(() => {
      toast(<ToastMessage>toast test</ToastMessage>);
      jest.runAllTimers();
    });
    const more_lessButton = container.getElementsByClassName('MuiButtonBase-root')
    expect(more_lessButton[0]).toBeUndefined()
  })


  it('should show show more-less button more than 85', async () => {
    const { container } = render(<CustomToaster />);

    act(() => {
      toast(<ToastMessage>Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas eget quam.
        Morbi leo risus, porta ac consectetur ac,</ToastMessage>);
      jest.runAllTimers();
    });
    const more_lessButton = container.getElementsByClassName('MuiButtonBase-root')
    expect(more_lessButton[0]).toBeVisible()
  })

  it('click more-less button should show dialog', async () => {
    const { container } = render(<CustomToaster />);
    const user = userEvent.setup();
    act(() => {
      toast(<ToastMessage>Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas eget quam.
        Morbi leo risus, porta ac consectetur ac,</ToastMessage>);
      jest.runAllTimers();
    });
    const moreButton = screen.getByText('...more');
    fireEvent.click(moreButton)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeVisible()
    const lessButton = screen.getByText('...less');
    fireEvent.click(lessButton)
    await waitFor(()=>  expect(dialog).not.toBeVisible())
  })
})
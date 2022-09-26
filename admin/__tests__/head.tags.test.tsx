import { render, waitFor,cleanup } from '@testing-library/react'

import Index from '@/pages/index'
import brand from '@/public/text/brand'
import i18next from 'i18next';
import { defaultNS, resources } from '../lib/i18n';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import HeadComponent from '@/src/components/head';
import {WithReduxRender} from '../lib/WithReduxRender'

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


jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

afterEach(cleanup)


describe('Index page', () => {
  it('renders the Index page', async () => {
    WithReduxRender(Index)
  })

  it('renders the Index page title', async () => {
    WithReduxRender(Index)
    container: document.head
    expect(typeof document.title).toBe('string');
  });

  it('should have description from brand text file', async () => {
    WithReduxRender(Index)
    render(<HeadComponent title="somehign" />)
    container: document.head
    const metaElement = document?.querySelector("meta[name='description']") as HTMLTemplateElement;
    await waitFor(() => expect(metaElement.content).toBe(`${brand[`name_en`]}`));
  })

  it('should have favicon', async () => {
    WithReduxRender(Index)
    render(<HeadComponent title="somehign" />)
    container: document.head
    const favIcon = document?.querySelector("link[rel*='icon']") as HTMLLinkElement;
    expect(favIcon.rel).toBe('shortcut icon');
    expect(favIcon.href).toBe('http://localhost/admin/favicons/favicon.ico');
  })

  it('should have apple-touch-icon 57x57', async () => {
    WithReduxRender(Index)
    render(<HeadComponent title="somehign" />)
    container: document.head
    const appleTouch = document?.querySelector("link[sizes*='57x57']") as HTMLLinkElement;
    expect(appleTouch.href).toBe('http://localhost/admin/favicons/apple-icon-57x57.png');
  })

  it('should have apple-touch-icon 60x60', async () => {
    WithReduxRender(Index)
    render(<HeadComponent title="somehign" />)
    container: document.head
    const appleTouch = document?.querySelector("link[sizes*='60x60']") as HTMLLinkElement;
    expect(appleTouch.href).toBe('http://localhost/admin/favicons/apple-icon-60x60.png');
  })

  it('should have apple-touch-icon 72x72', async () => {
    WithReduxRender(Index)
    render(<HeadComponent title="somehign" />)
    container: document.head
    const appleTouch = document?.querySelector("link[sizes*='72x72']") as HTMLLinkElement;
    expect(appleTouch.href).toBe('http://localhost/admin/favicons/apple-icon-72x72.png');
  })

  it('should have apple-touch-icon 76x76', async () => {
    WithReduxRender(Index)
    render(<HeadComponent title="somehign" />)
    container: document.head
    const appleTouch = document?.querySelector("link[sizes*='76x76']") as HTMLLinkElement;
    expect(appleTouch.href).toBe('http://localhost/admin/favicons/apple-icon-76x76.png');
  })

  it('should have apple-touch-icon 114x114', async () => {
    WithReduxRender(Index)
    render(<HeadComponent title="somehign" />)
    container: document.head
    const appleTouch = document?.querySelector("link[sizes*='114x114']") as HTMLLinkElement;
    expect(appleTouch.href).toBe('http://localhost/admin/favicons/apple-icon-114x114.png');
  })

  it('should have apple-touch-icon 120x120', async () => {
        WithReduxRender(Index)
    render(<HeadComponent title="somehign" />)
    container: document.head
    const appleTouch = document?.querySelector("link[sizes*='120x120']") as HTMLLinkElement;
    expect(appleTouch.href).toBe('http://localhost/admin/favicons/apple-icon-120x120.png');
  })

  it('should have apple-touch-icon 144x144', async () => {
        WithReduxRender(Index)
    render(<HeadComponent title="somehign" />)
    container: document.head
    const appleTouch = document?.querySelector("link[sizes*='144x144']") as HTMLLinkElement;
    expect(appleTouch.href).toBe('http://localhost/admin/favicons/apple-icon-144x144.png');
  })

  it('should have apple-touch-icon 152x152', async () => {
        WithReduxRender(Index)
    render(<HeadComponent title="somehign" />)
    container: document.head
    const appleTouch = document?.querySelector("link[sizes*='152x152']") as HTMLLinkElement;
    expect(appleTouch.href).toBe('http://localhost/admin/favicons/apple-icon-152x152.png');
  })

  it('should have apple-touch-icon 180x180', async () => {
        WithReduxRender(Index)
    render(<HeadComponent title="somehign" />)
    container: document.head
    const appleTouch = document?.querySelector("link[sizes*='180x180']") as HTMLLinkElement;
    expect(appleTouch.href).toBe('http://localhost/admin/favicons/apple-icon-180x180.png');
  })
  it('should have android-icon 192x192', async () => {
        WithReduxRender(Index)
    render(<HeadComponent title="somehign" />)
    container: document.head
    const appleTouch = document?.querySelector("link[sizes*='192x192']") as HTMLLinkElement;
    expect(appleTouch.href).toBe('http://localhost/admin/favicons/android-icon-192x192.png');
  })
  it('should have apple-touch-icon 32x32', async () => {
        WithReduxRender(Index)
    render(<HeadComponent title="somehign" />)
    container: document.head
    const appleTouch = document?.querySelector("link[sizes*='32x32']") as HTMLLinkElement;
    expect(appleTouch.href).toBe('http://localhost/admin/favicons/favicon-32x32.png');
  })
  it('should have apple-touch-icon 96x96', async () => {
        WithReduxRender(Index)
    render(<HeadComponent title="somehign" />)
    container: document.head
    const appleTouch = document?.querySelector("link[sizes*='96x96']") as HTMLLinkElement;
    expect(appleTouch.href).toBe('http://localhost/admin/favicons/favicon-96x96.png');
  })
  it('should have apple-touch-icon 16x16', async () => {
        WithReduxRender(Index)
    render(<HeadComponent title="somehign" />)
    container: document.head
    const appleTouch = document?.querySelector("link[sizes*='16x16']") as HTMLLinkElement;
    expect(appleTouch.href).toBe('http://localhost/admin/favicons/favicon-16x16.png');
  })

  it('should render manifest json', async () => {
        WithReduxRender(Index)
    render(<HeadComponent title="somehign" />)
    container: document.head
    const manifest = document.querySelector("link[rel*='manifest']") as HTMLLinkElement;
    expect(manifest.href).toBe('http://localhost/admin/favicons/manifest.json')
  })

  it('should have msapplication-TileColor', async () => {
        WithReduxRender(Index)
    render(<HeadComponent title="somehign" />)
    container: document.head
    const metaElement = document?.querySelector("meta[name='msapplication-TileColor']") as HTMLTemplateElement;
    await waitFor(() => expect(metaElement.content).toBe(`#ffffff`));
  })

  it('should have msapplication-TileImage', async () => {
        WithReduxRender(Index)
    render(<HeadComponent title="somehign" />)
    container: document.head
    const metaElement = document?.querySelector("meta[name='msapplication-TileImage']") as HTMLTemplateElement;
    await waitFor(() => expect(metaElement.content).toBe(`/admin/admin/favicons/ms-icon-144x144.png`));
  })


})

import { cleanup, render, screen, } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import i18next from 'i18next';
import { defaultNS, resources } from '../lib/i18n';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { act } from 'react-dom/test-utils';
import { Store } from 'redux';
import { makeStore } from '../lib/testlib'
import { Provider } from 'react-redux';
let store: Store;
import Prodashboard from "@/src/components/Dashboard/ProDashboard/Prodashboard";
import {
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import routes from '../routes'
import { RoutesType } from '@/src/components/Shared/interfaces/react.interface';
import useDashboard from '@/src/pages/dashboard/useDashboard';
import brand from "@/public/text/brand";
const createMockRouter = (router: Partial<NextRouter>): NextRouter => {
  return {
    basePath: '/admin',
    pathname: "/dashboard",
    route: '/dashboard',
    query: {},
    asPath: '/admin/dashboard',
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: 'en',
    domainLocales: [],
    isPreview: false,
    ...router,
  };
};

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

describe('load dashboard', () => {
  beforeEach(() => {
    store = makeStore();

  });
  let nextRouter = createMockRouter({});
  const mainRoutes = [
    {
      path: "/",
      element: <Prodashboard
        sideBarbgColor="black"
        routes={routes as RoutesType[]}
        rtlActive={false}
        propsMiniActive={false}
        sidebarOpen={false}
        handleDrawerToggle={() => { }}
        handleSideBarBgToggle={() => { }}
        sidebarMinimizeFunc={() => { }} />,
    },
  ];

  const router = createMemoryRouter(mainRoutes, {
    initialEntries: ["/admin/dashboard"],
    basename: "/admin/dashboard",
    initialIndex: 1,
  });

  it('Test sidebarDrawer', async () => {
    const { container } = render(
      <Provider store={store} >
        <RouterContext.Provider value={{ ...nextRouter, ...router }} future={{
          v7_startTransition: true,
        }}>
          <RouterProvider router={router} />
        </RouterContext.Provider>
      </Provider>
    )
    const promise = Promise.resolve()
    const drawer = screen.getAllByTestId('drawer')
    expect(drawer[0]).toBeVisible()
    // screen.debug()
    // const brandName = screen.getByText(`${brand[`name_en` as keyof typeof brand]}`)
    // expect(brandName).toHaveClass()
    // expect(container.firstChild).toHaveClass('logoNormal')
    await act(async () => {
      await promise
    })
  })
  // it('Test sidebarDrawer logo', async () => {
  //   console.log('container')
  // })
})
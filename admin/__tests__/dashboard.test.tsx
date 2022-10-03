// import {
//   render,
//   waitFor,
//   screen,
//   cleanup,
//   act
// } from "@testing-library/react";

// import {
//   RouterProvider,
//   createMemoryRouter,
// } from "react-router-dom";
// import { NextRouter } from 'next/router';
// import { RouterContext } from 'next/dist/shared/lib/router-context';


// import i18next from 'i18next';
// import { defaultNS, resources } from '../lib/i18n';
// import detector from 'i18next-browser-languagedetector';
// import { initReactI18next } from 'react-i18next';

// import { Store } from 'redux';
// import { makeStore } from '../lib/testlib'
// import { Provider } from 'react-redux';
// import Dashboard from '@/src/pages/dashboard/Dashboard'
// import Prodashboard from "@/src/components/Dashboard/ProDashboard/Prodashboard";
// import Index from '@/pages/dashboard/[page]'
// import { getCookie, hasCookie, setCookie } from "cookies-next";
// import mockRouter from 'next-router-mock';
// i18next
//   .use(detector)
//   .use(initReactI18next)
//   .init({
//     returnObjects: true,
//     lng: 'en',
//     fallbackLng: 'en',
//     keySeparator: false,
//     defaultNS: defaultNS,
//     resources: resources
//   });

// jest.mock('next/router', () => require('next-router-mock'));
// jest.mock('next/dist/client/router', () => require('next-router-mock'));
// afterEach(cleanup)

// const createMockRouter = (router: Partial<NextRouter>): NextRouter => {
//   return {
//     basePath: '/admin',
//     pathname: "/dashboard",
//     route: '/dashboard',
//     query: {},
//     asPath: '/dashboard',
//     back: jest.fn(),
//     beforePopState: jest.fn(),
//     prefetch: jest.fn(),
//     push: jest.fn(),
//     reload: jest.fn(),
//     replace: jest.fn(),
//     events: {
//       on: jest.fn(),
//       off: jest.fn(),
//       emit: jest.fn(),
//     },
//     isFallback: false,
//     isLocaleDomain: false,
//     isReady: true,
//     defaultLocale: 'en',
//     domainLocales: [],
//     isPreview: false,
//     ...router,
//   };
// };

// let store: Store;

// describe('dashboard load', () => {
//   beforeEach(() => {
//     store = makeStore();
//     setCookie('adminAccessToken', "access")
//     mockRouter.setCurrentUrl('/dashboard')
//   });


//   test("Prodashboard", async () => {
//     const promise = Promise.resolve()


//     const routes = [
//       {
//         path: "/admin/dashboard",
//         element: <Prodashboard />,
//       },
//     ];

//     const router = createMemoryRouter(routes, {
//       initialEntries: ["/"],
//       basename: "/admin/dashboard",
//     });

//     let nextRouter = createMockRouter({});
//     const { container } = render(
//       <Provider store={store}>
//         <RouterContext.Provider value={nextRouter} >
//           {/* <Index /> */}
//           <RouterProvider router={router} />
//         </RouterContext.Provider>
//       </Provider>
//     )
//     // console.log(container)
//     await act(async () => {
//       await promise
//     })
//   })

// })
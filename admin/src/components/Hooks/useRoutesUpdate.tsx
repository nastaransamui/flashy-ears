import { useEffect, useState } from 'react';
import { RoutesType } from '../Shared/interfaces/react.interface';
import routes from '../../../routes'
import { db } from '@/src/browserDb';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/src/redux/store';
import { Dexie } from 'dexie'
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';

const useRoutesUpdate = () => {
  const { updateRoutes } = useSelector<State, State>(state => state);
  const dispatch = useDispatch();
  const router = useRouter();

  async function routesUpdateFromIndexDb() {
    const dbExist = await Dexie.exists('routesDatabase')
    if (dbExist) {
      await db.open();
      const routesDb = await db.routesDb.toArray();
      const spreadRoutes: RoutesType[] = []
      routes.map(function iter(a) {
        const indexOfRoutesDb = routesDb.findIndex(b => b.state == a.state)
        const stateOfRoutesDb = routesDb[indexOfRoutesDb].state
        if (indexOfRoutesDb !== -1 && stateOfRoutesDb == a.state) {
          a.access = routesDb[indexOfRoutesDb].access;
          a.update = routesDb[indexOfRoutesDb].update;
          a.delete = routesDb[indexOfRoutesDb].delete;
          a.create = routesDb[indexOfRoutesDb].create;
        }
        spreadRoutes.push(a)
        Array.isArray(a.views) && a.views.map(iter as any);
      })
      dispatch({
        type: 'UPDATE_ROUTES',
        payload: routes as RoutesType[]
      })
      dispatch({
        type: 'SPREAD_ROUTES',
        payload: spreadRoutes as RoutesType[]
      })
    } else {
      deleteCookie('adminAccessToken')
      router.push('/')
    }

  }

  useEffect(() => {

    if (window.indexedDB !== undefined) {
      routesUpdateFromIndexDb()
    }

    return () => { }
  }, [])

  return updateRoutes;

}

export default useRoutesUpdate
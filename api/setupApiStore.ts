/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type AnyAction, combineReducers, configureStore, type EnhancedStore, type Middleware, type Reducer } from '@reduxjs/toolkit'

export function setupApiStore <TApi extends { reducer: Reducer<any, any>, reducerPath: string, middleware: Middleware, util: { resetApiState: () => any } },
TExtraReducers extends Record<string, Reducer<any, any>> = Record<never, never>> (api: TApi, extraReducers?: TExtraReducers): { api: any, store: EnhancedStore } {
  const getStore = () => configureStore({
    reducer: combineReducers({ [api.reducerPath]: api.reducer, ...extraReducers }),
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware)
    }
  })

  type Store = EnhancedStore<
  {
    api: ReturnType<TApi['reducer']>
  } & {
    [K in keyof TExtraReducers]: [ReturnType<TExtraReducers[K]>];
  },
  AnyAction,
  ReturnType<typeof getStore> extends EnhancedStore<any, any, infer M> ? M : never
  >

  const initialStore = getStore() as Store

  const refObj = {
    api,
    store: initialStore
  }

  const store = getStore() as Store
  refObj.store = store

  return refObj

  // return { store }
}

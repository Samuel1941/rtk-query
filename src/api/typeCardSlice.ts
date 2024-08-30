import type { Action, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

type RootState = any;

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

interface TypeCardItem {
  id: number;
}

interface TypeCardResponse {
  data: {
    items: TypeCardItem[];
  };
}

export const typeCardApi = createApi({
  reducerPath: 'typeCardApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['TypeCard'],
  endpoints: (build) => ({
    getTypeCard: build.query<TypeCardResponse, void>({
      query: () => 'type-card',
      providesTags: (result) =>
        result
          ? [
              ...result.data.items.map(({ id }) => ({ type: 'TypeCard', id } as const)),
              'TypeCard',
            ]
          : ['TypeCard'],
    }),
    createTypeCard: build.mutation<any, Partial<any>>({
      query: (newBin) => ({
        url: 'type-card',
        method: 'POST',
        body: newBin,
      }),
      invalidatesTags: ['TypeCard'], 
    }),
    updateTypeCard: build.mutation<any, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: 'type-card',
        method: 'PUT',
        body: { id, name },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'TypeCard', id }],
    }),
    deleteTypeCard: build.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `type-card/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'TypeCard', id }],
    }),
  }),
});

export const {
  useGetTypeCardQuery,
  useCreateTypeCardMutation,
  useUpdateTypeCardMutation,
  useDeleteTypeCardMutation,
} = typeCardApi;
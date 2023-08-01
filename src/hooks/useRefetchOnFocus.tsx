import {useFocusEffect} from '@react-navigation/native';
import {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import {useCallback} from 'react';

export function useReactNavigationQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
): UseQueryResult<TData, TError> {
  const useQueryReturn = useQuery(queryKey, queryFn, options);
  useFocusEffect(
    useCallback(() => {
      if (
        ((options?.refetchOnWindowFocus && useQueryReturn.isStale) ||
          options?.refetchOnWindowFocus === 'always') &&
        options?.enabled !== false
      ) {
        useQueryReturn.refetch();
      }
    }, [options?.enabled, options?.refetchOnWindowFocus]),
  );
  return useQueryReturn;
}

export const useRefetchOnFocus = (refetch: () => void) => {
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );
};

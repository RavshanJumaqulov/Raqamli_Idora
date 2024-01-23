import { axiosClient } from '@services/api'
import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'

interface ICustomUseQueryOptions extends Partial<UseQueryOptions> {}
interface ICustomUseMutationOptions extends Partial<UseMutationOptions> {}

export const getRequest = (url: string, config?: AxiosRequestConfig) =>
  axiosClient.get(`/${url}`, config)?.then((res) => res?.data)

export const postRequest = <T>(url: string, payload: T, config: AxiosRequestConfig = {}) =>
  axiosClient.post<any>(`/${url}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...config,
  })

export const putRequest = <T>(url: string, payload: T, config: AxiosRequestConfig = {}) =>
  axiosClient.put(`/${url}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...config,
  })

export const patchRequest = <T>(url: string, payload: T, config: AxiosRequestConfig = {}) =>
  axiosClient.patch(`/${url}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...config,
  })

export const deleteRequest = (url: string, config?: AxiosRequestConfig) =>
  axiosClient.delete(`/${url}`, config)

export const getQuery = <TData = undefined>(
  url: string,
  deps?: unknown[],
  options?: ICustomUseQueryOptions,
  config?: AxiosRequestConfig
) => {
  // @ts-ignore
  const res = useQuery<any, any, TData | undefined>({
    queryKey: deps ? [url, ...deps] : [url],
    queryFn: () => getRequest(url, config),
    ...(options || {}),
  })

  return res
}

export const postMutation = <TBody extends object = {}, TResponse extends object = {}>(
  url: string,
  options?: ICustomUseMutationOptions,
  config?: AxiosRequestConfig
): UseMutationResult => {
  const res = useMutation<TResponse, any, TBody>({
    // @ts-ignore
    mutationFn: (payload) => postRequest<TBody>(url, payload, config),
    ...(options || {}),
  })

  return res
}

export const putMutation = (
  url: string,
  options?: ICustomUseMutationOptions,
  config?: AxiosRequestConfig
): UseMutationResult => {
  const res = useMutation({
    mutationFn: (payload) => putRequest(url, payload, config),
    ...(options || {}),
  })

  return res
}

export const patchMutation = <TBody extends object = {}, TResponse extends object = {}>(
  url: string,
  options?: ICustomUseMutationOptions,
  config?: AxiosRequestConfig
): UseMutationResult => {
  const res = useMutation<TResponse, any, TBody>({
    // @ts-ignore
    mutationFn: (payload) => patchRequest(url, payload, config),
    ...(options || {}),
  })

  return res
}

export const deleteMutation = (
  url: string,
  options?: ICustomUseMutationOptions,
  config?: AxiosRequestConfig
): UseMutationResult => {
  const res = useMutation({
    mutationFn: (id) => deleteRequest(url + id, config),
    ...(options || {}),
  })

  return res
}

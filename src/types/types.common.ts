import { FieldPath, RegisterOptions } from 'react-hook-form'

export interface Option<TValue = any, TName extends string = string> {
  id: TValue
  name?: TName
  label?: TName
}

export interface ITableData<TData extends Option = Option> {
  count: number
  next: string
  previous: string
  results: TData[]
}
export type TSetState<StateType> = React.Dispatch<React.SetStateAction<StateType>>
export type TRules<FormNames extends Record<string, any>> = Omit<
  RegisterOptions<FormNames, FieldPath<FormNames>>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>
export type ComponentType<T> = T extends React.FC<infer P> ? P : never
export type IfEquals<T, U, Y = unknown, N = never> = (<G>() => G extends T ? 1 : 2) extends <
  G,
>() => G extends U ? 1 : 2
  ? Y
  : N

export interface TError {
  code: number
  message: string
  details: [
    {
      '@type': 'type.googleapis.com/general.ErrorInfo'
      message: string
      task_id: string
      bnpl_code: number
      label: {
        uz: string
        ru: string
        eng: string
      }
    },
  ]
}

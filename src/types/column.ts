export type TColumn = {
  readonly id: number
  name: string
  isCompletedColumn?: boolean
  taskIds: number[]
}
export type TColumns = { [id: string]: TColumn }

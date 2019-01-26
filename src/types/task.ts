export type TSubtask = {
  name: string
  completed: boolean
  readonly id: number
}

export type TSubtasks = TSubtask[]

export type TTask = {
  name: string
  readonly id: number
  description?: string
  dueDate?: Date
  hasPassed?: true
  color?: string
  subTasks: TSubtasks
  timeWorkedOn: number
}

export type TTasks = { [id: string]: TTask }

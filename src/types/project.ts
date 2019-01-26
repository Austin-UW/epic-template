export type TBaseProject = {
  // used in create-project form and doesn't contain super fancy stuff
  name: string
  categories: string[]
}

export type TProject = TBaseProject & {
  readonly id: number
  columnIds: number[]
}

export type TProjects = { [id: string]: TProject }

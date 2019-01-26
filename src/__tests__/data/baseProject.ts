import { TBaseProject } from 'src/types/project'

// used for createProjectA, is not the full project, just what the reducer needs to create it.
export const baseProjectStandard: TBaseProject = {
  name: "Katrina's Website",
  categories: ['business', 'web development', 'Katrina']
}

describe('baseProjectStandard', () => {
  // angery about not containing a test :P
  test('is defined', () => {
    expect(baseProjectStandard).toEqual(baseProjectStandard)
  })
})

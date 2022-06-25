import type { Group } from '@/@types/Group'

export type Person = {
  id: string
  name: string
  birthday: Date
  groups: Group[]
}

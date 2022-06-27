import type { Group } from '@/@types/Group'
import type { Parent } from '@/@types/Parent'

export type Person = {
  id: string
  name: string
  birthday: Date
  groups: Group[]
  parentOne?: Parent
  parentTwo?: Parent
  children?: Child[]
}

export type PersonUpdateInput = {
  name?: string
  birthday?: Date
  groups?: Group[]
  parentOne?: Parent
  parentTwo?: Parent
  children?: Child[]
}

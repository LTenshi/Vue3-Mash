export interface Choice {
  title: string
  selected?: boolean
  crossed: boolean
  highlighted: boolean
}

export interface ChoiceGroup {
  title: string
  choices: Choice[]
}

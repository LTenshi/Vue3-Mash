<template>
  <main>
    <MashTitle :mash="mash" />
    <SetupScreen @StartGame="HandleStart" v-if="gameState === 0" />
    <div v-if="gameState === 1" class="p-2 justify-items-center">
      <RandomiserPicker @number-picked="DivineOutcome" />
    </div>
    <div v-for="(cGroup, index) in choiceGroup" :key="index">
      <CategoryGroup :choice-group="cGroup" />
    </div>
    <RestartButton v-if="gameState === 3" @clicked="HandleRestart" />
  </main>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref } from 'vue'
import type { Choice, ChoiceGroup } from './classes/Choice'
import type { SetupData } from './classes/SetupData'
import {
  CategoryGroup,
  RandomiserPicker,
  MashTitle,
  SetupScreen,
  RestartButton,
} from './components'

const choiceGroup = ref<ChoiceGroup[]>([])
const gameState = ref(0)
const secretNumberWas = ref(0)

// Could also use a GUID or some obscure symbols.
// I made mash to be a choice group as it's less data that way
const MASH_TITLE = 'THISISTECHNICALLYABUGBECAUSESOMEONECOULDWRITETHISBUTITSHIGHLYUNLIKELY'

const mash = ref<ChoiceGroup>({
  title: MASH_TITLE,
  choices: [
    {
      title: 'M',
      crossed: false,
      highlighted: false,
    },
    {
      title: 'A',
      crossed: false,
      highlighted: false,
    },
    {
      title: 'S',
      crossed: false,
      highlighted: false,
    },
    {
      title: 'H',
      crossed: false,
      highlighted: false,
    },
  ],
})

function DivineOutcome(withTheNumberThyPicked: number) {
  // This protects against a hot reload issue
  if (gameState.value === 3) {
    return
  }
  secretNumberWas.value = withTheNumberThyPicked

  const andWithTheArraysCombined: ChoiceGroup[] = [mash.value, ...choiceGroup.value]

  const butIExcludeTheCompleted = new Set()

  let andICountForThee = 0
  while (butIExcludeTheCompleted.size !== andWithTheArraysCombined.length) {
    andWithTheArraysCombined.forEach((divinationCategory, divinationCategoryIndex) => {
      if (divinationCategory.choices.filter((choice) => !choice.crossed).length === 1) {
        const theChoiceThatRemainedBurnedIntoHistory = divinationCategory.choices.find(
          (choice) => !choice.crossed,
        )
        if (theChoiceThatRemainedBurnedIntoHistory && divinationCategory.title !== MASH_TITLE) {
          theChoiceThatRemainedBurnedIntoHistory.selected = true
        }
        if (theChoiceThatRemainedBurnedIntoHistory && divinationCategory.title === MASH_TITLE) {
          theChoiceThatRemainedBurnedIntoHistory.crossed = true
        }
        butIExcludeTheCompleted.add(divinationCategoryIndex)
      }

      if (butIExcludeTheCompleted.has(divinationCategoryIndex)) {
        return
      }

      divinationCategory.choices.forEach(async (choice) => {
        if (!choice.crossed) {
          andICountForThee++
        }
        choice.highlighted = true
        if (andICountForThee % withTheNumberThyPicked === 0) {
          choice.highlighted = false
          choice.crossed = true
          andICountForThee = 0
        }
        choice.highlighted = false
      })
    })
  }
  gameState.value = 3
}

function HandleRestart() {
  choiceGroup.value = []
  gameState.value = 0
}

function HandleStart(setupData: SetupData[]) {
  choiceGroup.value = []
  setupData.forEach((value) => {
    if (!value.title) {
      return
    }

    const setupChoices: Choice[] = []

    value.childTitle?.forEach((title) => {
      setupChoices.push({
        title: title,
        crossed: false,
        selected: false,
        highlighted: false,
      })
    })

    choiceGroup.value.push({
      title: value.title,
      choices: setupChoices,
    })
  })
  gameState.value = 1
}
</script>

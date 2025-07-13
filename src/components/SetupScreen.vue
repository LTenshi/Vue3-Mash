<template>
  <!--This could be a new page, but for the purpose of this simple app we are simply keeping it on the top level-->
  <div>
    <h1>Categories</h1>
    <h6>Setup your own!</h6>
    <div
      id="btn-add-category"
      class="flex flex-col mt-2 bg-black/40 rounded-md p-1 px-2 hover:bg-black/20"
      @click="setupData?.push({ id: categoriesCount++ })"
    >
      <button>Add Category</button>
    </div>
    <div class="flex flex-row flex-wrap w-full items-center">
      <div
        class="m-2 flex flex-1 flex-col justify-center"
        v-for="(item, catIndex) in setupData"
        :key="catIndex"
      >
        <input
          :id="`in-category-${catIndex}`"
          class="mt-2 bg-yellow-500/20 rounded-md p-1 px-2 hover:bg-yellow-500/10"
          style="text-align: center"
          placeholder="Category Name"
          @input="HandleCategoryInput(item)"
          @focusout="void (!item.title && setupData.splice(catIndex, 1))"
          v-model="item.title"
        />
        <div v-if="item.childTitle">
          <div v-for="(_, chIndex) in item.childTitle" :key="chIndex">
            <input
              :id="`in-childTitle-${catIndex}-${chIndex}`"
              :style="`background-color: rgba(155, 0, 0, ${Math.min(Math.max(chIndex * 0.1, 0), 1)})`"
              class="mt-2 w-full rounded-md p-1 px-2 hover:bg-black/10"
              style="text-align: center"
              placeholder="Option Name"
              @input="
                item.childTitle[chIndex + 1] === undefined &&
                item.childTitle.length < 100 &&
                item.childTitle.push('')
              "
              v-model="item.childTitle[chIndex]"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-2 flex flex-col w-full items-center">
      <button
        class="p-2 rounded-md"
        :class="isStartGameDisabled ? 'bg-black/5 text-white/10' : 'bg-black/20 hover:bg-black/10'"
        @click="StartGame"
        :disabled="isStartGameDisabled"
      >
        Start Game
      </button>
      <h6 class="pt-2">{{ startGameValidationText }}</h6>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SetupData } from '@/classes/SetupData'
import { computed, ref } from 'vue'

const emit = defineEmits(['StartGame'])
const setupData = ref<SetupData[]>([])
const categoriesCount = ref(0)

const startGameValidationText = computed(() => {
  if (isAtLeastOneCategoryFilled.value) {
    return 'You need to add at least one category and one answer!'
  }
  if (setupData.value.length === 1) {
    return 'The game will work but consider adding more categories'
  }
  if (!isEveryCategoryPrimed.value) {
    return 'You have added a new category but it is unnamed or it has no answers'
  }

  return ''
})

const isStartGameDisabled = computed(() => {
  return !(isAtLeastOneCategoryFilled.value || isEveryCategoryPrimed.value)
})

const isAtLeastOneCategoryFilled = computed(() => {
  return (
    !setupData.value.length ||
    !setupData.value[0].title ||
    !setupData.value[0].childTitle ||
    setupData.value[0].childTitle.length - 1 < 1
  )
})

const isEveryCategoryPrimed = computed(() => {
  let verificationStatus = true

  setupData.value.forEach((category) => {
    if (!category.title || (category.childTitle && category.childTitle.join().trim() === '')) {
      verificationStatus = false
    }
  })

  return verificationStatus
})

function HandleCategoryInput(item: SetupData): void {
  void (item.title && !item.childTitle?.length && (item.childTitle = ['']))
}

function PurifySetupData() {
  // We need to remove every option that wasn't filled in
  setupData.value.forEach((category) => {
    //Should cover the theoretical max of 100
    if (category.childTitle && category.childTitle?.length < 99) {
      category.childTitle?.splice(category.childTitle.length - 1, 1)
    }
  })
}

function StartGame(): void {
  PurifySetupData()

  emit('StartGame', setupData.value)
}
</script>

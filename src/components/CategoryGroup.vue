<template>
  <div class="bg-black/20 p-2 rounded-md m-2">
    <div class="bg-blue-500/10 p-2 underline">{{ choiceGroup.title }}</div>
    <div v-for="(choice, index) in choiceGroup.choices" :key="index">
      <CategoryChoice :choice="choice" :choice-index="index" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ChoiceGroup } from '@/classes/Choice'
import CategoryChoice from './CategoryChoice.vue'

interface Props {
  choiceGroup: ChoiceGroup
}

defineProps<Props>()
</script>

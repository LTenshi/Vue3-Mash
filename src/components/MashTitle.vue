<template>
  <div class="flex items-center mb-3">
    <div v-for="choice in mash.choices" :key="`mash-${choice.title}`" class="flex-col w-100">
      <CategoryChoice :choice="choice" :choice-index="0" override-class="text-center" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChoiceGroup } from '@/classes/Choice'
import CategoryChoice from './CategoryChoice.vue'

interface Props {
  mash: ChoiceGroup
}

defineProps<Props>()
</script>

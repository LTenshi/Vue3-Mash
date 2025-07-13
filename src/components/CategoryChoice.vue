<template>
  <div
    class="p-2 my-2 rounded-md"
    :style="GetChoiceStyle"
    :class="ChoiceClass(choice) + ' ' + overrideClass"
  >
    {{ choice.title }}
  </div>
</template>

<style>
@keyframes mysteryBlink {
  0% {
    opacity: 100%;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 100%;
  }
}
</style>

<script setup lang="ts">
import { type Choice } from '@/classes/Choice'
import { computed } from 'vue'

interface Props {
  choice: Choice
  choiceIndex: number
  overrideClass?: string
}

const props = withDefaults(defineProps<Props>(), { overrideClass: '' })

const GetChoiceStyle = computed(() => {
  if (!props.choice.crossed && !props.choice.selected) {
    return `background-color: rgba(155, 0, 0, ${Math.min(Math.max(props.choiceIndex * 0.1, 0), 1)}); animation-name: mysteryBlink; animation-iteration-count: infinite; animation-duration: ${Math.random() * (10 - 4) + 4}s`
  }
  return ''
})

function ChoiceClass(choice: Choice): string {
  const resultClass: string[] = []

  if (!props.choice.crossed && !props.choice.selected) {
    resultClass.push(`blinking`)
  }

  void (choice.crossed && resultClass.push('line-through'))
  void (choice.selected && resultClass.push('bg-purple-500/50'))

  return resultClass.join(' ')
}
</script>

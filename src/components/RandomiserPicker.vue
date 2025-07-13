<template>
  <div class="bg-black/20 w-1/8 p-2 text-center rounded-md">
    <div>Roll your number:</div>
    <h2>
      {{ rollingNumber }}
    </h2>
    <button
      :disabled="hasBeenClicked"
      :class="hasBeenClicked ? 'bg-black/5 text-white/10' : 'bg-black/20 hover:bg-black/10'"
      class="bg-black/20 p-2 rounded-md hover:bg-black/10"
      @click="stopRoll()"
    >
      Stop!
    </button>
  </div>
</template>

<style></style>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, defineEmits } from 'vue'

const hasBeenClicked = ref(false)
const rollingNumber = ref(0)
const interval = ref<number>()
const emit = defineEmits(['numberPicked'])

function stopRoll() {
  clearInterval(interval.value)
  hasBeenClicked.value = true
  emit('numberPicked', rollingNumber.value)
}

function rollNumber() {
  //The 10 here is arbitiary, we can have this be a setting in the future
  rollingNumber.value = Math.floor(Math.random() * (25 - 2) + 2)
}

onMounted(() => {
  interval.value = window.setInterval(() => {
    rollNumber()
  }, 10)
})

onBeforeUnmount(() => {
  window.clearInterval(interval.value)
})
</script>

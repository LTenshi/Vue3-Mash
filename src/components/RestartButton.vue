<template>
  <div class="mt-2 flex justify-self-center">
    <button class="bg-black/20 p-2 rounded-md hover:bg-black/10" @click="Restart()">
      Restart!
    </button>
  </div>
</template>

<style></style>

<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits(['clicked'])

function Restart() {
  emit('clicked')
}
</script>

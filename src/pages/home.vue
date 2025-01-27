<script setup lang="ts">
import NumberTicker from '@/components/number-ticker.vue';
import ColorBox from '../components/color-box.vue';
import { colors, shadesKey } from '../lib/colors';
import { onMounted, ref } from 'vue';

const data = ref()

function createCounter() {
  return fetch(`${import.meta.env.VITE_COUNTER_URL}`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        current_value: 0
      })
    })
}

function getCounter() {
  fetch(`${import.meta.env.VITE_COUNTER_URL}`)
    .then((res) => res)
    .then((res) => res.json())
    .then(res => {
      if (res.exists === false) {
        createCounter().then(() => getCounter())
      }
      data.value = res
    });
}

onMounted(() => {
  getCounter()
})
</script>

<template>
  <main class="flex flex-col my-6 max-w-4xl mx-auto pb-8">
    <div class="h-96 flex flex-col justify-center items-center">
      <h1 class="font-bold text-4xl mb-4 w-96 text-center leading-tight bg-gradient-to-br from-gray-800 to-gray-400 text-transparent bg-clip-text">The Color Palette from Tailwind</h1>
      <p class="flex items-center gap-1 border border-gray-200 rounded-xl px-2 py-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
          <path
            d="M88,24V16a8,8,0,0,1,16,0v8a8,8,0,0,1-16,0ZM16,104h8a8,8,0,0,0,0-16H16a8,8,0,0,0,0,16ZM124.42,39.16a8,8,0,0,0,10.74-3.58l8-16a8,8,0,0,0-14.31-7.16l-8,16A8,8,0,0,0,124.42,39.16Zm-96,81.69-16,8a8,8,0,0,0,7.16,14.31l16-8a8,8,0,1,0-7.16-14.31ZM219.31,184a16,16,0,0,1,0,22.63l-12.68,12.68a16,16,0,0,1-22.63,0L132.7,168,115,214.09c0,.1-.08.21-.13.32a15.83,15.83,0,0,1-14.6,9.59l-.79,0a15.83,15.83,0,0,1-14.41-11L32.8,52.92A16,16,0,0,1,52.92,32.8L213,85.07a16,16,0,0,1,1.41,29.8l-.32.13L168,132.69ZM208,195.31,156.69,144h0a16,16,0,0,1,4.93-26l.32-.14,45.95-17.64L48,48l52.2,159.86,17.65-46c0-.11.08-.22.13-.33a16,16,0,0,1,11.69-9.34,16.72,16.72,0,0,1,3-.28,16,16,0,0,1,11.3,4.69L195.31,208Z">
          </path>
        </svg>

        Click the color-box to copy the color.
      </p>
      <div
        class="flex items-center justify-center mt-4 mb-2 text-lg font-bold border-3 border-gray-500 bg-gradient-to-b from-gray-800 to to-gray-500 rounded-xl px-2 py-1">
        <p class="whitespace-pre-wrap font-medium leading-6 text-white flex items-center">
          <NumberTicker :value="data.current_value" :decimal-places="0" v-if="data?.current_value" />
        <p v-else>0</p>
        </p>
      </div>
      <small class="text-gray-500">Color box has been clicked so far.</small>
    </div>
    <div class="grid gap-4 p-4 border-slate-200 rounded-lg w-full md:justify-center">
      <div class="hidden md:flex w-full h-fit sticky top-6 z-10 mb-4">
        <label class="lg:flex-grow-1"></label>
        <section class="flex gap-4 bg-white/70 text-center rounded-lg py-2 border border-gray-100/70 backdrop-blur-lg">
          <template v-for="(shade, index) in shadesKey" :key="index">
            <span class="w-14 block font-medium text-sm" :data-shade="index">{{ shade }}</span>
          </template>
        </section>
      </div>
      <div class="divide-y space-y-3 md:space-y-6 divide-dashed divide-gray-200 sm:max-md:grid grid-cols-2 gap-4">
        <template v-for="(color, key, index) in colors" :key="index">
          <div class="lg:flex w-full pb-6 md:pb-3 gap-4">
            <label class="lg:flex-grow-1 capitalize font-semibold block mb-2" :data-color-index="index"> {{ key }} </label>
            <section class="max-md:w-full flex max-md:flex-col gap-4">
              <template v-for="(shade, shadeKey, shadeIndex) in color" :key="shadeIndex">
                <ColorBox @clicked="data?.current_value ? data.current_value += 1 : null" :color="shade" :color-name="key"
                  :color-shade="shadeKey" :data-shade-index="shadeIndex" />
              </template>
            </section>
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

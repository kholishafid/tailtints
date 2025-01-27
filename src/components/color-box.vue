<script setup lang="ts">
import { formatHex, oklch } from 'culori';
import { colors } from '../lib/colors';

const props = defineProps<{
  color: string;
  colorName: keyof typeof colors;
  colorShade: keyof typeof colors['amber'];
}>()

const emits = defineEmits<{
  clicked: []
}>()

const colorInHex = formatHex(oklch(props.color))

function increaseIncrement() {
  return fetch(`${import.meta.env.VITE_COUNTER_URL}/increment`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
    })
}

function copyToClipboard({ colorName, colorShade, color }: { colorName: string, colorShade: string, color: string | undefined }) {
  if (!color) {
    return alert('Sorry Something Went Wrong!');
  }

  const cbox = document.getElementById(`cbox-${colorName}-${colorShade}`)
  if (cbox?.getAttribute('data-copied') === "true") {
    return
  }

  navigator.clipboard.writeText(color);
  cbox?.setAttribute('data-copied', "true");
  emits('clicked');
  increaseIncrement();
   setTimeout(() => {
    cbox?.setAttribute('data-copied', "false");
  }, 1200);
}
</script>

<template>
  <div class="relative">
    <div
      :style="`background-color: ${color};outline-color:${parseInt(colorShade) >= 400 ? colors[colorName]['50'] : colors[colorName]['300']};`"
      class="md:h-14 md:w-14 w-full h-18 rounded-lg cursor-pointer outline-2 relative group"
      :id="`cbox-${colorName}-${colorShade}`" data-copied="false" @click="copyToClipboard({
        color: colorInHex,
        colorName,
        colorShade
      })">
      <div
        class="text-xs absolute top-2 right-2 md:-translate-x-[50%]  md:left-[50%] md:-top-8 w-fit text-nowrap bg-green-500 p-1 rounded-lg text-white flex gap-0.5 group-data-[copied=false]:opacity-0 group-data-[copied=false]:scale-80 group-data-[copied=true]:opacity-100  group-data-[copied=true]:scale-100 transition-all duration-300 bubble-sm-none bubble pointer-events-none select-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none" />
          <polyline points="16 130.29 54.4 168 144 80" fill="none" stroke="currentColor" stroke-linecap="round"
            stroke-linejoin="round" stroke-width="16" />
          <polyline points="125.96 144 150.4 168 240 80" fill="none" stroke="currentColor" stroke-linecap="round"
            stroke-linejoin="round" stroke-width="16" />
        </svg>
        Copied
      </div>
    </div>
    <small class="text-[12px] text-gray-600 hidden md:block text-center mt-1">{{
      colorInHex }}</small>
    <div class="text-[12px] absolute z-10 bottom-2 left-2 px-0.5 block md:hidden"
      :style="`color:${parseInt(colorShade) >= 400 ? colors[colorName]['50'] : colors[colorName]['600']} ;`">
     <span class="block font-semibold">{{ colorShade }}</span>
      {{
        colorInHex }}</div>
  </div>
</template>

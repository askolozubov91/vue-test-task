<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transitionName">
      <component :is="Component" class="absolute w-full h-full bg-white" />
    </transition>
  </router-view>
</template>

<script></script>

<style></style>

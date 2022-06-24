<template>
  <div>
    <TopMenu />

    <div style="padding-top: 56px">
      <router-view v-slot="{ Component }">
        <transition name="slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<template>
  <div>
    <TopMenu />

    <div style="padding-top: 56px">
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

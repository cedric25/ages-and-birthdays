<template>
  <v-app>
    <TopMenu />

    <v-content>
      <router-view class="child-view" />
    </v-content>
  </v-app>
</template>

<script>
  import TopMenu from './components/TopMenu.vue'

  export default {
    components: {
      TopMenu,
    },
  }
</script>

<style scoped lang="scss">
  .theme--light.v-application {
    background-color: #fafafa;
  }

  a {
    text-decoration: none;
  }

  @media (max-width: 450px) {
    >>> .toolbar__content {
      margin-left: 16px;

      > a {
        margin-left: 0 !important;
      }
    }
    >>> .toolbar__items {
      margin-right: 16px !important;
    }

    .header-title {
      margin-left: 0;
    }
  }

  >>> .content--wrap {
    background-image: url(/static/img/material2-bw.jpg);
    background-attachment: fixed;
    background-position: center;
    background-size: auto 100%;
    @media (min-aspect-ratio: 35/20) {
      background-size: 100% auto;
    }
  }
</style>

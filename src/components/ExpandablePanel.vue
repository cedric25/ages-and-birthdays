<template>
  <div class="m-auto bg-white" style="max-width: 95%;">
    <div class="px-6 py-5 cursor-pointer" @click="changeExpandedState">
      {{ panelHeaderTitle }}
    </div>
    <div v-show="isExpanded" ref="addBirthPanelContent" class="px-6 py-5">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ExpandablePanel',
    props: {
      panelHeaderTitle: { type: String, required: true },
      showContent: { type: Boolean, default: false },
    },
    data: () => ({
      isExpanded: null,
    }),
    watch: {
      showContent: {
        handler(value) {
          this.isExpanded = value
        },
        immediate: true,
      },
    },
    methods: {
      changeExpandedState() {
        this.isExpanded = !this.isExpanded
        this.$emit('isExpanded', this.isExpanded)
      },
    },
  }
</script>

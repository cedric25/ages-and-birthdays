<template>
  <div class="m-auto bg-white" style="max-width: 95%;">
    <div class="flex justify-between px-6 py-3 cursor-pointer" @click="changeExpandedState">
      <div>
        {{ panelHeaderTitle }}
      </div>
      <div>
        <i v-if="isExpanded" class="fa fa-chevron-up text-sm text-gray-600" />
        <i v-else class="fa fa-chevron-down text-sm text-gray-600" />
      </div>
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

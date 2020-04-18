<template>
  <div class="m-auto bg-white overflow-hidden" style="max-width: 95%;">
    <div
      class="flex items-center justify-between px-6 py-3 cursor-pointer relative bg-white z-20"
      @click="changeExpandedState"
    >
      <div>
        {{ panelHeaderTitle }}
      </div>
      <i ref="chevron" class="fa fa-chevron-up text-sm text-gray-600" />
    </div>
    <div ref="panelContent" class="z-10">
      <div class="px-6 py-5">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
  import anime from 'animejs'

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
          value ? this.expand() : this.collapse()
          this.isExpanded = value
        },
      },
    },
    mounted() {
      this.isExpanded ? this.expand() : this.collapse()
    },
    methods: {
      changeExpandedState() {
        !this.isExpanded ? this.expand() : this.collapse()
        this.isExpanded = !this.isExpanded
        this.$emit('isExpanded', this.isExpanded)
      },
      expand() {
        const timeline = anime.timeline({ duration: 500 })
        timeline
          .add({
            targets: this.$refs.panelContent,
            translateY: 0,
            height: [0, 472],
            easing: 'easeOutElastic(1, 1.5)',
          })
          .add(
            {
              targets: this.$refs.chevron,
              rotate: 0,
              easing: 'easeOutQuart',
            },
            0
          )
      },
      collapse() {
        const timeline = anime.timeline({ duration: 500 })
        timeline
          .add({
            targets: this.$refs.panelContent,
            translateY: -500,
            height: [432, 0],
            easing: 'easeOutQuart',
          })
          .add(
            {
              targets: this.$refs.chevron,
              rotate: 180,
              easing: 'easeOutQuart',
            },
            0
          )
      },
    },
  }
</script>

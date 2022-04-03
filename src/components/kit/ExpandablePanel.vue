<template>
  <div class="m-auto overflow-hidden bg-white" style="max-width: 95%">
    <div
      class="relative z-20 flex cursor-pointer items-center justify-between bg-white px-6 py-3"
      @click="changeExpandedState"
    >
      <div ref="panelHeaderTitle">
        <i v-if="prefixIcon" :class="prefixIcon" class="mr-2 text-blue-600" />
        {{ panelHeaderTitle }}
      </div>
      <i ref="chevron" class="fa fa-chevron-down text-sm text-gray-600" />
    </div>
    <div
      :ref="panelContentRef"
      :class="panelContentRef"
      class="panel-content z-10"
    >
      <div class="px-6 py-5">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs'
import { mapGetters } from 'vuex'

export default {
  name: 'ExpandablePanel',
  props: {
    panelHeaderTitle: { type: String, required: true },
    prefixIcon: { type: String, required: false },
    showContent: { type: Boolean, default: false },
  },
  data: () => ({
    isExpanded: false,
  }),
  computed: {
    ...mapGetters(['loginTriedOrFinished']),
    panelContentRef() {
      return `panel-content-${this._uid}`
    },
    panelContentDomElement() {
      return this.$refs[this.panelContentRef]
    },
  },
  watch: {
    showContent: {
      handler(value) {
        value ? this.expand() : this.collapse()
        this.isExpanded = value
      },
    },
  },
  mounted() {
    this.panelContentDomElement.style.height = 0
  },
  methods: {
    changeExpandedState() {
      !this.isExpanded ? this.expand() : this.collapse()
      this.isExpanded = !this.isExpanded
      this.$emit('isExpanded', this.isExpanded)
    },
    expand() {
      // 1- Calculate height
      this.panelContentDomElement.style.height = 'auto'
      const contentHeight = this.panelContentDomElement.offsetHeight
      this.panelContentDomElement.style.height = 0

      // 2- Expand
      const timeline = anime.timeline({
        duration: 500,
        complete: () => {
          // 3- Back to height: auto
          this.panelContentDomElement.style.height = 'auto'
        },
      })
      timeline
        .add({
          targets: this.panelContentDomElement,
          translateY: 0,
          height: [0, contentHeight],
          easing: 'easeOutElastic(1, 1.5)',
        })
        .add(
          {
            targets: this.$refs.chevron,
            rotate: 180,
            easing: 'easeOutQuart',
          },
          0
        )
        .add(
          {
            targets: this.$refs.panelHeaderTitle,
            translateY: 5,
            easing: 'easeOutQuart',
          },
          0
        )
    },
    collapse() {
      const currentHeight = this.panelContentDomElement.offsetHeight
      this.panelContentDomElement.style.height = `${currentHeight}px`

      const timeline = anime.timeline({ duration: 500 })
      timeline
        .add({
          targets: this.panelContentDomElement,
          translateY: -currentHeight,
          height: [currentHeight, 0],
          easing: 'easeOutQuart',
        })
        .add(
          {
            targets: this.$refs.chevron,
            rotate: 0,
            easing: 'easeOutQuart',
          },
          0
        )
        .add(
          {
            targets: this.$refs.panelHeaderTitle,
            translateY: 0,
            easing: 'easeOutQuart',
          },
          0
        )
    },
  },
}
</script>

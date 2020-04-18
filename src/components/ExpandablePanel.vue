<template>
  <div class="m-auto bg-white overflow-hidden" style="max-width: 95%;">
    <div
      class="flex items-center justify-between px-6 py-3 cursor-pointer relative bg-white z-20"
      @click="changeExpandedState"
    >
      <div ref="panelHeaderTitle">
        {{ panelHeaderTitle }}
      </div>
      <i ref="chevron" class="fa fa-chevron-up text-sm text-gray-600" />
    </div>
    <div :ref="panelContentRef" :class="panelContentRef" class="panel-content z-10">
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
      showContent: { type: Boolean, default: false },
    },
    data: () => ({
      isMounted: false,
      contentHeight: null,
      isExpanded: true,
    }),
    computed: {
      ...mapGetters(['loginTriedOrFinished']),
      panelContentRef() {
        return `panel-content-${this._uid}`
      },
    },
    watch: {
      showContent: {
        handler(value) {
          value ? this.expand() : this.collapse()
          this.isExpanded = value
        },
      },
      isMounted() {
        this.saveContentHeight()
      },
      loginTriedOrFinished: {
        handler() {
          this.saveContentHeight()
        },
        immediate: true,
      },
    },
    mounted() {
      this.isMounted = true
    },
    methods: {
      saveContentHeight() {
        if (this.isMounted && this.loginTriedOrFinished) {
          this.contentHeight = this.$refs[this.panelContentRef].offsetHeight
          this.isExpanded = false
          this.collapse()
        }
      },
      changeExpandedState() {
        !this.isExpanded ? this.expand() : this.collapse()
        this.isExpanded = !this.isExpanded
        this.$emit('isExpanded', this.isExpanded)
      },
      expand() {
        const timeline = anime.timeline({ duration: 500 })
        timeline
          .add({
            targets: this.$refs[this.panelContentRef],
            translateY: 0,
            height: [0, this.contentHeight],
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
        const timeline = anime.timeline({ duration: 500 })
        timeline
          .add({
            targets: this.$refs[this.panelContentRef],
            translateY: -this.contentHeight,
            height: [this.contentHeight, 0],
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

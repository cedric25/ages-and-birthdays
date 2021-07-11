<template>
  <div
    :ref="id"
    :class="visible ? '' : 'opacity-0 pointer-events-none'"
    class="
      modal
      fixed
      w-full
      h-full
      top-0
      left-0
      flex
      items-center
      justify-center
      z-40
    "
  >
    <div
      class="absolute w-full h-full bg-gray-900 opacity-50"
      @click="toggleModal"
    ></div>

    <div
      class="
        modal-container
        bg-white
        w-11/12
        md:max-w-md
        mx-auto
        rounded
        shadow-lg
        z-50
        overflow-y-auto
      "
    >
      <button
        type="button"
        class="
          absolute
          right-0
          cursor-pointer
          flex flex-col
          items-center
          mt-4
          mr-4
          text-white text-sm
          z-50
        "
        style="top: 56px"
        @click="toggleModal"
      >
        <svg
          class="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
          ></path>
        </svg>
        <span class="text-sm">(Esc)</span>
      </button>

      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <div class="modal-content py-4 text-left px-6">
        <div class="flex justify-between items-center pb-3">
          <p class="text-2xl">
            <slot name="title"></slot>
          </p>
          <button
            type="button"
            class="cursor-pointer z-50"
            @click="toggleModal"
          >
            <svg
              class="fill-current text-black"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
              ></path>
            </svg>
          </button>
        </div>

        <slot name="content"></slot>

        <div class="flex justify-end pt-2">
          <button
            type="button"
            class="px-4 py-3 rounded hover:bg-gray-100"
            @click="toggleModal"
          >
            Close
          </button>
          <slot name="action"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'

export default {
  name: 'Modal',
  props: {
    id: { type: String, default: nanoid() },
    showModal: { type: Number, default: 0 },
    hideModal: { type: Number, default: 0 },
  },
  data: () => ({
    visible: false,
  }),
  watch: {
    showModal() {
      this.toggleModal()
      this.registerEscapeKeyEvent()
    },
    hideModal() {
      this.toggleModal()
      this.unregisterEscapeKeyEvent()
    },
  },
  methods: {
    toggleModal() {
      this.visible = !this.visible
      const body = document.querySelector('body')
      body.classList.toggle('modal-active')
      if (!this.visible) {
        this.$emit('close')
      }
    },
    registerEscapeKeyEvent() {
      document.addEventListener('keydown', this.handleEscapeKey)
    },
    unregisterEscapeKeyEvent() {
      document.removeEventListener('keydown', this.handleEscapeKey)
    },
    handleEscapeKey(evt) {
      evt = evt || window.event
      let isEscape = false
      if ('key' in evt) {
        isEscape = evt.key === 'Escape' || evt.key === 'Esc'
      } else {
        isEscape = evt.keyCode === 27
      }
      if (isEscape && this.visible) {
        this.toggleModal()
      }
    },
  },
}
</script>

<style scoped>
.modal {
  transition: opacity 0.25s ease;
}
body.modal-active {
  overflow-x: hidden;
  overflow-y: visible !important;
}
</style>

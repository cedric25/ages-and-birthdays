<template>
  <div
    :ref="id"
    :class="visible ? '' : 'pointer-events-none opacity-0'"
    class="modal fixed top-0 left-0 z-40 flex h-full w-full items-center justify-center"
  >
    <div
      class="absolute h-full w-full bg-gray-900 opacity-50"
      @click="toggleModal"
    ></div>

    <div
      class="modal-container z-50 mx-auto w-11/12 overflow-y-auto rounded bg-white shadow-lg md:max-w-md"
    >
      <button
        type="button"
        class="absolute right-0 z-50 mt-4 mr-4 flex cursor-pointer flex-col items-center text-sm text-white"
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
      <div class="modal-content py-4 px-6 text-left">
        <div class="flex items-center justify-between pb-3">
          <p class="text-2xl">
            <slot name="title"></slot>
          </p>
          <button
            type="button"
            class="z-50 cursor-pointer"
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
            class="rounded px-4 py-3 hover:bg-gray-100"
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

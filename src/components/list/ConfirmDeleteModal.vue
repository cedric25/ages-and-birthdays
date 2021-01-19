<template>
  <div
    class="modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center z-40"
  >
    <div
      class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
    ></div>

    <div
      class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
    >
      <div
        class="modal-close absolute right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
        style="top: 56px"
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
      </div>

      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <div class="modal-content py-4 text-left px-6">
        <!--Title-->
        <div class="flex justify-between items-center pb-3">
          <p class="text-2xl">
            Remove birthday of <strong>{{ personName }}</strong
            >?
          </p>
          <div class="modal-close cursor-pointer z-50">
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
          </div>
        </div>

        <!--Body-->
        <!--<p>Modal content can go here</p>-->

        <!--Footer-->
        <div class="flex justify-end pt-2">
          <button
            type="button"
            class="modal-close px-4 py-3 rounded hover:bg-gray-100"
          >
            No
          </button>
          <button
            type="button"
            class="btn btn-blue px-4 py-3 ml-2"
            @click="yes"
          >
            Yes, do it!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmDeleteModal',
  props: {
    personId: { type: String, required: true },
    personName: { type: String, required: true },
    showModal: { type: Number, required: true },
  },
  mounted() {
    const overlay = document.querySelector('.modal-overlay')
    overlay.addEventListener('click', this.toggleModal)

    const closeModalElements = document.querySelectorAll('.modal-close')
    for (const closeModalEl of closeModalElements) {
      closeModalEl.addEventListener('click', this.toggleModal)
    }

    document.onkeydown = evt => {
      evt = evt || window.event
      let isEscape = false
      if ('key' in evt) {
        isEscape = evt.key === 'Escape' || evt.key === 'Esc'
      } else {
        isEscape = evt.keyCode === 27
      }
      if (isEscape && document.body.classList.contains('modal-active')) {
        this.toggleModal()
      }
    }
  },
  watch: {
    showModal() {
      this.toggleModal()
    },
  },
  methods: {
    toggleModal() {
      const body = document.querySelector('body')
      const modal = document.querySelector('.modal')
      modal.classList.toggle('opacity-0')
      modal.classList.toggle('pointer-events-none')
      body.classList.toggle('modal-active')
    },
    yes() {
      this.$emit('confirm', this.personId)
      this.toggleModal()
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

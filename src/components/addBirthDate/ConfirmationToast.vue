<template>
  <div v-if="showConfirmation" class="alert-toast fixed top-0 right-0 m-8 w-1/3 max-w-sm">
    <input type="checkbox" class="hidden" id="footertoast" />

    <label
      class="close cursor-pointer flex items-center justify-between py-2 px-3 text-white bg-green-500 rounded shadow-lg"
      title="close"
      for="footertoast"
    >
      <span>
        You've added <strong>{{ addedName }}</strong
        >!</span
      >
      <span class="w-6 h-6 flex items-center justify-center rounded-full hover:bg-green-400">
        <i class="fa fa-times" />
      </span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'ConfirmationToast',
    props: {
      showConfirmation: { type: Boolean, default: false },
      addedName: { type: String, required: true },
    },
  }
</script>

<style scoped>
  /*Toast open/load animation*/
  .alert-toast {
    -webkit-animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  /*Toast close animation*/
  .alert-toast input:checked ~ * {
    -webkit-animation: fade-out-right 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: fade-out-right 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  @-webkit-keyframes slide-in-right {
    0% {
      -webkit-transform: translateX(1000px);
      transform: translateX(1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-right {
    0% {
      -webkit-transform: translateX(1000px);
      transform: translateX(1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
  @-webkit-keyframes fade-out-right {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translateX(50px);
      transform: translateX(50px);
      opacity: 0;
    }
  }
  @keyframes fade-out-right {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translateX(50px);
      transform: translateX(50px);
      opacity: 0;
    }
  }
</style>

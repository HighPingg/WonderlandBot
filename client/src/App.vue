<template>
  <span
    id="aiResponse"
    style="color: white"
    v-if="$store.state.aiResponse !== null"
    >{{ $store.getters.aiResponse }}
  </span>
  <TextboxComponent />
  <errorModal/>
  <audio
    id="test"
    v-if="$store.state.aiResponseAudio !== null"
    :src="$store.getters.aiResponseAudio"
    autoplay
  ></audio>
</template>

<script>
import TextboxComponent from "./components/Textbox.vue";
import errorModal from "./components/errorModal.vue"

export default {
  name: "App",
  components: {
    TextboxComponent,
    errorModal
  }
};
</script>

<style>
#app {
  background-image: url("assets/bg.png");
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
</style>

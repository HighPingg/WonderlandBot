<template>
  <span
    id="aiResponse"
    style="color: white"
    v-if="$store.state.aiResponse !== null"
    >{{ $store.getters.aiResponse }}
  </span>
  <TextboxComponent />
  <audio
    id="test"
    v-if="$store.state.aiResponseAudio !== null"
    :src="$store.getters.aiResponseAudio"
    autoplay
  ></audio>
</template>

<script>
import TextboxComponent from "./components/Textbox.vue";

export default {
  name: "App",
  components: {
    TextboxComponent,
  },
};
</script>

<style>
#app {
  background-image: url("assets/bg.png");
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

#aiResponse {
  position: absolute;
  top: 40%;
  left: 71%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  z-index: 1;
  width: 250px;
  height: auto;
  border: 2px solid white;
  border-radius: 10px;
  padding: 5px;
}
</style>

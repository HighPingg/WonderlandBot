<template>
  <p style="color: white">{{ $store.getters.aiResponse }}</p>
  <TextboxComponent />
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
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

#app {
  background-image: url("assets/bg.png");
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
</style>

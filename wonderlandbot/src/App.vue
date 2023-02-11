<template>
  <div>
    <BGComponent />
    <TextboxComponent />
  </div>
</template>

<script>
import BGComponent from "./components/BG.vue";
import TextboxComponent from "./components/Textbox.vue";

export default {
  name: "App",
  components: {
    BGComponent,
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
</style>

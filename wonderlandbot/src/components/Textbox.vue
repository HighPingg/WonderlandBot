<template>
  <div class="textbox-container">
    <textarea
      rows="4"
      cols="50"
      placeholder="Enter text here"
      v-model="text"
      @keydown.enter="sendRequest"
    ></textarea>
  </div>
</template>

<script>
import store from '@/store/store';

export default {
  name: "TextboxComponent",
  data() {
    return {
      text: "",
    };
  },
  methods: {
    sendRequest() { store.dispatch('sendRequest', this.text) }
  },
};
</script>

<style>
textarea {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  resize: none;
  border: 0px;
  background-color: transparent;
  color: #fdfdfd;
}

/* Remove border on focus */
textarea:focus {
  outline: none;
}
</style>

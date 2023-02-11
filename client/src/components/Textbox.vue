<template>
  <textarea
    rows="4"
    cols="50"
    placeholder="Enter text here"
    v-model="text"
    @keydown.enter="sendRequest"
    @keydown.enter.prevent="postReply"
  >
  </textarea>
</template>

<script>
import store from "@/store/store";

export default {
  name: "TextboxComponent",
  data() {
    return {
      text: "",
    };
  },
  methods: {
    sendRequest() {
      // We can use the store to send the request
      store.dispatch("sendRequest", this.text);
      // Clear the text
      this.text = "";
    },
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

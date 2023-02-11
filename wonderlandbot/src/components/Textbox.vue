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
export default {
  name: "TextboxComponent",
  data() {
    return {
      text: "",
    };
  },
  methods: {
    sendRequest() {
      // Send request to the backend with the contents of the textarea
      fetch("http://127.0.0.1:4000/api", {
        method: "POST",
        body: JSON.stringify({
          string: this.text,
          char: 'Hatter'
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
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

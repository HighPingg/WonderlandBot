import { createStore } from 'vuex'

export default createStore({
    state: {
        persona: "Mad Hatter",
        userMessages: []
    },
    mutations: {
        UPDATE_PERSONA(state, payload) {
            state.persona = payload;
        }
    },
    actions: {
        setPersona(context, payload) {
            context.commit('UPDATE_PERSONA', payload);
        },

        sendRequest(context, payload) {
            // Send request to the backend with the contents of the textarea
            fetch("/backend/endpoint", {
              method: "POST",
              body: JSON.stringify({
                text: payload,
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
        }
    },
    getters: {
        persona: function (state) {
            return `${state.persona}`
        }
    }
})
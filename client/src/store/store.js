import { createStore } from 'vuex'

export default createStore({
    state: {
        persona: "Mad Hatter",
        userMessages: [],
        aiMessages: []
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
            fetch("http://127.0.0.1:4000/api", {
                method: "POST",
                body: JSON.stringify({
                    string: payload,
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
        }
    },
    getters: {
        persona: function (state) {
            return `${state.persona}`
        }
    }
})
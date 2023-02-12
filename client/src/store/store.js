import { createStore } from 'vuex'

export default createStore({
    state: {
        persona: "Mad Hatter",
        aiResponse: null,
        aiResponseAudio: null,
        errorMessage: null
    },
    mutations: {
        UPDATE_PERSONA(state, payload) {
            state.persona = payload;
        },
        UPDATE_AI_RESPONSE(state, payload) {
            state.aiResponse = payload.text;
            state.aiResponseAudio = payload.audio;
        },
        UPDATE_ERROR_MESSAGE(state, payload){
            state.errorMessage = payload.message;
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
                    if (data.audio.status == "success") {
                        context.commit('UPDATE_AI_RESPONSE', { text: data.ai, audio: "data:audio/wav;base64," + data.audio.result.audio_base64 });
                        console.log(context.store.state.aiResponseAudio);
                    } else {
                        context.commit('UPDATE_AI_RESPONSE', { text: data.ai, audio: null });
                    }
                })
                .catch((error) => {
                    console.log(";osdhpfobspofbaqoe");
                    context.commit('UPDATE_ERROR_MESSAGE', {
                        message: error
                    })
                });
        },
        closeModal(context){
            context.commit('UPDATE_ERROR_MESSAGE', {
                message: null
            })
        }
    },
    getters: {
        persona: function (state) {
            return `${state.persona}`
        },
        aiResponse: function (state) {
            return `${state.aiResponse}`
        },
        aiResponseAudio: function (state) {
            return `${state.aiResponseAudio}`
        },
        message: function(state){
            return `${state.errorMessage}`;
        }
    }
})
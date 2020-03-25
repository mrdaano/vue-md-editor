import editor from './editor.vue';

export default {
    install(vue, options) {
        vue.component('md-editor', editor)
    }
}
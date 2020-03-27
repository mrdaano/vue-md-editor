<template>
    <div class="md-editor-container">
        <div class="md-editor-toolbar mb-2">
            <div v-for="bar in toolbar" v-if="bar.items.length > 0" class="btn-group mr-1" role="group" :aria-label="bar.label">
                <button v-for="item in bar.items" class="btn btn-primary" @click.prevent="insert(item.key)" :disabled="showPreview && item.disabledOnPreview"><i :class="item.icon"></i></button>
            </div>
        </div>
        <div
                contenteditable="true"
                ref="editor"
                @input="updateContent"
                style="height: 200px; overflow: auto;"
                :class="{'md-editor-hide': showPreview}"
                class="md-editor-editor form-control">
        </div>
        <div v-if="showPreview" v-html="preview" style="height: 200px;" class="md-editor-preview"></div>
    </div>
</template>
<script>
    import { isUrl, moveCursorToPoint, isInContainer } from "./helpers/helpers";
    import toolbar from "./helpers/toolbar";
    import marked from 'marked';

    export default {
        name: 'md-editor',
        props: {
            value: {
                type: String,
                default: ''
            },
            custombuttons: {
                type: Array,
                default: () => []
            }
        },
        data() {
          return {
              showPreview: false,
              toolbar: []
          }
        },
        mounted() {
            this._buildToolbar();
            this.$refs.editor.innerText = this.value;
        },
        computed: {
            preview() {
                return marked(this.value);
            }
        },
        methods: {
            updateContent(event) {
                this.$emit('input', event.target.innerText);
            },
            insert(key) {
                this.$emit(`insert:${key}`, {
                    insertBlock: this.insertBlock,
                    insertImage: this.insertImage,
                    insertLink: this.insertLink
                });

                switch (key) {
                    case 'bold':
                        this.insertBlock('**');
                    break;
                    case 'italic':
                        this.insertBlock('*');
                    break;
                    case 'strikethrough':
                        this.insertBlock('~~');
                    break;
                    case 'quote':
                        this._insertQuote();
                    break;
                    case 'code':
                        this._insertCode();
                    break;
                    case 'link':
                        this.insertLink();
                    break;
                    case 'image':
                        this.insertImage();
                    break;
                    case 'preview':
                        this.showPreview = !this.showPreview;
                    break;
                }

                this.$emit('input', this.$refs.editor.innerText);
            },
            insertLink(title = 'Tile here', link = 'https://example.com') {
                if (!isUrl(link)) return;

                this.$refs.editor.innerText = this.value + `[${title}](${link})`;
            },
            insertImage(altText = 'Alt text here', src = 'https://example.com/image.jpg') {
                if (!isUrl(src)) return;

                this.$refs.editor.innerText = this.value + `![${altText}](${src})`;
            },
            insertBlock(start, end) {
                if (!end) {
                    end = start;
                }

                const selection = window.getSelection();
                const inContainer = isInContainer(selection.baseNode, this.$refs.editor);

                const innerText = inContainer ? selection.toString() : '';
                const node =  document.createTextNode(`${start}${innerText}${end}`);

                if (inContainer) {
                    const range = selection.getRangeAt(0);
                    range.deleteContents();
                    range.insertNode(node);
                } else {
                    this.$refs.editor.append(node);
                }

                const newCursorPosition = node.textContent.length - end.length;
                this._moverCursor(node, newCursorPosition);
            },
            _insertCode() {
                if (this.value.trim() !== '') {
                    this.$refs.editor.append(document.createElement('br'));
                }

                this.$refs.editor.append(document.createTextNode('```'));

                const node = document.createElement('div');
                node.innerHTML = '&nbsp;';
                this.$refs.editor.append(node);

                this.$refs.editor.append(document.createTextNode('```'));

                this._moverCursor(node, 1);
            },
            _insertQuote() {
                if (this.value.trim() !== '') {
                    this.$refs.editor.append(document.createElement('br'));
                }

                const node = document.createTextNode('>');
                this.$refs.editor.append(node);
                this._moverCursor(node , 1);
            },
            _moverCursor(node, position) {
                moveCursorToPoint(node, position);
                this.$refs.editor.focus();
            },
            _buildToolbar() {
                const editorToolbar = toolbar.groups;
                const buttons = toolbar.buttons.concat(this.custombuttons);

                buttons.forEach(item => {
                    item.group = item.group || 'custom';
                    const group = editorToolbar.find(g => g.key === item.group);

                    if (group) {
                       group.items.push(item);
                    }
                });

                this.toolbar = editorToolbar;
            }
        }
    }
</script>
<style>
    .md-editor-hide {
        display: none;
    }
</style>
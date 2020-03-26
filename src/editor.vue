<template>
    <div class="md-editor-container">
        <div class="md-editor-toolbar mb-2">
            <div v-for="bar in toolbar" class="btn-group mr-1" role="group" :aria-label="bar.label">
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
    import { isUrl, moveCursorToPoint, isInContainer } from "./helpers";
    import marked from 'marked';

    export default {
        name: 'md-editor',
        props: {
            value: {
                type: String,
                default: ''
            }
        },
        data() {
          return {
              showPreview: false,
              toolbar: [
                  {
                      label: 'Basic markup',
                      items: [
                          {
                              label: 'Bold',
                              icon: 'fas fa-bold',
                              key: 'bold',
                              disabledOnPreview: true
                          },
                          {
                              label: 'Italic',
                              icon: 'fas fa-italic',
                              key: 'italic',
                              disabledOnPreview: true
                          },
                          {
                              label: 'Strikethrough',
                              icon: 'fas fa-strikethrough',
                              key: 'strikethrough',
                              disabledOnPreview: true
                          }
                      ]
                  },
                  {
                      label: 'Advanced markup',
                      items: [
                          {
                              label: 'Link',
                              icon: 'fas fa-link',
                              key: 'link',
                              disabledOnPreview: true
                          },
                          {
                              label: 'Image',
                              icon: 'fas fa-image',
                              key: 'image',
                              disabledOnPreview: true
                          },
                          {
                              label: 'Quote',
                              icon: 'fas fa-quote-right',
                              key: 'quote',
                              disabledOnPreview: true
                          },
                          {
                              label: 'Code block',
                              icon: 'fas fa-code',
                              key: 'code',
                              disabledOnPreview: true
                          }
                      ]
                  },
                  {
                      label: 'Other',
                      items: [
                          {
                              label: 'Preview',
                              icon: 'fas fa-eye',
                              key: 'preview'
                          }
                      ]
                  }
              ]
          }
        },
        mounted() {
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
            }
        }
    }
</script>
<style>
    .md-editor-hide {
        display: none;
    }
</style>
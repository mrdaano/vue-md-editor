# Vue markdown editor
This is a basic markdown editor made for Vue, based on Bootstrap and Font Awesome.

## Example
You can find a example on [Codesandbox](https://codesandbox.io/s/github/mrdaano/vue-md-editor-example) or on [GitHub](https://github.com/mrdaano/vue-md-editor-example)

## Pre requirements
- Install [Font Awesome](https://fontawesome.com/) for the toolbar icons.
- If you want you can install [Bootstrap](https://getbootstrap.com/) or do the styling by yourself.

## Installation
First install this package via npm or yarn:
```
npm i vue-md-editor or yarn install vue-md-editor
```
And then simply add in your Vue setup script:
```javascript
import mdEditor from 'vue-md-editor';
import Vue from 'vue';

Vue.use(mdEditor);
```
## Usage and examples
Now you can use the markdown editor in your Vue container or components. You can use it with or without ``v-model``.
### Basic usage
```html
<template>
    <div class="container">
        <md-editor v-model="value"></md-editor>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: '#Hello world!'
            }
        }
    }
</script>
```
### Custom toolbar button(s)
There is also the option to add your own toolbar buttons via the prop ``custombuttons`` as an array of button objects. Each button has the following properties:

| Property | Default | Description|
|----------|---------|------------|
|``label`` | null    | The name of the button|
|``key``   | null    | This is used in the event |
|``icon``  | null    | Which Font Awesome icon |
|``group`` | custom  | In which group should the button be (basic, advanced, custom or other ) |

When the button is clicked, an event is fired prefixed with ``insert:`` and after that the key. At this moment you can use 3 functions in your event callback. You can find an example here below.

| Function | Params |
|----------|--------|
| ``insertBlock`` | start, end (default: start) |
| ``insertImage`` | altText, src |
| ``insertLink`` | title, link |

```html
<template>
    <div class="container">
        <md-editor ref="editor" v-model="value" :custombuttons="buttons"></md-editor>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: '#Hello world!',
                buttons: [
                        {
                            label: 'Insert a cat',
                            key: 'cat',
                            icon: 'fas fa-cat',
                            group: 'advanced'
                        }
                    ]
                }
            },
            mounted() {
              this.$refs.editor.$on('insert:cat', (editor) => {
                  editor.insertImage('Cat image', 'http://placekitten.com/100/100');
              });
            },
    }
</script>
```
### Styling
The styling of this plugin is based on Bootstrap and the icons are from Font Awesome. But this plugin also uses custom classes so you can easily change the styling.
All custom classes are prefixed with ``.md-editor-*``. Below you will find an overview of all classes.

| Class                  | Description                                                                       |
|------------------------|-----------------------------------------------------------------------------------|
|``.md-editor-container``| The container surrounding the whole editor.                                       |
|``.md-editor-toolbar``  | Toolbar containing all buttons.                                                   |
|``.md-editor-editor``   | The editor area itself.                                                           |
|``.md-editor-preview``  | When you click on preview button this area shows up containing a rendered preview.|

## Requested features
The requested features below will be implemented soon.
- Rearrange toolbar
- Support for keyboard shortcuts
- Inline syntax highlighting
- Side by side (editor and preview)
- Autosave feature

Do you have a feature request? Let us know via an [issue](https://github.com/mrdaano/vue-md-editor/issues)
# Vue markdown editor
This is a basic markdown editor made for Vue, based on Bootstrap and Font Awesome.

**This package is under development right now. If you see any bugs pleas report them**

## Pre requirements
- Install [Font Awesome](https://fontawesome.com/) for the toolbar icons.
- If you want you can install [Bootstrap](https://getbootstrap.com/) or do the styling custom.

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
Now you can use the markdown editor in your Vue components. You can use it with or without ``v-model``.
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
                value: '#Hello world!';
            }
        }
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
|``.md-editor-editor``   | The editor itself (typ area).                                                     |
|``.md-editor-preview``  | When you click on preview button this area shows up containing a rendered preview.|
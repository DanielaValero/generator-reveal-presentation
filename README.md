# Reveal presentation generator

This generator creates a new presentation folder, containing index page, master page, slides and a config file, to specify
reveal.js specific configuration options.

It is designed to be used with assemble.io. When used in conjunciton to the npm module: [assemble-reveal-builder](https://www.npmjs.com/package/assemble-reveal-builder), assemble will use the contents of this folder, will create a new index page with the presentation, reveal config and the slides content won't be rendered as pages, but will be embeded in the index page.


# Installing and usage

1. Install yeoman
```bash
npm install -g yo
```

2. Install the generator
```
npm install -g generator-presentation
```

3. Then use the geneator, please note that it receives a parameter, in which you should set the code name of the presentation. This will be used to create a folder inside your presentations folder, and inside it, all the required files to start writing your presentation will be added.

```bash
yo presentation nameOfPresentation
```

## Output
The output of this generator will be:

```
|- presentations
|--- nameOfPresentation
|------ slides
|-------- slide.md
|------ config.yml
|------ index.hbs
```

# Example grunt config with assemble.io

This folder should be added in your assemble.io config, as pages to be built. For example:

```js
 slides: {
        options: {
            layout: 'tpl-presentation.hbs',
            presentationPage: true
        },
        files: [{
            cwd: 'presentations/',
            dest: 'dist/presentations/',
            expand: true,
            filter: 'isFile',
            extDot: ['md', 'hbs'],
            src: ['**/index.hbs', '**/master.hbs']
        }]
    }
  ```

The master.hbs will be a copy of the index.hbs, but when you configure sockets, this will be the html the presenter will use, and the atendees, will use index.hbs, so, each time the presenter switches a slide, the atendees will have they current slide updated.

If you decide to use sockets, the socket id and socket key, will be generated and added to the master page by the generator.


#Roadmap

* Add slide subgenerator
* Support other presentation frameworks
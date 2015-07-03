# Generator-Presentation

With this generator a new reveal.js presentation folder is created, with a config.yml file, and a slides folder. 

It is meant to support the [npm module assemble-reveal-builder](https://www.npmjs.com/package/assemble-reveal-builder), so when creating a reveal.js presentation with assemble, the setting up process is easer and quicker.

To install this module do:

Install yeoman
```bash
npm install -g yo
```

Install the generator
```
npm install -g generator-presentation
```

Then use the geneator, please note that it receives a parameter, in which you should set the code name of the presentation. This will be used to create a folder inside your presentations folder, and inside it, all the required files to start writing your presentation will be added.

```bash
yo presentation nameOfPresentation
```

#Output
The output of this generator will be:

```
|- presentations
|--- nameOfPresentation
|------ slides
|-------- slide.md
|------ config.yml
|------ index.hbs
```


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







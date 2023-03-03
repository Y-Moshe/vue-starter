# Added Package list

- axios
- bootstrap(just the grid system) in main.scss add `@import 'bootstrap/scss/bootstrap-grid.scss';`
- sass
- vue-router

## vite.config.ts alias

```
    alias: {
        '@': fileURLToPath(new URL('./src/app', import.meta.url))
    }
```

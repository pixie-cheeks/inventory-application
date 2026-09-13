# Inventory Application

[Live link ✨](https://inventory-application-revt.onrender.com/)

This is a pok&eacute;mon inventory management app. It can manage pok&eacute;mon, their types and trainers. Created as part of The Odin Project NodeJS course.

## Technologies Used

- [Express](https://expressjs.com/) - As the web framework
- [EJS](https://ejs.co/) - The templating engine used to render views
- [TypeScript](https://www.typescriptlang.org/) - For increased type-safety
- [PostCSS](https://postcss.org/) - Helpful for writing modern, readable and maintainable CSS
- [PostgreSQL](https://www.postgresql.org/) - The relational database used in this project

## Contributing

Please feel free to submit an issue or pull request. To develop, you'll need Node.js.

### Installation and Developer Usage

In this project, I'm using pnpm, but the commands shown here should also work with other node package managers with some minor syntactical changes.

First clone the repo. After that, install the dependencies with your preferred package manager like so:

```shell
pnpm install
```

You will need to watch the styles separately when you run the dev environment. The process will be like the following commands in two separate sessions (or maybe even one if you feel like it):

```shell
pnpm dev
pnpm watch:css
```

### Building

To build the app, run the following command:

```shell
pnpm build
```

### Deployment

For this project, I have used [Aiven](https://aiven.io/) as the cloud database and [Render](https://render.com/) for the app itself.

Make sure to add the Aiven secrets in the `.env` file before deploying them on render. The secrets which are needed are covered in the `.env.example` file.

## Acknowledgements

1. [Pokemon icons](https://www.flaticon.com/free-icon/pokeball_361998) created by Nikita Golubev - Flaticon
2. [Pokemon Vectors](https://www.vecteezy.com/free-vector/pokemon) by Vecteezy
3. Trainer category image taken from [a post by u/Old-Biscotti647.](https://reddit.com/r/pokemon/comments/14f9nwb/im_making_a_collection_of_pokemon_trainer_icons/?__cf_chl_tk=6ju0CzVWEn9ZN1g2ZEUyf0EvRXJlNMyR_9W6Wgnh2Ck-1788887717-1.0.1.1-fqUHE2o.1s8cQIhEXbj5zhjmGiNRH69bfo5iUd74KeY)
4. [Lineal icon PNG](https://pngtree.com/freepng/pokemon-icon-in-a-circle-vector_21344522.html) Designed By tree
5. [The Odin Project](https://www.theodinproject.com/)

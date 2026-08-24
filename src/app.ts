import express, {
  static as expressStatic,
  urlencoded as expressUrlencoded,
} from 'express';
import path from 'node:path';
import expressLayouts from 'express-ejs-layouts';
import { createTypesRouter } from './routers/typesRouter.js';
import { createIndexRouter } from './routers/indexRouter.js';
import { errorHandler } from './errors.js';
import { createPokemonRouter } from './routers/pokemonRouter.js';
import { createTrainerRouter } from './routers/trainerRouter.js';

const PORT = process.env.PORT ?? 3_000;
const { dirname } = import.meta;
const app = express();

app.set('views', path.join(dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressStatic(path.join(dirname, 'public')));
app.use(expressUrlencoded({ extended: true }));

app.set('layout extractScripts', true);
app.set('layout extractStyles', true);
app.use(expressLayouts);

app.use('/pokemon', createPokemonRouter());
app.use('/types', createTypesRouter());
app.use('/trainers', createTrainerRouter());
app.use('/', createIndexRouter());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Express app listening on port ${PORT}! http://localhost:${PORT}`,
  );
});

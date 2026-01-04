import express, {
  static as expressStatic,
  urlencoded as expressUrlencoded,
} from 'express';
import path from 'node:path';
import { typesRouter } from './routers/typesRouter.js';
import { indexRouter } from './routers/indexRouter.js';
import { errorHandler } from './errors.js';
import { pokemonRouter } from './routers/pokemonRouter.js';
import { trainersRouter } from './routers/trainerRouter.js';

const PORT = process.env.PORT ?? 3_000;
const { dirname } = import.meta;
const app = express();

app.set('views', path.join(dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressStatic(path.join(dirname, 'public')));
app.use(expressUrlencoded({ extended: true }));

app.use('/pokemon', pokemonRouter);
app.use('/types', typesRouter);
app.use('/trainers', trainersRouter);
app.use('/', indexRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});

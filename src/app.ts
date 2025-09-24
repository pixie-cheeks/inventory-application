import express, {
  static as expressStatic,
  urlencoded as expressUrlencoded,
} from 'express';
import path from 'node:path';
import { userRouter } from './routers/userRouter.js';
import { indexRouter } from './routers/indexRouter.js';
import { errorHandler } from './errors.js';

const PORT = process.env.PORT ?? 3_000;
const { dirname } = import.meta;
const app = express();

app.set('views', path.join(dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressStatic(path.join(dirname, 'public')));
app.use(expressUrlencoded({ extended: true }));

app.use('/new', userRouter);
app.use('/', indexRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});

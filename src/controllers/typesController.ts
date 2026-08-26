import { body, matchedData, validationResult } from 'express-validator';
import type { RequestHandler } from 'express';
import { type PokemonType, typesTable } from '../models/typesModel.js';
import { pokemonsTable } from '../models/pokemonsModel.js';
import { CustomNotFoundError } from '../errors.js';

const getTypesPage: RequestHandler = async (_request, response) => {
  const allTypes = await typesTable.getAllRows();
  response.render('main', {
    title: 'Types',
    componentName: 'type/all',
    allTypes,
  });
};

const getParticularTypePage: RequestHandler<{ typeName: string }> = async (
  request,
  response,
  next,
) => {
  const givenTypeName = request.params.typeName;
  const typeNameInTable = await typesTable.getRowByTypeName(givenTypeName);
  if (!typeNameInTable) {
    next(new CustomNotFoundError("Type with this name doesn't exist"));
    return;
  }

  const allPokemonOfType = await pokemonsTable.getRowsByTypeName(givenTypeName);

  response.render('main', {
    title: `${givenTypeName} type`,
    componentName: 'type/one',
    typeName: givenTypeName,
    allPokemonOfType,
  });
};

const typeCreationSchema = [
  body('type_name')
    .trim()
    .notEmpty()
    .withMessage("Name can't be empty.")
    .custom(
      async (
        type_name: string,
        { req }: { req: { body?: Record<string, string> } },
      ) => {
        const pokemon = await pokemonsTable.getPokemonByName(type_name);
        if (pokemon?.id === Number(req.body?.id)) return;
        if (pokemon)
          throw new Error('A pokemon already exists with this name.');
      },
    ),
  body('image_src')
    .optional({ values: 'falsy' })
    .trim()
    .isURL()
    .withMessage('Type Image URL must be, well, a URL.'),
];

const getNewTypePage: RequestHandler = (_request, response) => {
  response.render('main', {
    title: 'Add Type',
    componentName: 'type/new',
  });
};

const addNewType: RequestHandler = async (request, response) => {
  const errors = validationResult(request);
  const givenData = request.body as Record<string, string>;

  if (!errors.isEmpty()) {
    response.render('main', {
      title: 'Add Type',
      componentName: 'type/new',
      errors: errors.array(),
      givenData,
    });
  }
  const typeData = matchedData<PokemonType>(request);

  await typesTable.insertRow(typeData);

  response.redirect('/types');
};

const typeCreation = [typeCreationSchema, addNewType];

export { getTypesPage, getParticularTypePage, getNewTypePage, typeCreation };

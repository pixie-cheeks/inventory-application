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
    .custom(async (type_name: string, { req }) => {
      const typeData = await typesTable.getRowByTypeName(type_name);
      if (typeData?.type_name === req.params?.typeName) return;
      if (typeData) throw new Error('A type already exists with this name.');
    }),
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

const getEditTypePage: RequestHandler = async (request, response) => {
  const { typeName } = request.params;
  if (Array.isArray(typeName))
    throw new CustomNotFoundError('Invalid type name.');

  const typeData = await typesTable.getRowByTypeName(typeName);
  if (!typeData) throw new CustomNotFoundError('No type with this name found.');

  response.render('main', {
    typeData,
    title: 'Edit Type',
    componentName: 'type/edit',
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
    return;
  }
  const typeData = matchedData<PokemonType>(request);

  await typesTable.insertRow(typeData);

  response.redirect('/types');
};

const editType: RequestHandler = async (request, response) => {
  const { typeName } = request.params;
  if (Array.isArray(typeName))
    throw new CustomNotFoundError('Invalid type name.');

  const typeData = await typesTable.getRowByTypeName(typeName);
  if (!typeData) throw new CustomNotFoundError('No type with this name found.');

  const errors = validationResult(request);
  const givenData = request.body as Record<string, string>;

  if (!errors.isEmpty()) {
    response.render('main', {
      typeData,
      title: 'Edit Type',
      componentName: 'type/edit',
      errors: errors.array(),
      givenData,
    });
    return;
  }
  const newTypeData = matchedData<Omit<PokemonType, 'id'>>(request);

  await typesTable.editRowById(typeData.id, newTypeData);

  response.redirect(`/types/${newTypeData.type_name}`);
};

const typeCreation = [typeCreationSchema, addNewType];
const typeUpdate = [typeCreationSchema, editType];

export {
  getTypesPage,
  getParticularTypePage,
  getNewTypePage,
  typeCreation,
  getEditTypePage,
  typeUpdate,
};

import type { RequestHandler } from 'express';
import { typesTable } from '../models/typesModel.js';
import { pokemonsTable } from '../models/pokemonsModel.js';
import { CustomNotFoundError } from '../errors.js';

const getTypesPage: RequestHandler = async (_request, response) => {
  const allTypes = await typesTable.getAllRows();
  response.render('main', {
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
    componentName: 'type/one',
    typeName: givenTypeName,
    allPokemonOfType,
  });
};

export { getTypesPage, getParticularTypePage };

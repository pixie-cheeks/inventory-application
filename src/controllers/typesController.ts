import expressAsyncHandler from 'express-async-handler';
import { getAllTypesDB, getAllPokemonDB } from '../db/query.js';
import { CustomNotFoundError } from '../errors.js';

const getTypesPage = expressAsyncHandler(async (_request, response) => {
  const allTypes = await getAllTypesDB();
  response.render('main', {
    componentName: 'types',
    allTypes,
  });
});

const getParticularTypePage = expressAsyncHandler(
  async (request, response, next) => {
    const [allTypes, allPokemon] = await Promise.all([
      getAllTypesDB(),
      getAllPokemonDB(),
    ]);

    const givenTypeName = request.params.typeName;
    if (allTypes.every((type) => type.type_name !== givenTypeName)) {
      next(new CustomNotFoundError("Type with this name doesn't exist"));
      return;
    }
    const allPokemonOfType = allPokemon.filter(
      ({ type_one, type_two }) =>
        type_one === givenTypeName || type_two === givenTypeName,
    );

    response.render('main', {
      componentName: 'particularType',
      allPokemonOfType,
    });
  },
);

export { getTypesPage, getParticularTypePage };

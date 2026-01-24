import expressAsyncHandler from 'express-async-handler';
import { getAllTypesDB, getAllPokemonDB } from '../db/query.js';
import { CustomNotFoundError } from '../errors.js';

const getTypesPage = expressAsyncHandler(async (_req, res) => {
  const allTypes = await getAllTypesDB();
  res.render('main', {
    componentName: 'types',
    allTypes,
  });
});

const getParticularTypePage = expressAsyncHandler(async (req, res, next) => {
  const [allTypes, allPokemon] = await Promise.all([
    getAllTypesDB(),
    getAllPokemonDB(),
  ]);

  const givenTypeName = req.params.typeName;
  if (!allTypes.some((type) => type.type_name === givenTypeName)) {
    next(new CustomNotFoundError("Type with this name doesn't exist"));
    return;
  }
  const allPokemonOfType = allPokemon.filter(
    ({ type_one, type_two }) =>
      type_one === givenTypeName || type_two === givenTypeName,
  );

  res.render('main', {
    componentName: 'particularType',
    allPokemonOfType,
  });
});

export { getTypesPage, getParticularTypePage };

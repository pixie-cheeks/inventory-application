import expressAsyncHandler from 'express-async-handler';
import {
  getAllTrainersDB,
  // getAllPokemonDB
} from '../db/query.js';

const getAllTrainers = expressAsyncHandler(async (_req, res) => {
  const allTrainers = await getAllTrainersDB();
  res.render('main', {
    allTrainers,
    componentName: 'trainers',
  });
});

const getTrainerPage = expressAsyncHandler((_req, res) => {
  // const givenTypeName = req.params.typeName;
  /* const [allTrainers, allPokemon] = await Promise.all([
    getAllTrainersDB(),
    getAllPokemonDB(),
  ]); */

  res.render('main', {
    componentName: 'trainerPage',
  });
});

export { getAllTrainers, getTrainerPage };

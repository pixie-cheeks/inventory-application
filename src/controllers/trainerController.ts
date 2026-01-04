import expressAsyncHandler from 'express-async-handler';
import { getAllTrainersDB } from '../db/query.js';

const getAllTrainers = expressAsyncHandler(async (_req, res) => {
  const allTrainers = await getAllTrainersDB();
  res.render('trainers', {
    allTrainers,
  });
});

export { getAllTrainers };

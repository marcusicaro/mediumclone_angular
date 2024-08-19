import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { createAction, props } from '@ngrx/store';

export const homeScore = createAction('[Scoreboard Page] Home Score');
export const awayScore = createAction('[Scoreboard Page] Away Score');
export const resetScore = createAction('[Scoreboard Page] Score Reset');
export const setScores = createAction('[Scoreboard Page] Set Scores', props<{game: any}>());

export const register = createAction('[Auth] Register', props<{request: RegisterRequestInterface}>())
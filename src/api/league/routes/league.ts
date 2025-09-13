/**
 * league router
 */

import { factories } from '@strapi/strapi';

export default {
  routes: [
    // Standard CRUD routes
    {
      method: 'GET',
      path: '/leagues',
      handler: 'league.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/leagues/:id',
      handler: 'league.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/leagues',
      handler: 'league.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/leagues/:id',
      handler: 'league.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/leagues/:id',
      handler: 'league.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // 1. Get standings of all teams in a league
    {
      method: 'GET',
      path: '/leagues/:id/standings',
      handler: 'league.getStandings',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // 2. Update standings of a team in a league
    {
      method: 'PUT',
      path: '/leagues/:leagueId/teams/:teamId/standing',
      handler: 'league.updateTeamStanding',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // 3. Add team to league
    {
      method: 'POST',
      path: '/leagues/:id/teams',
      handler: 'league.addTeam',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // 3. Remove team from league
    {
      method: 'DELETE',
      path: '/leagues/:leagueId/teams/:teamId',
      handler: 'league.removeTeam',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // 4. Get winner of a league
    {
      method: 'GET',
      path: '/leagues/:id/winner',
      handler: 'league.getWinner',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // 5. Get next matches of a league
    {
      method: 'GET',
      path: '/leagues/:id/matches/next',
      handler: 'league.getNextMatches',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // 5. Get current matches of a league
    {
      method: 'GET',
      path: '/leagues/:id/matches/current',
      handler: 'league.getCurrentMatches',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // 5. Get past matches of a league
    {
      method: 'GET',
      path: '/leagues/:id/matches/past',
      handler: 'league.getPastMatches',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};

/**
 * league controller - Simplified for easy queries
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::league.league', ({ strapi }) => ({
  // 1. Get standings of all teams in a league (SIMPLE!)
  async getStandings(ctx) {
    const { id } = ctx.params;

    try {
      const standings = await strapi.db.query('api::league-team.league-team').findMany({
        where: { league: id },
        populate: { team: true },
        orderBy: [{ position: 'asc' }]
      });

      return { data: standings };
    } catch (error) {
      return ctx.badRequest('Error fetching standings', { error: error.message });
    }
  },

  // 2. Update standings of a team in a league (SIMPLE!)
  async updateTeamStanding(ctx) {
    const { leagueId, teamId } = ctx.params;
    const standingData = ctx.request.body;

    try {
      const leagueTeam = await strapi.db.query('api::league-team.league-team').findOne({
        where: { league: leagueId, team: teamId }
      });

      if (!leagueTeam) {
        return ctx.notFound('Team not found in this league');
      }

      const updated = await strapi.entityService.update('api::league-team.league-team', leagueTeam.id, {
        data: {
          ...standingData,
          lastUpdated: new Date()
        }
      });

      return { data: updated };
    } catch (error) {
      return ctx.badRequest('Error updating standing', { error: error.message });
    }
  },

  // 3. Add team to league (SIMPLE!)
  async addTeam(ctx) {
    const { id } = ctx.params;
    const { teamId } = ctx.request.body;

    try {
      const league = await strapi.entityService.findOne('api::league.league', id);
      if (!league) {
        return ctx.notFound('League not found');
      }

      // Get current team count for position
      const teamCount = await strapi.db.query('api::league-team.league-team').count({
        where: { league: id }
      });

      const leagueTeam = await strapi.entityService.create('api::league-team.league-team', {
        data: {
          team: teamId,
          league: id,
          joinedAt: new Date(),
          status: 'active',
          position: teamCount + 1,
          points: 0,
          matchesPlayed: 0,
          wins: 0,
          losses: 0,
          draws: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDifference: 0,
          winPercentage: 0,
          form: '',
          lastUpdated: new Date()
        }
      });

      return { data: leagueTeam, message: 'Team added to league successfully' };
    } catch (error) {
      return ctx.badRequest('Error adding team to league', { error: error.message });
    }
  },

  // 3. Remove team from league (SIMPLE!)
  async removeTeam(ctx) {
    const { leagueId, teamId } = ctx.params;

    try {
      const leagueTeam = await strapi.db.query('api::league-team.league-team').findOne({
        where: { league: leagueId, team: teamId }
      });

      if (!leagueTeam) {
        return ctx.notFound('Team not found in this league');
      }

      await strapi.entityService.delete('api::league-team.league-team', leagueTeam.id);

      return { message: 'Team removed from league successfully' };
    } catch (error) {
      return ctx.badRequest('Error removing team from league', { error: error.message });
    }
  },

  // 4. Get winner of a league (SIMPLE!)
  async getWinner(ctx) {
    const { id } = ctx.params;

    try {
      const winner = await strapi.db.query('api::league-team.league-team').findOne({
        where: { league: id, position: 1 },
        populate: { team: true }
      });

      if (!winner) {
        return ctx.notFound('No winner found for this league');
      }

      return { data: winner };
    } catch (error) {
      return ctx.badRequest('Error fetching winner', { error: error.message });
    }
  },

  // 5. Get next matches of a league (SIMPLE!)
  async getNextMatches(ctx) {
    const { id } = ctx.params;

    try {
      const now = new Date();
      const matches = await strapi.db.query('api::match.match').findMany({
        where: {
          league: id,
          startTime: { $gt: now },
          matchStatus: 'scheduled'
        },
        populate: { team1: true, team2: true },
        orderBy: [{ startTime: 'asc' }]
      });

      return { data: matches };
    } catch (error) {
      return ctx.badRequest('Error fetching next matches', { error: error.message });
    }
  },

  // 5. Get current matches of a league (SIMPLE!)
  async getCurrentMatches(ctx) {
    const { id } = ctx.params;

    try {
      const matches = await strapi.db.query('api::match.match').findMany({
        where: {
          league: id,
          matchStatus: 'live'
        },
        populate: { team1: true, team2: true }
      });

      return { data: matches };
    } catch (error) {
      return ctx.badRequest('Error fetching current matches', { error: error.message });
    }
  },

  // 5. Get past matches of a league (SIMPLE!)
  async getPastMatches(ctx) {
    const { id } = ctx.params;

    try {
      const now = new Date();
      const matches = await strapi.db.query('api::match.match').findMany({
        where: {
          league: id,
          endTime: { $lt: now },
          matchStatus: 'finished'
        },
        populate: { team1: true, team2: true },
        orderBy: [{ endTime: 'desc' }]
      });

      return { data: matches };
    } catch (error) {
      return ctx.badRequest('Error fetching past matches', { error: error.message });
    }
  }
}));

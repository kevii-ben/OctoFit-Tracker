"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const user_1 = require("../models/user");
const database_1 = require("../database");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
// Seed the octofit_db database with test data.
const seedDatabase = async () => {
    await (0, database_1.connectToDatabase)();
    await Promise.all([
        user_1.User.deleteMany({}),
        team_1.Team.deleteMany({}),
        activity_1.Activity.deleteMany({}),
        leaderboard_1.Leaderboard.deleteMany({}),
        workout_1.Workout.deleteMany({}),
    ]);
    const users = await user_1.User.insertMany([
        {
            name: 'Maya Chen',
            email: 'maya.chen@example.com',
            fitnessGoal: 'Improve endurance',
            role: 'captain',
        },
        {
            name: 'Jordan Patel',
            email: 'jordan.patel@example.com',
            fitnessGoal: 'Build strength',
            role: 'member',
        },
        {
            name: 'Sofia Alvarez',
            email: 'sofia.alvarez@example.com',
            fitnessGoal: 'Increase mobility',
            role: 'member',
        },
    ]);
    const teams = await team_1.Team.insertMany([
        {
            name: 'Harbor Runners',
            members: users.slice(0, 2).map((user) => user._id.toString()),
            focus: 'Marathon prep',
            captain: users[0]._id.toString(),
        },
        {
            name: 'Peak Strength Lab',
            members: [users[1]._id.toString(), users[2]._id.toString()],
            focus: 'Strength and conditioning',
            captain: users[1]._id.toString(),
        },
    ]);
    await activity_1.Activity.insertMany([
        {
            userId: users[0]._id.toString(),
            type: 'Run',
            durationMinutes: 35,
            calories: 320,
            distanceKm: 5.2,
        },
        {
            userId: users[1]._id.toString(),
            type: 'Strength',
            durationMinutes: 50,
            calories: 410,
            distanceKm: 0,
        },
        {
            userId: users[2]._id.toString(),
            type: 'Yoga',
            durationMinutes: 30,
            calories: 180,
            distanceKm: 0,
        },
    ]);
    await leaderboard_1.Leaderboard.insertMany([
        { userId: users[0]._id.toString(), points: 980, streak: 7, rank: 1 },
        { userId: users[1]._id.toString(), points: 840, streak: 4, rank: 2 },
        { userId: users[2]._id.toString(), points: 760, streak: 3, rank: 3 },
    ]);
    await workout_1.Workout.insertMany([
        {
            title: 'Tempo Run',
            difficulty: 'Intermediate',
            durationMinutes: 40,
            focus: 'Cardio',
            equipment: ['Running shoes'],
        },
        {
            title: 'Full Body Strength',
            difficulty: 'Advanced',
            durationMinutes: 55,
            focus: 'Strength',
            equipment: ['Dumbbells', 'Bench'],
        },
    ]);
    console.log('Seed the octofit_db database with test data');
    console.log(`Seeded ${users.length} users, ${teams.length} teams, activities, leaderboard entries, and workouts.`);
    await (await Promise.resolve().then(() => __importStar(require('mongoose')))).default.disconnect();
};
exports.seedDatabase = seedDatabase;
(0, exports.seedDatabase)().catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
});

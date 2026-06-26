"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
// Seed the octofit_db database with test data.
const seedDatabase = async () => {
    await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db');
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
    await mongoose_1.default.disconnect();
};
exports.seedDatabase = seedDatabase;
(0, exports.seedDatabase)().catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
});

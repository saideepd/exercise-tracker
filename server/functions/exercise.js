const mongoose = require('mongoose');
const user = require('./user');


const exerciseSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user.UserModel
    }
});


const Exercise = mongoose.model('Exercise', exerciseSchema);

const addExercise = (input, done) => {
    if (input === undefined || input === null) {
        console.log(`Invalid input for Exercise`);
        done(null, {
            error: `Invalid input for Exercise`
        });
        return {
            error: `Invalid input for Exercise`
        };
    }

    console.log(`Input to addExercise: ${JSON.stringify(input)}, id: ${input._id}`);

    // Find the user's username by calling findUserById() from User function
    let findUser = user.findUserById(input._id, (req, res, next) => {
        console.log(`findUser in Exercise: ${res}`);

        // Form an exercise object to pss to create()
        // Only using username from FindUserById response
        // rest all the data is used from user input
        let exerciseObject = Exercise({
            userId: input._id,
            username: res.username,
            date: input.date,
            duration: input.duration,
            description: input.description
        });

        console.log(`ExerciseObject: ${exerciseObject}`);

        // Create the exercise record in DB
        Exercise.create(exerciseObject, (createExerciseError, createdExercise) => {
            // In case of Error, return error message
            if (createExerciseError) {
                console.log(`Error creating exercise record: ${createExerciseError}`);
                done(null, {
                    error: "Error adding exercise"
                });
                return {
                    error: "Error adding exercise"
                };
            }
            // Else return response
            console.log(`Exercise logged successfully: ${createdExercise}`);
            done(null, createdExercise);
            return createdExercise;
        });
    });
}

const getExerciseLog = (input, done) => {
    let logInput = JSON.stringify(input);
    console.log(`Exercise Log Input: ${logInput}`);

    // Setting fromDate = 0 which takes default date as 1970-01-01
    // And toDate = 10000000000000 which takes default date as 2286-11-20 if no input provided 
    let { userId, from: fromDate = 0, to: toDate = 10000000000000, limit } = JSON.parse(logInput);
    console.log(`Exercise Log Input Values: ${userId}, ${fromDate}, ${toDate}, ${limit}`);

    // Find Exercise logs for user by querying using UserId
    Exercise.find({
        userId: { $eq: userId }
    }, (logFindError, logFound) => {
        if (logFindError) {
            console.log(`Error finding exercise logs for user: ${logFindError}`);
            done(null, {
                error: "Error finding exercise logs for user"
            });
            return {
                error: "Error finding exercise logs for user"
            };
        }

        console.log(`Successfully found exercise logs for user: ${logFound}`);

        // Default values if undefined, blank or no input provided
        fromDate = fromDate === undefined || "" || " " ? 0 : fromDate;
        toDate = toDate === undefined || "" || " " ? 10000000000000 : toDate;
        limit = limit === undefined ? logFound.length : limit;

        // Filter the logs between fromDate & toDate
        // Then sort the logs by ascending order of log date
        // Finally just pick & push the required properties to log[]
        let log = [];
        logFound
            .sort((firstDate, secondDate) => firstDate.date - secondDate.date)
            .filter(exerciseLog => exerciseLog.date >= new Date(fromDate))
            .filter(exerciseLog => exerciseLog.date <= new Date(toDate))
            .slice(0, limit)
            .map((item) => {
                log.push({
                    description: item.description,
                    duration: item.duration,
                    date: item.date.toDateString()
                });
            });

        // console.log(`ResponseLog: ${JSON.stringify(log)}`);

        let logResponseObject = {
            _id: logFound[0].userId,
            username: logFound[0].username,
            count: log.length,
            log
        };
        done(null, logResponseObject);
        return logResponseObject;
    });
}

exports.ExerciseModel = Exercise;
exports.addExercise = addExercise;
exports.getExerciseLog = getExerciseLog;
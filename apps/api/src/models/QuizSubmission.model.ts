import mongoose from 'mongoose';

const QuizSubmissionSchema = new mongoose.Schema(
    {
        quizID: {
            type: String,
            required: true,
        },
        quizTitle: {
            type: String,
            required: true,
        },
        userID: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        correctQuestions: {
            type: Number,
            required: true,
        },
        totalScore: {
            type: Number,
            required: true,
        },
        totalQuestions: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

QuizSubmissionSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

QuizSubmissionSchema.set('toJSON', {
    virtuals: true,
    transform(doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        delete ret.updatedAt;
        return ret;
    },
});

QuizSubmissionSchema.set('toObject', {
    virtuals: true,
    transform(doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        delete ret.updatedAt;
        return ret;
    },
});

export default mongoose.model('QuizSubmission', QuizSubmissionSchema);

import mongoose from 'mongoose';

const QuizReportSchema = new mongoose.Schema(
    {
        quizID: {
            type: String,
            required: true,
            unique: true,
        },
        quizTaken: {
            type: Number,
            required: true,
        },
        avgScore: {
            type: Number,
            required: true,
        },
        sumScore: {
            type: Number,
            required: true,
        },
        totalScore: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

QuizReportSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

QuizReportSchema.set('toJSON', {
    virtuals: true,
    transform(doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        delete ret.updatedAt;
        return ret;
    },
});

QuizReportSchema.set('toObject', {
    virtuals: true,
    transform(doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        delete ret.updatedAt;
        return ret;
    },
});

export default mongoose.model('QuizReport', QuizReportSchema);

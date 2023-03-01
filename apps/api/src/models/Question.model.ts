import mongoose from 'mongoose';
import OptionSchema from './Option.model';

const QuestionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            min: 3,
            trim: true,
        },
        options: [OptionSchema],
        isMultiple: {
            type: Boolean,
            required: true,
        },
        points: {
            type: Number,
            default: 1,
        },
    },
    { timestamps: true }
);

QuestionSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

QuestionSchema.set('toJSON', {
    virtuals: true,
    transform(doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    },
});

QuestionSchema.set('toObject', {
    virtuals: true,
    transform(doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});

export default QuestionSchema;

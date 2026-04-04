import { Schema, model, type Document } from "mongoose";

interface AttemptInfo {
  user: Schema.Types.ObjectId;
  attempts: number;
  expiresAt: Date; // Quiz attempts must expire/reset every other day
}

interface IQuizAttempts extends AttemptInfo, Document {
  createdAt: string;
  updatedAt: string;
}

const QuizAttemptsSchema = new Schema<IQuizAttempts>({
  user: { type: Schema.Types.ObjectId, required: true, unique: true }, 
  attempts: { type: Number, required: true, default: 0 }, 
  expiresAt: {
   type: Date,
    default: () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0); // midnight
      return tomorrow;
    }
  }
}, {
  timestamps: true 
});

// Quiz attempts TTL
QuizAttemptsSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const QuizAttemptsModel = model<IQuizAttempts>("QuizAttempts", QuizAttemptsSchema);

export { type AttemptInfo, QuizAttemptsModel };
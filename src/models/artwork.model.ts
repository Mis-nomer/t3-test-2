import mongoose, { type Document, Schema } from "mongoose";

export interface IArtwork extends Document {
  title: string;
  description: string | null;
  medium: string;
  artist_title: string;
  image_url: string;
}

export const ArtworkSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: String,
  medium: { type: String, required: true },
  artist_title: { type: String, required: true },
  image_url: { type: String, required: true },
});

export default (mongoose.models.Artwork as mongoose.Model<IArtwork>) ??
  mongoose.model<IArtwork>("Artwork", ArtworkSchema);

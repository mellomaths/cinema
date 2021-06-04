import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Movie extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  plot: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  rating: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);

export type MovieRepository = Model<Movie>;

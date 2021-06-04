import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop()
  title: string;

  @Prop()
  plot: string;

  @Prop()
  status: string;

  @Prop()
  language: string;

  @Prop()
  category: string;

  @Prop()
  year: number;

  @Prop()
  rating: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);

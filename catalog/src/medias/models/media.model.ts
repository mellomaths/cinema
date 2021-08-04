import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { DynamicModule } from '@nestjs/common';

export class MediaMetrics {
  ordersCount: number;

  constructor() {
    this.ordersCount = 0;
  }
}

@Schema()
export class Media extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  plot: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  category: string[];

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  rating: number;

  @Prop({ default: new MediaMetrics() })
  metrics: MediaMetrics;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
MediaSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

export type MediaRepository = Model<Media>;

export class MediaMongooseModule {
  static register(): DynamicModule {
    return MongooseModule.forFeature([
      { name: Media.name, schema: MediaSchema },
    ]);
  }
}

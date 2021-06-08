import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class NotificationPreferences extends Document {
  @Prop({ required: true })
  email: boolean;

  @Prop({ required: true })
  pushNotifications: boolean;
}

@Schema()
export class Profile extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  notificationPreferences: NotificationPreferences;
}

@Schema()
export class Customer extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true })
  profile: Profile;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
CustomerSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

export type CustomerRepository = Model<Customer>;

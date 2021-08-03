import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  amount: number;
}

@Schema()
export class Order extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;

  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  products: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

export type OrderRepository = Model<Order>;

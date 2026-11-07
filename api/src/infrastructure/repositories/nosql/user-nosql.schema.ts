import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserNoSqlDocument = UserNoSqlModel & Document;

@Schema({ collection: 'users', timestamps: true, versionKey: false })
export class UserNoSqlModel {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: Date, default: () => new Date() })
  registrationDate: Date;
}

export const UserNoSqlSchema = SchemaFactory.createForClass(UserNoSqlModel);

UserNoSqlSchema.index({ email: 1 }, { unique: true });
UserNoSqlSchema.index({ registrationDate: -1 });

UserNoSqlSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

UserNoSqlSchema.set('toObject', {
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
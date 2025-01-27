import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { transformer } from './utils';
import { User } from './User';

@Entity({ name: 'sessions' })
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  sessionToken!: string;

  @Column({ type: 'uuid' })
  userId!: string;

  @Column({ transformer: transformer.date })
  expires!: string;

  @ManyToOne(() => User, (user) => user.sessions, { lazy: true })
  user!: Promise<User>;
}

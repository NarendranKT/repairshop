// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   UpdateDateColumn,
//   // OneToMany,
//   BaseEntity,
// } from 'typeorm';
// // import { Account } from './Account';
// // import { Session } from './Session';

// @Entity('users') // Table name
// export class User extends BaseEntity {
//   @PrimaryGeneratedColumn('uuid')
//   id!: string; // Unique identifier for the user

//   @Column({ type: 'varchar', nullable: true })
//   name?: string; // Optional name

//   @Column({ type: 'varchar', unique: true, nullable: true })
//   email?: string; // Email is optional but must be unique

//   @Column({ type: 'varchar', nullable: true })
//   image?: string; // Profile picture URL

//   @Column({ type: 'varchar', nullable: true })
//   password?: string; // Hashed password for credentials-based auth

//   @CreateDateColumn({ type: 'timestamp' })
//   createdAt!: Date; // Timestamp when the user is created

//   @UpdateDateColumn({ type: 'timestamp' })
//   updatedAt!: Date; // Timestamp when the user is updated

//   // Relations
//   // @OneToMany(() => Account, (account) => account.user)
//   // accounts: Account[]; // OAuth accounts (Google, GitHub, etc.)

//   // @OneToMany(() => Session, (session) => session.user)
//   // sessions: Session[]; // Active user sessions
// }

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { transformer } from './utils';
import { Account } from './Accounts';
import { Session } from './Sessions';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: true })
  name!: string | null;

  @Column({ type: 'varchar', nullable: true, unique: true })
  email!: string | null;

  @Column({ type: 'varchar', nullable: true })
  password!: string | null;

  @Column({ type: 'varchar', nullable: true, transformer: transformer.date })
  emailVerified!: string | null;

  @Column({ type: 'varchar', nullable: true })
  image!: string | null;

  @Column({ type: 'varchar', nullable: true })
  role!: string | null;

  @OneToMany(() => Session, (session) => session.userId, { lazy: true })
  sessions!: Promise<Session[]>;

  @OneToMany(() => Account, (account) => account.user, { lazy: true })
  accounts!: Promise<Account[]>;
}

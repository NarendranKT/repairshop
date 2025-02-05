import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Ticket } from './entities';

@Entity({ name: 'customers' })
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ type: 'varchar', nullable: false })
  firstName!: string;

  @Column({ type: 'varchar', nullable: false })
  lastName!: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email!: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  phone!: string;

  @Column({ type: 'varchar', nullable: false })
  address1!: string;

  @Column({ type: 'varchar', nullable: true })
  address2?: string;

  @Column({ type: 'varchar', nullable: true })
  city?: string;

  @Column({ type: 'varchar', nullable: false, length: 2 })
  state!: string;

  @Column({ type: 'varchar', nullable: false, length: 6 })
  zip!: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  active!: boolean;

  @OneToMany(() => Ticket, (ticket) => ticket.customer)
  tickets!: Ticket[];

  // $By default timestamp will take the current time when the record is created and updated
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

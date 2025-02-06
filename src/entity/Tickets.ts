import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from './entities';

@Entity({ name: 'tickets' })
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne(() => Customer, (customer) => customer.id, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  @JoinColumn({ name: 'customerId' }) // Maps this field to the customer table
  customer!: Promise<Customer>;

  @Column({ type: 'varchar', nullable: false })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  completed!: boolean;

  @Column({ type: 'varchar', nullable: false, default: 'unassigned' })
  assignedTo!: string;

  // $By default timestamp will take the current time when the record is created and updated
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

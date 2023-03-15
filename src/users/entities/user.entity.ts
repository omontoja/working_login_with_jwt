import { Role } from 'src/model/role.enum';
import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { hashSync } from 'bcrypt';

@Entity()
export class User {
  @PrimaryColumn({ unique: true })
  registrationnumber: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  roles: Role[];

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}

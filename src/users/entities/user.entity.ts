import { Role } from 'src/model/role.enum';
import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}

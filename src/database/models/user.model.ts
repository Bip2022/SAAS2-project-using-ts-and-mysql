import { Table,Column,Model,DataType, PrimaryKey } from 'sequelize-typescript';

@Table({
  tableName: 'users',//GUI maa dekhauney name 
  modelName: 'User',//project vhitra table lai access garne name
  timestamps: true
  })


  class User extends Model {
    @Column({
      primaryKey: true,
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @Column({
      type: DataType.STRING
 
    })
    declare username: string;

    @Column({
      type: DataType.STRING,
    })
    declare password : string;

    @Column({
      type: DataType.STRING,
     
      
      
    })
    declare email: string;

    @Column({
      type: DataType.ENUM('teacher', 'institute', 'student', 'super-admin'),
      defaultValue: 'student'

    })
    declare role: 'teacher' | 'institute' | 'student'| 'super-admin';
  }

  export default User;



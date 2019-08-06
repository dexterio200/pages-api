import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'

@Entity()
export default class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text', { nullable: false })
    firstName: string

    @Column('text', { nullable: false })
    lastName: string

    @Column('text', { nullable: false })
    email: string

    @Column('text')
    city: string
}
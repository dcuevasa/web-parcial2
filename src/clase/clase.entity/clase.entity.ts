import { Entity, Column, PrimaryGeneratedColumn, Long, OneToMany } from "typeorm";
import { BonoEntity } from "../../bono/bono.entity/bono.entity";

@Entity()
export class ClaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nombre: string;

    @Column()
    codigo: string;

    @Column()
    numero_creditos: number;

    @OneToMany(type => BonoEntity, bono => bono.clase)
    bonos: BonoEntity[];

}

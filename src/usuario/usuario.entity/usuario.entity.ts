import { Entity, Column, PrimaryGeneratedColumn, Long, OneToMany } from 'typeorm';
import { BonoEntity } from '../../bono/bono.entity/bono.entity';

@Entity()
export class UsuarioEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    cedula: number;

    @Column()
    nombre: string;

    @Column()
    grupo_investigacion: string;

    @Column()
    numero_extension: number;

    @Column()
    rol: string;

    @Column()
    jefe: string;

    @OneToMany(type => BonoEntity, bono => bono.usuario)
    bonos: BonoEntity[];

}

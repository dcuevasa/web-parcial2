import { Entity, Column, PrimaryGeneratedColumn, Long, Double, ManyToOne } from "typeorm";
import { ClaseEntity } from "../../clase/clase.entity/clase.entity";
import { UsuarioEntity } from "../../usuario/usuario.entity/usuario.entity";

@Entity()
export class BonoEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    monto: number;

    @Column()
    calificacion: number;

    @Column()
    palabra_clave: string;

    @ManyToOne(type => ClaseEntity, clase => clase.bonos)
    clase: ClaseEntity;

    @ManyToOne(type => UsuarioEntity, usuario => usuario.bonos)
    usuario: UsuarioEntity;

}

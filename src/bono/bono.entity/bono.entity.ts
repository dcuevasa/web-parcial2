import { Entity, Column, PrimaryGeneratedColumn, Long, Double, ManyToOne } from "typeorm";
import { ClaseEntity } from "src/clase/clase.entity/clase.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity/usuario.entity";

@Entity()
export class BonoEntity {

    @PrimaryGeneratedColumn("uuid")
    id: Long;

    @Column()
    monto: number;

    @Column()
    calificacion: Double;

    @Column()
    palabra_clave: string;

    @ManyToOne(type => ClaseEntity, clase => clase.bonos)
    clase: ClaseEntity;

    @ManyToOne(type => UsuarioEntity, usuario => usuario.bonos)
    usuario: UsuarioEntity;

}

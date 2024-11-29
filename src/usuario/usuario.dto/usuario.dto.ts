import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class UsuarioDto {

    @IsNotEmpty()
    @IsNumber()
    cedula: number;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    grupo_investigacion: string;

    @IsNotEmpty()
    @IsNumber()
    numero_extension: number;

    @IsNotEmpty()
    @IsString()
    rol: string;

    @IsNotEmpty()
    @IsString()
    jefe: string;
}

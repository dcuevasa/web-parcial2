import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class ClaseDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;
    
    @IsNotEmpty()
    @IsString()
    codigo: string;
    
    @IsNotEmpty()
    @IsNumber()
    numero_creditos: number;
}

import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class BonoDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;
    
    @IsNotEmpty()
    @IsNumber()
    precio: number;
    
    @IsNotEmpty()
    @IsUrl()
    imagenUrl: string;
}

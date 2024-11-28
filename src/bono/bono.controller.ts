import { Controller } from '@nestjs/common';
import { BonoService } from './bono.service';

@Controller('bono')
export class BonoController {
    constructor(private readonly bonoService: BonoService) {
        
    }
}

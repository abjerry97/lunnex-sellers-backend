import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      "code": 200,
      "message": "Lunnex Backend Created With NestJs",
      "maintainer": "Abiodun Jeremiah",
      "source": "https://github.com/abjerry97"
    };
  }
}

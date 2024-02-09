import { BadRequestExceptionWS } from '@exceptions';
import { CanActivate, Inject, Injectable, ArgumentsHost } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { isDefined } from 'class-validator';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import generalConfig from '@config/src/general.config';
import { hostname } from 'os';

@Injectable()
export class WsGuard implements CanActivate {
    constructor(
        @Inject(generalConfig.KEY)
        private generalCfg: ConfigType<typeof generalConfig>,
        private jwtService: JwtService
    ) {}

    canActivate(
        context: any
    ): Promise<boolean | any> | Observable<boolean | any> | any {
        // for testing support, fallback to token header
        // const token =
        // socket.handshake.auth.token || socket.handshake.headers['token'];
        console.log('burada');
        return this.validateRequest(context);
    }

    private async validateRequest(
        req: any
        // staticTokenRequired: boolean
    ): Promise<boolean> {
        const socket = req.switchToWs().getClient();
        const token = this.getBearerToken(socket);
        // console.log(
        //     'validaterequest',
        //     socket,
        //     token,
        //     this.generalCfg.jwt_secret_key
        // );
        try {
            console.log(
                'validaterequest',
                // socket,
                token,
                this.generalCfg.jwt_secret_key
            );
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.generalCfg.jwt_secret_key
            });
            console.log('payload', payload);

            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            // req['args']['user'] = payload;
            req.switchToHttp().getRequest().user = payload;
            console.log('validate', req);
        } catch (error) {
            // return true;
            throw new BadRequestExceptionWS(error, socket);
        }

        return true;
    }

    private getBearerToken(socket: Socket) {
        if (this.isNotExistsBearerToken(socket)) {
            // throw new WsUnauthorizedException('Token yok!');
            throw new BadRequestExceptionWS('Token yok', socket);
        }
        const auth =
            socket.handshake.auth.token || socket.handshake.headers['token'];

        return auth.split('Bearer ')[1];
    }

    private isNotExistsBearerToken(socket: Socket): boolean {
        const authorization =
            socket.handshake.auth.token || socket.handshake.headers['token'];

        return (
            !isDefined(authorization) || !authorization.startsWith('Bearer ')
        );
    }
}

import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { PacketType } from 'socket.io-parser';
@Catch()
export class AllExceptionsSocketFilter extends BaseWsExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const client = host.switchToWs().getClient();
        client.packet({
            type: PacketType.ACK,
            data: [{ error: exception?.message }],
            id: client.nsp._ids++
        });
    }
}
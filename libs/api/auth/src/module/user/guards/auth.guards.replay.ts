import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Optional
} from '@nestjs/common';
import { AES, enc } from 'crypto-js';

@Injectable()
export class ReplayGuard implements CanActivate {
   LIFE_TIME_DURATION = 3600 ; // 1h / 1.5

  readonly store = new Map();

  constructor(
     @Optional() @Inject('API_AUTH_GUARD_REPLAY_DISABLED') private isDisabled: boolean,
     @Optional() @Inject('API_AUTH_GUARD_REPLAY_TIME_DISABLED') private timeDisabled: boolean,
     @Optional() @Inject('API_AUTH_GUARD_REPLAY_LOGGING') private logging: boolean,
     @Optional() @Inject('API_AUTH_GUARD_REPLAY_SECRET') private replayKey: string,
     @Optional() @Inject('API_AUTH_GUARD_REPLAY_DURATION') private replayDur: number,
  ) {
    if(replayDur)this.LIFE_TIME_DURATION = replayDur
  }

  protected get key(): string {
    return 'Tor';
  }

  protected getIV(iv: string) {
    return enc.Utf8.parse(iv + (this.replayKey || ''));
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    if(this.isDisabled || process.env['API_AUTH_GUARD_REPLAY_DISABLED']){
      return true
    }

    const request = context.switchToHttp().getRequest();
    const [iV, token] = this.getToken(request);

    if (!token || !token[0] || !token[1]) {
      return false;
    }
    let diffInSeconds;
    try {
      const params = this.decrypt(token, this.getIV(iV));
      const { ts, r1, r2, r3, userId } = JSON.parse(params);

      diffInSeconds = this.timeDisabled ? 0 : this.getDiff(ts);
      const id = [r1, r2, r3, userId].join('-');

      if(this.logging){

        console.log('ReplayGuard: Incoming request from',id)

        console.log('ReplayGuard: VERIFY TIME DIFF',
            Math.abs(diffInSeconds) ,'<', this.LIFE_TIME_DURATION,
            Math.abs(diffInSeconds) < this.LIFE_TIME_DURATION)

        console.log('ReplayGuard: Store is unique', !this.store.has(id))
        console.log('ReplayGuard: can pass ',  Math.abs(diffInSeconds) < this.LIFE_TIME_DURATION && !this.store.has(id))
      }

      if (
          Math.abs(diffInSeconds) < this.LIFE_TIME_DURATION && !this.store.has(id)
      ) {
        this.store.set(id, true);
        setTimeout(() => this.store.delete(id), this.LIFE_TIME_DURATION * 1000);
        return true;
      }

      throw new HttpException('Forbidden', HttpStatus.I_AM_A_TEAPOT);
    } catch (e) {
      console.log('Time',diffInSeconds);
      console.log('Token parser error', iV, token);
      console.log(e);
      return false;
    }
  }

  // Get formatted date string in UTC timezone 0
  getDate(): number {
    const date = new Date();
    const userTimezoneOffset = date.getTimezoneOffset() * -1;
    return new Date(date.getTime() - userTimezoneOffset).getTime();
  }

  getDiff(ts: number): number {
    const timeStampNow = this.getDate();
    return Math.floor(((timeStampNow - ts) / 1000) % 60);
  }

  getToken(request: any): string[] {
    return (request.headers['X-TOKEN-ASGARD'] || (request.headers['x-token-asgard'] as string) || '')?.split(' ');
  }

  decrypt(value: string, iv):string {
    return AES.decrypt(value, this.key, { iv: iv }).toString(enc.Utf8);
  }
}



import { Client } from 'cast-protocol/lib/client/client';
import { MediaChannel } from 'cast-protocol/lib/protocol/google-cast';
import { ReceiverStatusApplication } from 'cast-protocol/src/protocol/google-cast';
import { Application } from './application';
import { MediaController } from '../controllers/media';
import { logger } from '../common/logger';

export class GenericMediaApplication extends Application {

  private media: MediaController;
  private APP_ID = '';

  constructor(
    public client: Client,
    public session: ReceiverStatusApplication,
  ) {
    super(client, session);

    logger.debug('GenericMediaApplication():', { receiverId: this?.receiverId });
    this.media = new MediaController(client, this?.senderId, this?.receiverId);
    this.media.on('status', (message) => this.onMediaControllerStatus(message));
    logger.debug('GenericMediaApplication():', this.media);
  }

  private onMediaControllerStatus(message: MediaChannel['message']) {
    logger.debug('onMediaControllerStatus:', message);
    this.emit('status', message);
  }

  public getStatus(callback: any) {
    this.media.getStatus(callback);
  }
}

import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IApiNotifyMessage } from './api.notify.interfacte';
import { API_CONFIG_MS_CONNECTION } from '@wes/api-config';

@Controller()
export class ApiNotifyMessagePatternController {
  constructor() {}

  @MessagePattern(
    API_CONFIG_MS_CONNECTION.NOTIFY.endpointDefinition.healthCheck
  )
  async healthCheck(@Payload() payload: IApiNotifyMessage.HealthCheck) {
    return {
      status: 200,
      payload: payload,
    };
  }

  @MessagePattern(
    API_CONFIG_MS_CONNECTION.NOTIFY.endpointDefinition.configVerify
  )
  async configVerify(
    @Payload()
    payload: API_CONFIG_MS_CONNECTION.NOTIFY.DTO.NotifyConfigVerifyDTO
  ) {
    /*
    const { error } = await Mailer.verifyConfig(payload);
    if (error) {
      return {
        state: false,
        error,
      };
    }

    return {
      state: true,
      error,
    };
    * */
  }

  @MessagePattern(
    API_CONFIG_MS_CONNECTION.NOTIFY.endpointDefinition.messageSend
  )
  async messageSend(
    @Payload() payload: API_CONFIG_MS_CONNECTION.NOTIFY.DTO.NotifySendDTO
  ) {
    /*
    const mail = new Mailer.Send.Mail(payload.settingMail);
    return new Promise((resolve, reject) =>
      mail
        .sendEmail(
          payload.to,
          payload.subject,
          payload.message,
          payload.replayTo || false,
          payload.messageId,
          { pdf: payload.attachments || [] }
        )
        .then((state: any) => {
          /*
          const sendState = { state: state === !!state?.messageId ? 1 : state };
          this.loggerFacade
            .saveLog(
              payload.companyId,
              "EMAIL",
              "SEND",
              [
                payload.to,
                sendState.state,
                (payload.message || payload.pdfContent)?.length,
                payload.settingMail?.email,
                "A:" + payload.attachments?.length,
              ].join("|")
            )
            .catch(() => null);
          return state;

  })
.then(resolve)
.catch((error) => {
  /**
   this.loggerFacade
   .saveLog(
   payload.companyId,
   "EMAIL",
   "SEND",
   [
   payload.to,
   0,
   (payload.message || payload.pdfContent)?.length,
   payload.settingMail?.email,
   "A:" + payload.attachments?.length,
   "E:" + error?.message,
   ].join("|")
   )
   .catch(() => null);

  reject(false);
})
);
    * */
  }

  @MessagePattern(API_CONFIG_MS_CONNECTION.NOTIFY.endpointDefinition.logsGet)
  async logsGet(@Payload() payload: { companyId: number }): Promise<any[]> {
    return [];
  }
}

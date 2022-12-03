/* eslint-disable camelcase */
import { RequestConfigurationQuery } from '../request';

interface GetPaymentsRequest extends RequestConfigurationQuery {
  /**
   * Token de notificación recibido usando la API de notificaiones 1.3 o superior. Este campo tiene un largo fijo de 64 caracteres.
   */
  notification_token: string;
}

export default GetPaymentsRequest;

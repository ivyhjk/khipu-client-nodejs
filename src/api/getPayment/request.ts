import RequestBody from '../requestBody';

interface GetPaymentRequest extends RequestBody {
  /**
   * Identificador del pago.
   *
   * Este campo tiene un largo máximo de 255 caracteres.
   */
  id: string;
}

export default GetPaymentRequest;

/* eslint-disable camelcase */

interface CreateReceiverResponse {
  /**
   * Identificador único de la cuenta de cobro.
   */
  receiver_id: string;
  /**
   * Llave secreta de la cuenta de cobro, se usa para firmar todas las
   * peticiones.
   */
  secret: string;
}

export default CreateReceiverResponse;

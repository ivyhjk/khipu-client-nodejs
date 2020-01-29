interface CreatePaymentResponse {
  /**
   * Identificador único del pago, es una cadena alfanumérica de 12 caracteres.
   */
  payment_id: string;
  /**
   * URL principal del pago, si el usuario no ha elegido previamente un método
   * de pago se le muestran las opciones.
   */
  payment_url: string;
  /**
   * URL de pago simplificado.
   */
  simplified_transfer_url: string;
  /**
   * URL de pago normal.
   */
  transfer_url: string;
  /**
   * URL de webpay.
   */
  webpay_url: string;
  /**
   * URL para invocar el pago desde un dispositivo móvil usando la APP de khipu.
   */
  app_url: string;
  /**
   * Es 'true' si el pago ya cuenta con todos los datos necesarios para
   * abrir directamente la aplicación de pagos khipu.
   */
  ready_for_terminal: boolean;
}

export default CreatePaymentResponse;


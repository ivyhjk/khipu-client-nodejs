/* eslint-disable camelcase */
interface GetPaymentsResponse {
  /**
   * Identificador único del pago, es una cadena alfanumérica de 12 caracteres.
   *
   * Cómo este identificador es único, se puede usar, por ejemplo, para evitar
   * procesar una notificación repetida. (Khipu espera un código 200 al
   * notificar un pago, si esto no ocurre se reintenta hasta por dos días)
   */
  payment_id: string;
  /**
   * (String) URL principal del pago, si el usuario no ha elegido previamente un método de pago se le muestran las opciones
   */
  payment_url: string;
  /**
   * URL de pago simplificado
   */
  simplified_transfer_url: string;
  /**
   * URL de pago normal
   */
  transfer_url: string;
  /**
   * URL para invocar el pago desde un dispositivo móvil usando la APP de Khipu
   */
  app_url: string;
  /**
   * Es 'true' si el pago ya cuenta con todos los datos necesarios para abrir
   * directamente la aplicación de pagos Khipu
   */
  ready_for_terminal: boolean;
  /**
   * Cadena de caracteres alfanuméricos que identifican unicamente al pago, es
   * el identificador que el servidor de Khipu enviará al servidor del comercio
   * cuando notifique que un pago está conciliado
   */
  notification_token: string;
  /**
   * Identificador único de una cuenta de cobro
   */
  receiver_id: number;
  /**
   * Fecha y hora de conciliación del pago.
   *
   * Formato ISO-8601.
   *
   * Ej: 2017-03-01T13:00:00Z
   */
  conciliation_date: string;
  /**
   * Motivo del pago
   */
  subject: string;
  /**
   * Monto del pago
   */
  amount: number;
  /**
   * El código de moneda en formato ISO-4217
   */
  currency: string;
  /**
   * Estado del pago, puede ser 'pending' (el pagador aún no comienza a pagar),
   * 'verifying' (se está verificando el pago) o 'done', cuando el pago ya
   * está confirmado
   */
  status: string;
  /**
   * Detalle del estado del pago,
   *
   * 'pending' (el pagador aún no comienza a pagar),
   * 'normal' (el pago fue verificado y fue cancelado por algún medio de pago estándar),
   * 'marked-paid-by-receiver' (el cobrador marco el cobro como pagado por otro medio),
   * 'rejected-by-payer' (el pagador declaró que no pagará),
   * 'marked-as-abuse' (el pagador declaró que no pagará y que el cobro fue no solicitado) y
   * 'reversed' (el pago fue anulado por el comercio, el dinero fue devuelto al pagador).
   */
  status_detail: string;
  /**
   * Detalle del cobro
   */
  body: string;
  /**
   * URL de cobro
   */
  picture_url: string;
  /**
   * URL del comprobante de pago
   */
  receipt_url: string;
  /**
   * URL donde se redirige al pagador luego que termina el pago
   */
  return_url: string;
  /**
   * URL donde se redirige al pagador luego de que desiste hacer el pago
   */
  cancel_url: string;
  /**
   * URL del webservice donde se notificará el pago
   */
  notify_url: string;
  /**
   * Versión de la api de notificación
   */
  notify_api_version: string;
  /**
   * Fecha máxima para ejecutar el pago (en formato ISO-8601).
   *
   * El cliente podrá realizar varios intentos de pago hasta dicha fecha.
   *
   * Cada intento tiene un plazo individual de 3 horas para su ejecución
   */
  expires_date: string;
  /**
   * (array[String]) URLs de archivos adjuntos al pago
   */
  attachment_urls: Array<string>;
  /**
   * Nombre del banco seleccionado por el pagador
   */
  bank: string;
  /**
   * Identificador del banco seleccionado por el pagador
   */
  bank_id: string;
  /**
   * Nombre del pagador
   */
  payer_name: string;
  /**
   * Correo electrónico del pagador
   */
  payer_email: string;
  /**
   * Identificador personal del pagador
   */
  personal_identifier: string;
  /**
   * Número de cuenta bancaria del pagador
   */
  bank_account_number: string;
  /**
   * Es 'true' si la conciliación del pago fue hecha luego de la fecha de
   * expiración
   */
  out_of_date_conciliation: boolean;
  /**
   * Identificador del pago asignado por el cobrador
   */
  transaction_id: string;
  /**
   * (String máximo 4096 caracteres) Campo genérico que asigna el cobrador al
   * momento de hacer el pago
   */
  custom: string;
  /**
   * Correo electrónico de la persona responsable del pago
   */
  responsible_user_email: string;
  /**
   * Es 'true' cuando este es un cobro por correo electrónico y Khipu enviará
   * recordatorios
   */
  send_reminders: boolean;
  /**
   * Es 'true' cuando Khipu enviará el cobro por correo electrónico
   */
  send_email: boolean;
  /**
   * Método de pago usado por el pagador, puede ser
   *
   * 'regular_transfer' (transferencia normal),
   * 'simplified_transfer' (transferencia simplificada).
   */
  payment_method: string;
  /**
   * Origen de fondos usado por el pagador, puede ser
   *
   * 'debit' para pago con débito,
   * 'prepaid' para pago con prepago,
   * 'credit' para pago con crédito o
   * vacío en el caso de que se haya pagado mediante transferencia bancaria.
   */
  funds_source: string;
}

export default GetPaymentsResponse;

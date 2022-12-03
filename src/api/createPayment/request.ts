/* eslint-disable camelcase */
import RequestBody from '../requestBody';

interface CreatePaymentRequest extends RequestBody {
  /**
   * Motivo.
   *
   * Este campo tiene un largo máximo de 255 caracteres.
   */
  subject: string;
  /**
   * El código de moneda en formato ISO-4217.
   *
   * Este campo tiene un largo máximo de 255 caracteres.
   */
  currency: string;
  /**
   * El monto del cobro.
   *
   * Sin separador de miles y usando ‘.’ como separador de decimales.
   *
   * Hasta 4 lugares decimales, dependiendo de la moneda.
   *
   * Este campo tiene un largo máximo de 16 caracteres.
   */
  amount: number;
  /**
   * Identificador propio de la transacción.
   *
   * Ej: número de factura u orden de compra.
   *
   * Este campo tiene un largo máximo de 255 caracteres.
   */
  transaction_id?: string;
  /**
   * Parámetro para enviar información personalizada de la transacción.
   *
   * Ej: documento XML con el detalle del carro de compra
   *
   * Este campo tiene un largo máximo de 1.073.741.824 caracteres.
   */
  custom?: string;
  /**
   * Descripción del cobro.
   *
   * Este campo tiene un largo máximo de 5.120 caracteres.
   */
  body?: string;
  /**
   * Identificador del banco para usar en el pago.
   *
   * Este campo tiene un largo máximo de 5 caracteres.
   */
  bank_id?: string;
  /**
   * La dirección URL a donde enviar al cliente mientras el pago está siendo
   * verificado.
   *
   * Este campo tiene un largo máximo de 1.024 caracteres.
   */
  return_url?: string;
  /**
   * La dirección URL a donde enviar al cliente si decide no hacer hacer
   * la transacción.
   *
   * Este campo tiene un largo máximo de 1.024 caracteres.
   */
  cancel_url?: string;
  /**
   * Una dirección URL de una foto de tu producto o servicio.
   *
   * Este campo tiene un largo máximo de 1.024 caracteres.
   */
  picture_url?: string;
  /**
   * La dirección del web-service que utilizará khipu para notificar cuando
   * el pago esté conciliado.
   *
   * Este campo tiene un largo máximo de 1.024 caracteres.
   */
  notify_url?: string;
  /**
   * La dirección URL del archivo PDF con el contrato a firmar mediante este
   * pago. El cobrador debe estar habilitado para este servicio y el campo
   * 'fixed_payer_personal_identifier' es obligatorio.
   *
   * Este campo tiene un largo máximo de 1.024 caracteres.
   */
  contract_url?: string;
  /**
   * Versión de la API de notifiaciones para recibir avisos por web-service.
   *
   * Este campo tiene un largo máximo de 255 caracteres.
   */
  notify_api_version?: string;
  /**
   * Fecha máxima para ejecutar el pago (en formato ISO-8601).
   *
   * El cliente podrá realizar varios intentos de pago hasta dicha fecha.
   *
   * Cada intento tiene un plazo individual de 3 horas para su ejecución.
   */
  expires_date?: string;
  /**
   * Si es 'true', se enviará una solicitud de cobro al correo especificado
   * en 'payer_email'.
   *
   * Este campo tiene un largo máximo de 5 caracteres.
   */
  send_email?: boolean;
  /**
   * Nombre del pagador. Es obligatorio cuando send_email es 'true'.
   *
   * Este campo tiene un largo máximo de 255 caracteres.
   */
  payer_name?: string;
  /**
   * Correo del pagador. Es obligatorio cuando send_email es 'true'.
   *
   * Este campo tiene un largo máximo de 255 caracteres.
   */
  payer_email?: string;
  /**
   * Si es 'true', se enviarán recordatorios de cobro.
   *
   * Este campo tiene un largo máximo de 5 caracteres.
   */
  send_reminders?: boolean;
  /**
   * Correo electrónico del responsable de este cobro, debe corresponder a
   * un usuario khipu con permisos para cobrar usando esta cuenta de cobro.
   *
   * Este campo tiene un largo máximo de 255 caracteres.
   */
  responsible_user_email?: string;
  /**
   * Identificador personal. Si se especifica, solo podrá ser pagado usando
   * ese identificador.
   *
   * Este campo tiene un largo máximo de 255 caracteres.
   */
  fixed_payer_personal_identifier?: string;
  /**
   * Comisión para el integrador. Sólo es válido si la cuenta de cobro tiene
   * una cuenta de integrador asociada.
   *
   * Este campo tiene un largo máximo de 16 caracteres.
   */
  integrator_fee?: number;
  /**
   * Para cuentas de cobro con más cuenta propia. Permite elegir la cuenta
   * donde debe ocurrir la transferencia.
   *
   * Este campo tiene un largo máximo de 255 caracteres.
   */
  collect_account_uuid?: string;
  /**
   * Fecha de rendición del cobro. Es también la fecha final para poder
   * reembolsar el cobro.
   *
   * Formato ISO-8601.
   *
   * Ej: 2017-03-01T13:00:00Z
   *
   * Este campo tiene un largo máximo de 22 caracteres.
   */
  confirm_timeout_date?: string;
  /**
   * El cobro sólo se podrá pagar utilizando el medio de pago especificado.
   *
   * Los posibles valores para este campo se encuentran en el campo id de la
   * respuesta del endpoint Consulta medios de pago disponibles.
   *
   * Este campo tiene un largo máximo de 255 caracteres.
   */
  mandatory_payment_method?: string;
}

export default CreatePaymentRequest;

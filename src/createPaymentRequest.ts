interface CreatePaymentRequest {
  /**
   * Motivo.
   */
  subject: string;
  /**
   * El código de moneda en formato ISO-4217.
   */
  currency: string;
  /**
   * El monto del cobro. Sin separador de miles y usando '.' como separador
   * de decimales. Hasta 4 lugares decimales, dependiendo de la moneda.
   */
  amount: number;
  /**
   * Identificador propio de la transacción.
   *
   * Ej: número de factura u orden de compra.
   */
  transaction_id?: string;
  /**
   * Parámetro para enviar información personalizada de la transacción.
   *
   * Ej: documento XML con el detalle del carro de compra
   */
  custom?: string;
  /**
   * Descripción del cobro.
   */
  body?: string;
  /**
   * Identificador del banco para usar en el pago.
   */
  bank_id?: string;
  /**
   * La dirección URL a donde enviar al cliente mientras el pago está siendo
   * verificado.
   */
  return_url?: string;
  /**
   * La dirección URL a donde enviar al cliente si decide no hacer hacer
   * la transacción.
   */
  cancel_url?: string;
  /**
   * Una dirección URL de una foto de tu producto o servicio.
   */
  picture_url?: string;
  /**
   * La dirección del web-service que utilizará khipu para notificar cuando
   * el pago esté conciliado.
   */
  notify_url?: string;
  /**
   * La dirección URL del archivo PDF con el contrato a firmar mediante este
   * pago. El cobrador debe estar habilitado para este servicio y el campo
   * 'fixed_payer_personal_identifier' es obligatorio.
   */
  contract_url?: string;
  /**
   * Versión de la API de notifiaciones para recibir avisos por web-service.
   */
  notify_api_version?: string;
  /**
   * Fecha de expiración del cobro. Pasada esta fecha el cobro es inválido.
   * Formato ISO-8601.
   *
   * Ej: 2017-03-01T13:00:00Z
   */
  expires_date?: string;
  /**
   * Si es 'true', se enviará una solicitud de cobro al correo especificado
   * en 'payer_email'.
   */
  send_email?: boolean;
  /**
   * Nombre del pagador. Es obligatorio cuando send_email es 'true'.
   */
  payer_name?: string;
  /**
   * Correo del pagador. Es obligatorio cuando send_email es 'true'.
   */
  payer_email?: string;
  /**
   * Si es 'true', se enviarán recordatorios de cobro.
   */
  send_reminders?: boolean;
  /**
   * Correo electrónico del responsable de este cobro, debe corresponder a
   * un usuario khipu con permisos para cobrar usando esta cuenta de cobro.
   */
  responsible_user_email?: string;
  /**
   * Identificador personal. Si se especifica, solo podrá ser pagado usando
   * ese identificador.
   */
  fixed_payer_personal_identifier?: string;
  /**
   * Comisión para el integrador. Sólo es válido si la cuenta de cobro tiene
   * una cuenta de integrador asociada.
   */
  integrator_fee?: number;
  /**
   * Para cuentas de cobro con más cuenta propia. Permite elegir la cuenta
   * donde debe ocurrir la transferencia.
   */
  collect_account_uuid?: string;
  /**
   * Fecha de rendición del cobro. Es también la fecha final para poder
   * reembolsar el cobro. Formato ISO-8601.
   *
   * Ej: 2017-03-01T13:00:00Z
   */
  confirm_timeout_date?: string;
}

export default CreatePaymentRequest;

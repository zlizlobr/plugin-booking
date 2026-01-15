/**
 * Initialize quote order form handlers
 * 
 * @package Wpcbooking
 * @since 1.0.0
 */

import { createOrder } from './forms/FormSendOrderHandler';

document.addEventListener('DOMContentLoaded', () => {
  createOrder();
});


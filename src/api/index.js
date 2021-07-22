import _ from 'lodash-es';

export const ENTITY_CONTACTS = 'contacts';
export const ENTITY_METHODS = 'methods';
export const ENTITY_PAYMENT = 'payments';
export const METHOD_CARD = 'card';
export const METHOD_ACCOUNT = 'account';

class Api {
  getList(key) {
    return JSON.parse(localStorage.getItem(key)) ?? [];
  }

  createItem(key, item) {
    const items = this.getList(key);

    item = _.cloneDeep(item);
    item.id = items.length > 0 ? items[items.length - 1].id + 1 : 0;
    items.push(item);

    localStorage.setItem(key, JSON.stringify(items));
  }

  getContacts() {
    return this.getList(ENTITY_CONTACTS);
  }

  createContact(contact) {
    this.createItem(ENTITY_CONTACTS, contact);
  }

  getMethods() {
    return this.getList(ENTITY_METHODS);
  }

  createMethod(method) {
    this.createItem(ENTITY_METHODS, method);
  }

  createPayment(payment) {
    this.createItem(ENTITY_PAYMENT, payment);
  }
}

export default new Api();

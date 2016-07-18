/**
 * Pattern Map
 * @auth: Huy Lam
 * @version: 0.0.3
 * @category: form
 * @desc: regular expression pattern for input field validation
 * @ex: <input pattern='regex'>
 */


var patternMap = {
  amount: '^(.+)*[0-9]+[.][0-9]{2}([ ][A-Z]{3})*$', // $1.23 USD
  amex: '^[0-9]{4}[ ][0-9]{6}[ ][0-9]{5}$', // 1234 56789 01234
  amexUnformat: '^[0-9]{15}$', // 15 digits
  cc: '(^[0-9]{4}[ ][0-9]{4}[ ][0-9]{4}[ ][0-9]{4}$)|(^[0-9]{4}[ ][0-9]{6}[ ][0-9]{5}$)', // 1234 5678 9012 3456 OR 1234 56789 01234
  ccUnformat: '^[0-9]{16}$', // 16 digits
  email: '/^[A-z]+([A-z0-9.+_-]+)*@[A-z]+([A-z0-9_-]+)*([.][A-z]+([A-z0-9_-]+)*)*([.][A-z]{2,6})$/', // e@mail.com
  ephone: '(^[A-z]+([A-z0-9._-]+)*@[A-z]+([A-z0-9_-]+)*([.][A-z]+([A-z0-9_-]+)*)*([.][A-z]{2,6})$)|(^[(][0-9]{3}[)][ ][0-9]{3}[-][0-9]{4}$)', // e@mail.com OR (123) 456-7890
  expire: '^[0-9]{2}[/][0-9]{2}$', // 01/23
  expireUnformat: '^[0-9]{4}$', // 4 digits
  name: '/^[A-z0-9 &_.-]+$/', // allow uppercase, lowercase, number, & _ . -
  phone: '^[(][0-9]{3}[)][ ][0-9]{3}[-][0-9]{4}$', // (123) 456-7890
  phoneUnformat: '^[0-9]{10}$', // 10 digits
  pin: '[0-9]', // 4-8 digits
  pwd: '/(?=.*[a-z])(?=.*[\'^£$%&*()}{@#~?><>,|=_+¬-])(?=.*[A-Z])(?=.*[0-9])/', // lowercase, special characters, uppercase, digits
  special: '/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', 
  ssn: '^[0-9]{3}[-][0-9]{2}[-][0-9]{4}$', // 123-45-6789
  ssnUnformat: '^[0-9]{9}$'// 9 digits
}

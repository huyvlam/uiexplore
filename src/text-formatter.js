(function (mQ) {
  'use strict';

/**
 * Formatter Module
 * @author: Huy Lam
 * @contributor: Nova Nursalim
 * @version: 0.2.0
 * @category: form
 * @desc: deformat field upon focus
 *        format field upon blur 
 *        [* 'format as you type' or keystroke format is not a good idea *]
 * @params: form name, event and callback function
 * @dependency: pattern map, filter submodule, edit submodule
 * @howToUse: add attribute [ mQ-format-type='format_type' ] in the input field
 * EX: var form = new Formatter(form_name);
 *     form.init();
 *     <input mQ-format-type='phone' value='1234567890'> 
 *       return (123) 456-7890 on BLUR
 *       return 1234567890 on FOCUS
 */
  mQ.Formatter = function (form_name) {
    var events_callback, 
    form_query = ['form[name=', form_name, ']'].join(''), 
    form = document.querySelector(form_query), 
    input_fields = form.querySelectorAll('input[mQ-format-type]'), 

    deformat = function (input_field) {
      var deformat_type = input_field.getAttribute('mQ-format-type'), 
      value = input_field.value;

      if (!value || deformat_type == null || new RegExp(patternMap.email).test(value)) return;

      input_field.value = value.filter(deformat_type);
    }, 

    format = function (input_field) {
      var format_type = input_field.getAttribute('mQ-format-type'), 
      value = input_field.value;

      if (!value || format_type == null || new RegExp(patternMap.email).test(value)) return;

      input_field.value = value.edit(format_type);
    }, 

    handleEvent = function (e) {
      if (e.type == 'focus') deformat(e.target);
      if (e.type == 'blur') format(e.target);
    }, 

    addEvent = function () {
      for (var i = 0; i < input_fields.length; i++) {
        for (var key in events_callback) {
          input_fields[i].addEventListener(key, events_callback[key], true);
        }
      }
    }, 

    removeEvent = function () {
      for (var i = 0; i < input_fields.length; i++) {
        for (var key in events_callback) {
          input_fields[i].removeEventListener(key, events_callback[key], true);
        }
      }
    }


    return {
      init : function (args) { //args = {event1: callback1, event2: callback2}
        this.destroy();
        events_callback = args || {'focus': handleEvent, 'blur': handleEvent};
        addEvent();
        console.log('mQ.Formatter.init ', events_callback);
      },

      destroy : function () {
        if (!events_callback) return;
        removeEvent();
        events_callback = null;
        console.log('mQ.Formatter.destroy ', events_callback);
      }
    };
  }

  var form = new Formatter('form_name');
  form.init();




/* Filter Submodule
* @desc: filter data and return what's specified
*        return original value if filter type is unrecognized
* @param: [required: string object, filter type]
* @howToUse: object.filter(filter_type);
* @EX:('$1.02 USD').filter('number'); RETURN '102'
*     ('$1.02 USD').filter('word'); RETURN 'USD'
*     ('$1.02 USD').filter('special'); RETURN '$.'
*     ('$1.02 USD').filter('decimal'); RETURN '1.02'
*/
  mQ.String.prototype.filter = function (type) {
    switch (type) {
    case 'decimal':
      var decimal, length,
        arr = this.split('.');
      if (arr.length === 1) {
        arr = [ Number(arr[0].filter('number')), '00' ];
      } else {
        arr = [ Number(arr[0].filter('number')), arr[1].filter('number') ];
        decimal = arr[1].toString();
        length = decimal.length;
        if (length === 1) {
          decimal += '0';
        } else if (length > 1) {
          decimal = decimal.substr(0, 2);
        }
        arr[1] = decimal;
      }
      arr.splice(1, 0, '.');
      return arr.join('');
      break;

    case 'number':
      //returns whole numbers
      return this.replace(/\D/g, '');
      break;

    case 'special':
      //returns special characters
      return this.replace(/\w/g, '').replace(/\s/g, '');
      break;

    case 'word':
      //returns words
      return this.replace(/\W/g, '').replace(/\d/g, '');
      break;

    default:
      // return original value
      return this;
      break;
    }
  };




/* Edit Submodule
* @desc: edit and return formatted data as specified
* @param: [required: string object, edit type]
* @howToUse: object.edit(edit_type);
* @EX: ('1').edit('amount'); RETURN '1.00'
*      ('1234567890123456').edit('cc'); RETURN '1234 5678 9012 3456'
*      ('1234').edit('expire'); RETURN '12/34'
*      ('1234567890').edit('phone'); RETURN '(123) 456-7890'
*      ('123456789').edit('ssn'); RETURN '123-45-6789'
*/
  mQ.String.prototype.edit = function (type) {
    switch (type) {
    case 'cc':
      if (new RegExp(patternMap.amexUnformat).test(this)) {
        //returns 1234 56789 01234
        return [this.substr(0, 4), ' ', this.substr(4, 6), ' ', this.substr(10)].join('');
      } else if (new RegExp(patternMap.ccUnformat).test(this)) {
        //returns 1234 5678 9012 3456
        return [this.substr(0, 4), ' ', this.substr(4, 4), ' ', this.substr(8, 4), ' ', this.substr(12)].join('');
      } else {
        return this;
      }
      break;

    case 'phone':
      //returns (123) 456-7890
      return (new RegExp(patternMap.phoneUnformat).test(this)) ? ['(', this.substr(0, 3), ') ', this.substr(3, 3), '-', this.substr(6)].join('') : this;
      break;

    case 'ssn':
      //returns 123-45-6789
      return (new RegExp(patternMap.ssnUnformat).test(this)) ? [this.substr(0, 3), '-', this.substr(3, 2), '-', this.substr(5)].join('') : this;
      break;

    default:
      //returns original value
      return this;
      break;
    }
  };
}(window, window.mQModules || (window.mQModules = {})));

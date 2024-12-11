function currencyFormat (number, currency) {
    if (currency === 'IDR') return "Rp. " + number.toLocaleString("id-ID");
    return number
}

export const priceFormat = (val, currency = 'IDR') => {

    const str = String(val);
    function returnNumber (val) {
      const countLeadingZeros = (value) => {
        const match = value.match(/^0+/);
        return match ? match[0].length : 0;
      };
    
      if (!val || val == 0) {
        if (countLeadingZeros(val) > 0) {
          return ''+0;
        }
        return 0;
      } else {
        if (countLeadingZeros(val) > 0) {
          return parseFloat(val.slice(countLeadingZeros(val)));
        }
        return parseFloat(val);4
      }
    }

    const number = str.replace(/\D/g, "");
    const result = returnNumber(number);
  
    return { value: result, withCurrency: currencyFormat(result, currency) };

  }
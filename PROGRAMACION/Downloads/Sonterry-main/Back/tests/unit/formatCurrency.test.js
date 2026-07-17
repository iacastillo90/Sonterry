const formatCurrency = (val) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(val);
};

describe('formatCurrency utility', () => {
  it('debe formatear número entero con símbolo COP', () => {
    expect(formatCurrency(50000)).toBe('$ 50.000');
  });

  it('debe formatear número con decimales', () => {
    expect(formatCurrency(123456)).toBe('$ 123.456');
  });

  it('debe formatear cero', () => {
    expect(formatCurrency(0)).toBe('$ 0');
  });
});

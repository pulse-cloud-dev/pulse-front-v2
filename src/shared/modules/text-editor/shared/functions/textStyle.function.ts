export function textStyleFn(style: 'bold' | 'italic' | 'underline') {
  let result;

  if (style === 'bold') {
    result = { fontWeight: 'bold' };
  } else if (style === 'italic') {
    result = { fontStyle: 'italic' };
  } else if (style === 'underline') {
    result = { textDecoration: 'underline' };
  }
  return result;
}

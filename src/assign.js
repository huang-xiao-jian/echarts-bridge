/**
 * @description - recursive variable assignment
 *
 * @param expression
 * @param value
 * @return {object}
 */
export default function assign(expression, value) {
  let list = expression.split('.');
  let field = list[0];

  if (list.length === 1) {
    return { [field]: value }
  } else {
    return { [field]: assign(list.slice(1).join('.'), value) };
  }
}
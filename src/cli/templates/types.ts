import { lowercase, Schema, tsType, AUTOGENERATED_NOTICE } from "../utils";

export default function (schema: Schema): string {
  return `${AUTOGENERATED_NOTICE}

${schema.messages
  .map(
    (message) =>
      `export interface ${message.name} {
${message.fields
  .map((field) => `  ${field.name}: ${tsType(field.type)};`)
  .join("\n")}
}`
  )
  .join("\n\n")}

${schema.services
  .map(
    (service) =>
      `export interface ${service.name} {
${service.methods
  .map(
    (method) =>
      `  ${method.name}(${lowercase(method.input_type)}: ${
        method.input_type
      }): Promise<${method.output_type}>;`
  )
  .join("\n")}
}`
  )
  .join("\n\n")}
`;
}

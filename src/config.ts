type ServiceConfigParams = "port" | "basePath" | "enableStripePayments";
const serviceConfigChecked: Record<ServiceConfigParams, string | number | boolean> = {
  port: 3000,
  basePath: "http://localhost",
  enableStripePayments: false,
};

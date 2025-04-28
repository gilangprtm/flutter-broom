/**
 * Export all templates for Provider state management
 */

// App templates
import { mainTemplate } from "./app/MainTemplate";
import {
  appRoutesTemplate,
  appRoutesProviderTemplate,
  appProvidersTemplate,
} from "./app/RoutingTemplates";
import { dependenciesTemplate } from "./app/DependenciesTemplate";

// Feature templates
import { pageTemplate } from "./feature/PageTemplate";
import { providerTemplate } from "./feature/ProviderTemplate";

// Service templates
import { dioServiceTemplate } from "../../../global/services/DioServiceTemplate";
import { httpServiceTemplate } from "../../../global/services/HttpServiceTemplate";
import { serviceTemplate } from "./service/FeatureServiceTemplate";

// Helper templates
import { dialogHelperTemplate } from "../../../global/helper/DialogHelperTemplate";

// Re-export all templates
export {
  // App
  mainTemplate,
  appRoutesTemplate,
  appRoutesProviderTemplate,
  appProvidersTemplate,
  dependenciesTemplate,

  // Feature
  pageTemplate,
  providerTemplate,

  // Service
  dioServiceTemplate,
  httpServiceTemplate,
  serviceTemplate,

  // Helper
  dialogHelperTemplate,
};

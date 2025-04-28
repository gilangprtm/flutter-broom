export const appRoutesTemplate = `
class AppRoutes {
  // Feature routes
}
`;

export const appRoutesProviderTemplate = `
import 'package:flutter/material.dart';
import 'app_routes.dart';

class AppRoutesProvider {
  static Map<String, WidgetBuilder> getRoutes() {
    return {
      // Route mappings
    };
  }
}
`;

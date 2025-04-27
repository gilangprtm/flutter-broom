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

export const appProvidersTemplate = `
import 'package:provider/provider.dart';
import 'package:provider/single_child_widget.dart';

class AppProviders {
  static List<SingleChildWidget> getProviders() {
    return [
      // {{stateClassName}} list
    ];
  }
}
`;

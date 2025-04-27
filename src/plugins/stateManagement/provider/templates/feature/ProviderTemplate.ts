export const providerTemplate = `
import 'package:flutter/material.dart';
import '../../data/datasource/network/service/{{featureName}}_service.dart';

class {{pascalName}}Provider with ChangeNotifier {
  late BuildContext context;
  {{pascalName}}Service {{camelName}}Service = {{pascalName}}Service();
  int _count = 0;

  int get count => _count;

  void incrementCount() {
    _count++;
    notifyListeners();
  }
}
`;

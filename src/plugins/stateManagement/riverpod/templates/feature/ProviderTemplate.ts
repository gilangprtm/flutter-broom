export const providerTemplate = `
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '{{featureName}}_state.dart';
import '{{featureName}}_notifier.dart';

final {{pascalName}}Provider = StateNotifierProvider.autoDispose<{{pascalName}}Notifier, {{pascalName}}State>(
  (ref) => {{pascalName}}Notifier(const {{pascalName}}State(), ref),
);
`;

export const yamlTemplate = `
name: flutter_project
description: "A new Flutter project."
version: 1.0.0+1

environment:
  sdk: ^3.6.0

dependencies:
  flutter:
    sdk: flutter

  # State management
  flutter_riverpod: ^2.5.0
  riverpod_annotation: ^2.5.0

  # HTTP Client
  dio: ^5.8.0+1
  pretty_dio_logger: ^1.4.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  integration_test:
    sdk: flutter

  # Code Generation
  build_runner: ^2.4.8
  riverpod_generator: ^2.5.0

flutter:
  uses-material-design: true
`;

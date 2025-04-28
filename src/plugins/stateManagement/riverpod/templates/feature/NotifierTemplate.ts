export const notifierTemplate = `
import '../../../core/base/base_state_notifier.dart';
import '{{featureName}}_state.dart';

/// StateNotifier for the {{featureName}} Screen
class {{pascalName}}Notifier extends BaseStateNotifier<{{pascalName}}State> {
  {{pascalName}}Notifier(super.initialState, super.ref);

  @override
  void onInit() {
    super.onInit();
    // Your initialization logic here
  }

  @override
  void onReady() {
    super.onReady();
    // Your ready logic here
  }

  /// Example method to update the state
  void incrementCounter() {
    state = state.copyWith(counter: state.counter + 1);
  }
}
`;

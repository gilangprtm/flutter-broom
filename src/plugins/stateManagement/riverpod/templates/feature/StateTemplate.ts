export const stateTemplate = `
class {{pascalName}}State {
  final int counter;

  const {{pascalName}}State({
    this.counter = 0,
  });

  {{pascalName}}State copyWith({
    int? counter,
  }) {
    return {{pascalName}}State(
      counter: counter ?? this.counter,
    );
  }
}`;

// File PageTemplate.ts

export const pageTemplate = `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../providers/{{featureName}}_provider.dart';

class {{pascalName}}Page extends StatelessWidget {
  const {{pascalName}}Page({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<{{pascalName}}Provider>(context);
    provider.context = context;

    return Scaffold(
      appBar: AppBar(
        title: const Text("{{pascalName}} Page"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Count: \${provider.count}', style: const TextStyle(fontSize: 24)),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: provider.incrementCount,
              child: const Text('Increment Count'),
            ),
          ],
        ),
      ),
    );
  }
}`;

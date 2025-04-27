export const CustomCardTemplate = `
import 'package:flutter/material.dart';

class CustomCard extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry? padding;
  final EdgeInsetsGeometry? margin;
  final Color? backgroundColor;
  final double? elevation;
  final double borderRadius;
  final Border? border;
  final VoidCallback? onTap;
  
  const CustomCard({
    Key? key,
    required this.child,
    this.padding,
    this.margin,
    this.backgroundColor,
    this.elevation,
    this.borderRadius = 8.0,
    this.border,
    this.onTap,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(borderRadius),
      child: Container(
        padding: padding ?? const EdgeInsets.all(16.0),
        margin: margin,
        decoration: BoxDecoration(
          color: backgroundColor ?? theme.cardColor,
          borderRadius: BorderRadius.circular(borderRadius),
          border: border,
          boxShadow: elevation != null && elevation! > 0
            ? [
                BoxShadow(
                  color: Colors.black.withOpacity(0.1),
                  blurRadius: elevation! * 2,
                  spreadRadius: elevation! * 0.2,
                  offset: Offset(0, elevation! * 0.5),
                ),
              ]
            : null,
        ),
        child: child,
      ),
    );
  }
}
`;

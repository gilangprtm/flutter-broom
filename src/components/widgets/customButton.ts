export const CustomButtonTemplate = `
import 'package:flutter/material.dart';

class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final Color? backgroundColor;
  final Color? textColor;
  final double? width;
  final double height;
  final bool isOutlined;
  final IconData? icon;
  final bool isLoading;
  final double borderRadius;

  const CustomButton({
    Key? key,
    required this.text,
    required this.onPressed,
    this.backgroundColor,
    this.textColor,
    this.width,
    this.height = 48.0,
    this.isOutlined = false,
    this.icon,
    this.isLoading = false,
    this.borderRadius = 8.0,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    final Color bgColor = backgroundColor ?? theme.primaryColor;
    final Color txtColor = textColor ?? Colors.white;
    
    Widget buttonChild = isLoading 
      ? SizedBox(
          height: 20,
          width: 20,
          child: CircularProgressIndicator(
            strokeWidth: 2.0,
            valueColor: AlwaysStoppedAnimation<Color>(
              isOutlined ? bgColor : txtColor,
            ),
          ),
        )
      : Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (icon != null) ...[
              Icon(icon, color: isOutlined ? bgColor : txtColor),
              const SizedBox(width: 8),
            ],
            Text(
              text,
              style: TextStyle(
                color: isOutlined ? bgColor : txtColor,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        );
        
    return SizedBox(
      width: width,
      height: height,
      child: isOutlined
        ? OutlinedButton(
            onPressed: isLoading ? null : onPressed,
            style: OutlinedButton.styleFrom(
              side: BorderSide(color: bgColor),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(borderRadius),
              ),
            ),
            child: buttonChild,
          )
        : ElevatedButton(
            onPressed: isLoading ? null : onPressed,
            style: ElevatedButton.styleFrom(
              backgroundColor: bgColor,
              foregroundColor: txtColor,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(borderRadius),
              ),
            ),
            child: buttonChild,
          ),
    );
  }
}
`;

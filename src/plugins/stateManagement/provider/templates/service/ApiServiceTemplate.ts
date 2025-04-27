export const dioServiceTemplate = `
import 'package:dio/dio.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';

import '../../../../main.dart';

enum UrlType {
  baseUrl,
}

class DioService {
  final Dio _dio;
  final context = navigatorKey.currentContext;

  static String getBaseUrl(UrlType urlType) {
    switch (urlType) {
      case UrlType.baseUrl:
        return "";

      default:
        return "";
    }
  }

  DioService() : _dio = Dio() {
    _dio.options = BaseOptions(
      connectTimeout: const Duration(seconds: 15),
      receiveTimeout: const Duration(seconds: 15),
      headers: {
        'Accept': 'application/json',
      },
    );

    _dio.interceptors.addAll([
      PrettyDioLogger(),
      _TokenInterceptor(),
    ]);
  }

  Future<Response> get(
    String path, {
    Map<String, dynamic>? queryParameters,
    Options? options,
    UrlType urlType = UrlType.baseUrl,
  }) async {
    try {
      var url = getBaseUrl(urlType) + path;
      return await _dio.get(url,
          queryParameters: queryParameters, options: options);
    } catch (e) {
      throw _handleError(e);
    }
  }

  Future<Response> post(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    UrlType urlType = UrlType.baseUrl,
  }) async {
    try {
      var url = getBaseUrl(urlType) + path;
      return await _dio.post(url,
          data: data, queryParameters: queryParameters, options: options);
    } catch (e) {
      throw _handleError(e);
    }
  }

  Future<Response> put(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    UrlType urlType = UrlType.baseUrl,
  }) async {
    try {
      var url = getBaseUrl(urlType) + path;
      return await _dio.put(url,
          data: data, queryParameters: queryParameters, options: options);
    } catch (e) {
      throw _handleError(e);
    }
  }

  Future<Response> delete(
    String path, {
    Map<String, dynamic>? queryParameters,
    Options? options,
    UrlType urlType = UrlType.baseUrl,
  }) async {
    try {
      var url = getBaseUrl(urlType) + path;
      return await _dio.delete(url,
          queryParameters: queryParameters, options: options);
    } catch (e) {
      throw _handleError(e);
    }
  }

  // Error handling
  DioException _handleError(dynamic error) {
    if (error is DioException) {
      String message = 'Unknown error occurred.';
      switch (error.type) {
        case DioExceptionType.connectionTimeout:
        case DioExceptionType.sendTimeout:
        case DioExceptionType.receiveTimeout:
          message = 'Connection timeout, please try again later.';
          break;
        case DioExceptionType.badResponse:
          if (error.response?.statusCode == 401) {
            message = 'Unauthorized access. Please login again.';
          } else if (error.response?.statusCode == 403) {
            message = 'Access forbidden.';
          } else if (error.response?.statusCode == 404) {
            message = 'Resource not found.';
          } else if (error.response?.statusCode == 500) {
            message = 'Server error, please try again later.';
          } else {
            message = 'Server error: \${error.response?.statusCode}';
          }
          break;
        case DioExceptionType.cancel:
          message = 'Request cancelled.';
          break;
        case DioExceptionType.connectionError:
          message = 'No internet connection.';
          break;
        default:
          message = 'Network error occurred.';
          break;
      }
      
      return DioException(
        requestOptions: error.requestOptions,
        error: message,
        type: error.type,
        response: error.response,
      );
    }
    
    return DioException(
      requestOptions: RequestOptions(path: ''),
      error: 'Unknown error',
    );
  }
}

class _TokenInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    // Add token to header if available
    // final token = 'Bearer token';
    // options.headers['Authorization'] = token;
    handler.next(options);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    if (err.response?.statusCode == 401) {
      // Handle token refresh or logout logic
    }
    handler.next(err);
  }
}
`;

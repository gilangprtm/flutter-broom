import { writeFileSync, mkdirSync, readFileSync } from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { config } from "../utils/config";

// Fungsi untuk generate file folder routes
const generateApi = (workspaceFolder: string) => {
  const apiService = path.join(
    workspaceFolder,
    config.flutterProjectRoot,
    config.dataDirectory,
    config.datasourceDirectory,
    config.networkDirectory,
    config.dbDirectory,
    "dio_service.dart"
  );

  // Membuat folder jika belum ada
  const apiServicePath = path.dirname(apiService);
  mkdirSync(apiServicePath, { recursive: true });

  const apiServiceContent = `
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

  Future<Response> patch(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    UrlType urlType = UrlType.baseUrl,
  }) async {
    try {
      var url = getBaseUrl(urlType) + path;
      return await _dio.patch(url,
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

  Future<Response> postFormData(
    String path,
    FormData formData, {
    UrlType urlType = UrlType.baseUrl,
  }) async {
    try {
      var url = getBaseUrl(urlType) + path;
      return await _dio.post(
        url,
        data: formData,
        options: Options(
          headers: {'Content-Type': 'multipart/form-data'},
        ),
      );
    } catch (e) {
      throw _handleError(e);
    }
  }

  Future<Response> putFormData(
    String path,
    FormData formData, {
    UrlType urlType = UrlType.baseUrl,
  }) async {
    try {
      var url = getBaseUrl(urlType) + path;
      return await _dio.put(
        url,
        data: formData,
        options: Options(
          headers: {'Content-Type': 'multipart/form-data'},
        ),
      );
    } catch (e) {
      throw _handleError(e);
    }
  }

  Future<Response> patchFormData(String path, FormData formData) async {
    try {
      return await _dio.patch(
        path,
        data: formData,
        options: Options(
          headers: {'Content-Type': 'multipart/form-data'},
        ),
      );
    } catch (e) {
      throw _handleError(e);
    }
  }

  // Updated error handling with DioException
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
          message =
              'Received invalid status code: \${error.response?.statusCode}';
          break;

        // DioExceptionType.cancel is no longer directly available
        case DioExceptionType.cancel:
          message = 'Request to API server was cancelled.';
          break;

        // DioExceptionType.other has been replaced with a generic error type
        case DioExceptionType.connectionError:
          message = 'Unexpected error occurred: \${error.message}';
          break;

        // Handle unknown types
        default:
          message = 'An unknown error occurred';
          break;
      }
      return DioException(
        requestOptions: error.requestOptions,
        error: message,
      );
    } else {
      return DioException(
          requestOptions: RequestOptions(path: ''),
          error: 'Unknown error occurred.');
    }
  }
}

class _TokenInterceptor extends Interceptor {
  @override
  void onRequest(
      RequestOptions options, RequestInterceptorHandler handler) async {
    // Add token to the header before the request is sent
    String? token = await _getToken();
    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token';
    }
    handler.next(options);
  }

  @override
  void onResponse(Response response, ResponseInterceptorHandler handler) {
    handler.next(response);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    if (err.response?.statusCode == 401) {
      // Handle token refresh logic here
      String? newToken = await _refreshToken();
      if (newToken != null) {
        err.requestOptions.headers['Authorization'] = 'Bearer $newToken';
        final cloneReq = await Dio().fetch(err.requestOptions);
        return handler.resolve(cloneReq);
      }
    }
    handler.next(err);
  }

  Future<String?> _getToken() async {
    // Fetch the token from local storage or secure storage
    return 'your-token';
  }

  Future<String?> _refreshToken() async {
    // Implement refresh token logic
    return 'new-token';
  }
}
      `;

  // Membuat file jika belum ada
  writeFileSync(apiService, apiServiceContent);

  vscode.window.showInformationMessage("API service generated successfully!");
};

export { generateApi };

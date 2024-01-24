import { HttpException, HttpStatus } from '@nestjs/common';

export interface IAppResponse {
  data: any;
  path?: string;
  status: number;
  success: boolean;
  message?: string;
  timestamp?: string;
}

interface IResponseObject {
  message?: string;
}

/**
 * @desc Error handler
 * @param {HttpException} exception
 * @return IAppResponse
 **/
export const buildErrorResponseBody = (
  exception: HttpException,
): IAppResponse => {
  const status: number =
    exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

  const message =
    exception instanceof HttpException
      ? (exception.getResponse() as IResponseObject)?.message
      : (exception as IResponseObject)?.message;

  return {
    data: {},
    success: false,
    status: status,
    message: message,
    timestamp: new Date().toISOString(),
  };
};

import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ApiError } from '../interfaces/api-error';

export const extractError = (resError: HttpErrorResponse): ApiError[] => {
  let errors = [{ message: 'something went wrong' }];
  if (resError && resError.error) {
    // console.log(resError.error.message);

    errors = [{ message: resError.error.message }];
  }

  return errors;
};
//

export const getToken = () => {
  let headers = new HttpHeaders();
  headers = headers.set(
    'authorization',
    localStorage.getItem('topShelf_token')
  );
};

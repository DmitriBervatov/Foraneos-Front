import {useMutation} from '@tanstack/react-query';
import {loginApi} from '../api/authApi';

export function useLogin() {
  return useMutation({
    mutationFn: ({username, password} : {username: string; password: string}) => loginApi(username, password),
  })
}
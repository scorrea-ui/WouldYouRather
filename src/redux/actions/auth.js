
import { GET_USERS, LOG_IN, LOG_OUT } from '../types/auth';

export function users(users) {
  return {
    type: GET_USERS,
    users,
  };
}

export function login(user) {
  return {
    type: LOG_IN,
    user,
  };
}

export function logout() {
  return {
    type: LOG_OUT,
  };
}

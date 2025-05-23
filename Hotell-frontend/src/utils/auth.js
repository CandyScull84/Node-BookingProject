import { jwtDecode } from 'jwt-decode';

// Hämta användaren från token
export function getCurrentUser() {
  const token = localStorage.getItem('authToken');
  if (!token) return null;

  try {
    return jwtDecode(token); // Returnerar t.ex. { id: ..., role: ..., iat: ..., exp: ... }
  } catch (err) {
    console.error('Ogiltig token', err);
    return null;
  }
}

// Kolla om användaren är admin
export function isAdmin() {
  const user = getCurrentUser();
  return user?.role === 'Admin';
}

// Kolla om användaren är inloggad
export function isLoggedIn() {
  return !!getCurrentUser();
}

// Logga ut
export function logout() {
  localStorage.removeItem('authToken');
}

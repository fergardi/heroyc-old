let api = 'http://localhost:3000/api'

export const resources = function() {
  return $.get(`${api}/resources`);
}

export const spells = function() {
  return $.get(`${api}/spells`);
}

export const items = function() {
  return $.get(`${api}/items`);
}
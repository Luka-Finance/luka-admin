function getFromLs(key) {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
};

function setToLs(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

function removeFromLs(key) {
    localStorage.removeItem(key);
};

function clearLs() {
    localStorage.clear()
}

export default {
    getFromLs,
    setToLs,
    removeFromLs,
    clearLs
};
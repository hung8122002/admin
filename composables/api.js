const api = {
  getApi() {
    return "http://localhost:3000/book";
  },

  getCategory() {
    return "http://localhost:3000/category";
  },

  getWishlist() {
    return "http://localhost:3000/wishlist";
  },

  getUser() {
    return "http://localhost:3000/user";
  },

  getFeedBack() {
    return "http://localhost:3000/feedback";
  },

  getAdmin() {
    return "http://localhost:3000/admin";
  },

  getWarehouse() {
    return "http://localhost:3000/warehouse";
  },

  getByBookId(bookId) {
    return `?bookId=${bookId}`;
  },

  getOrder() {
    return "http://localhost:3000/order";
  },

  getOrderByDate(month) {
    return `?createdAt_gte=2023-0${
      month > 9 ? month : `${month}`
    }-01T00:00:00.000Z&createdAt_lte=2023-0${
      month > 9 ? month : `${month}`
    }-31T23:59:59.999Z`;
  },

  getCart() {
    return "http://localhost:3000/cart";
  },

  getCartUser(user) {
    return `?userId=${user}`;
  },

  getUserName(username) {
    return `?username=${username}`;
  },

  getEmail(email) {
    return `?email=${email}`;
  },

  getBook(type, currentPage, limit) {
    return `?type_like=${type}&_page=${currentPage}&_limit=${limit}`;
  },

  getSearchPrice(type, price) {
    const split = price.split("-");
    return `&${type}_gte=${split[0]}&${type}_lte=${split[1]}`;
  },

  getsearchText(text) {
    return `&name_like=${text}`;
  },

  getSort(type = "", order = "") {
    return `&_sort=${type}&_order=${order}`;
  },
};

export default api;

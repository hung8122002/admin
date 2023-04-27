const api = {
  getApi() {
    return "http://api-five-lemon.vercel.app/book";
  },

  getCategory() {
    return "http://api-five-lemon.vercel.app/category";
  },

  getWishlist() {
    return "http://api-five-lemon.vercel.app/wishlist";
  },

  getUser() {
    return "http://api-five-lemon.vercel.app/user";
  },

  getFeedBack() {
    return "http://api-five-lemon.vercel.app/feedback";
  },

  getAdmin() {
    return "http://api-five-lemon.vercel.app/admin";
  },

  getWarehouse() {
    return "http://api-five-lemon.vercel.app/warehouse";
  },

  getByBookId(bookId) {
    return `?bookId=${bookId}`;
  },

  getOrder() {
    return "http://api-five-lemon.vercel.app/order";
  },

  getOrderByDate(month) {
    return `?createdAt_gte=2023-0${
      month > 9 ? month : `${month}`
    }-01T00:00:00.000Z&createdAt_lte=2023-0${
      month > 9 ? month : `${month}`
    }-31T23:59:59.999Z`;
  },

  getCart() {
    return "http://api-five-lemon.vercel.app/cart";
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

const UrlService = {

  params: null,

  get(param) {
    if (!this.params) {
      /* global URLSearchParams */
      this.params = new URLSearchParams(window.location.search);
    }
    return this.params.get(param);
  }
}

export default UrlService;
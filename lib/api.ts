import axios from 'axios';

export default class API {
  private static host: string = 'https://backup.bronyru.info/api/v1/';

  public static episodes = {
    get(extended: boolean = true) {
      return API.getMethod('/episodes/', null, { extended: extended ? 1 : 0 });
    },

    getById(id: number, extended: boolean = true) {
      return API.getMethod(`/episodes/${id}/`, null, { extended: extended ? 1 : 0 });
    },

    getByName(query: string) {
      return API.getMethod('/episodes/getByName/', [], { query, style: 1 });
    },

    search(q: string) {
      return API.getMethod('/episodes/search/', [], { q });
    },
  };

  public static categories = {
    get() {
      return API.getMethod('/categories/', []);
    },
  };

  public static url = {
    get(to: string) {
      return API.getMethod('/url/', [], { to });
    },
  };

  public static async getMethod(url: string, def: any = null, params = {}) {
    try {
      const response = await axios.get(this.host + url, { params });
      return response.data || def;
    } catch (e) {
      throw e.response.data.message;
    }
  }
}

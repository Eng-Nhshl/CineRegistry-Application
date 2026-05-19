import axios from "axios";
const baseUrl = "/api";

export class BaseService {
  constructor(resourcePath) {
    this.resourcePath = resourcePath;
    this.http = axios.create({
      baseURL: baseUrl,
      headers: { "Content-Type": "application/json" },
    });
  }

  getAll = async (config = {}) => {
    const { data } = await this.http.get(`/${this.resourcePath}`, config);
    return data;
  };

  getById = async (id) => {
    const { data } = await this.http.get(`/${this.resourcePath}/${id}`);
    return data;
  };

  create = async (item) => {
    const { data } = await this.http.post(`/${this.resourcePath}`, item);
    return data;
  };

  update = async (id, item) => {
    const { data } = await this.http.put(`/${this.resourcePath}/${id}`, item);
    return data;
  };

  delete = async (id) => {
    await this.http.delete(`/${this.resourcePath}/${id}`);
  };
}

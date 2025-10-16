interface Config {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
}

interface Options extends RequestInit {
  query?: Record<string, string | number | boolean>;
}

export class HttpClient {
  private readonly baseUrl: string;
  private readonly defaultHeaders: Record<string, string>;

  constructor(config: Config) {
    this.baseUrl = config.baseUrl;
    this.defaultHeaders = config.defaultHeaders ?? {};
  }

  private async request(endpoint: string, { query = {}, ...options }: Options) {
    const url = this.buildUrl(endpoint, query);
    return fetch(url, {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    });
  }

  private buildUrl(
    endpoint: string,
    query: Record<string, string | number | boolean>,
  ) {
    const url = new URL(endpoint, this.baseUrl);
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });

    return url;
  }

  get(endpoint: string, options: Omit<Options, "method"> = {}) {
    return this.request(endpoint, {
      method: "GET",
      ...options,
    });
  }
}

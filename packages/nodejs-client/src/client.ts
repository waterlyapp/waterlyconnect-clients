import axios, { AxiosProxyConfig, AxiosRequestConfig } from "axios";

import { ClientDeviceInfo, RequiredRequestHeaders, Submission, TagDatum } from "./models";

export type WaterlyConnectApiClientConfig = {
  proxy?: AxiosProxyConfig;
};

export class WaterlyConnectApiClient {
  private readonly axiosConfigTemplate: Omit<AxiosRequestConfig<Submission>, "data">;

  constructor(
    private readonly url: string,
    private readonly clientToken: string,
    private readonly clientDevice: ClientDeviceInfo,
    clientConfig: WaterlyConnectApiClientConfig = {},
  ) {
    const headers: RequiredRequestHeaders = {
      "x-waterly-connect-token": clientToken,
      "x-waterly-request-type": "WaterlyConnect",
    };

    this.axiosConfigTemplate = {
      url,
      method: "post",
      headers,
      proxy: clientConfig.proxy,
    };
  }

  public async submitData(tags: TagDatum[]) {
    const submission: Submission = {
      tags,
      device: this.clientDevice,
      timestamp: Math.floor(new Date().getTime() / 1000),
    };

    const requestConfig: AxiosRequestConfig<Submission> = {
      ...this.axiosConfigTemplate,
      data: submission,
    };

    await axios(requestConfig);
  }
}

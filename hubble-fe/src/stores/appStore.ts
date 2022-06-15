/*
 * @Author: your name
 * @Date: 2021-12-28 10:53:00
 * @LastEditTime: 2022-01-14 18:33:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hubble-fe/src/stores/appStore.ts
 */
import { createContext } from 'react';
import { observable, action, flow } from 'mobx';
import axios, { AxiosResponse } from 'axios';
import { responseData, baseUrl } from './types/common';
export class AppStore {
  @observable user: string = 'Hi, User name';
  @observable currentId: number | null = null;
  @observable currentTab: string = 'graph-management';
  @observable errorMessage = '';
  @observable tenant: string = 'null';
  @observable graphs: string = 'null';
  @observable menuObj: object = {
    c_key: '1',
    f_key: 'sub1'
  };
  @observable currentKey: any = 0
  @observable date: any = 0
  @observable graphspaces: string[] = []

  @observable colorList: string[] = [];


  @observable.shallow requestStatus = {
    fetchColorList: 'pending'
  };

  @action.bound
  setGraphspaces(params: string[]) {
    this.graphspaces = params;
  }

  @action.bound
  setDate(params: Date) {
    this.date = params;
  }

  @action.bound
  setCurrentKey(key: string) {
    this.currentKey = key;
  }

  @action.bound
  setCurrentId(id: number) {
    this.currentId = id;
  }

  @action.bound
  switchCurrentTab(tab: string) {
    this.currentTab = tab;
  }

  @action.bound
  setUser(user: string) {
    this.user = user;
  }

  @action.bound
  setTenant(tenant: string) {
    this.tenant = tenant;
  }

  @action.bound
  setGraphs(graphs: string) {
    this.graphs = graphs;
  }

  @action
  dispose() {
    this.user = 'Hi, User name';
    this.currentTab = 'graph-management';
    this.requestStatus = {
      fetchColorList: 'pending'
    };
  }

  fetchColorList = flow(function* fetchColorList(this: AppStore) {
    this.requestStatus.fetchColorList = 'pending';

    try {
      const result: AxiosResponse<responseData<string[]>> = yield axios.get(
        `${baseUrl}/${this.tenant}/graphs/${this.graphs}/schema/vertexlabels/optional-colors`
      );

      if (result.data.status !== 200) {
        throw new Error(result.data.message);
      }

      this.colorList = result.data.data;
      this.requestStatus.fetchColorList = 'success';
    } catch (error) {
      this.requestStatus.fetchColorList = 'failed';
      this.errorMessage = (error as any).message;
      console.error((error as any).message);
    }
  });
}

export default createContext(new AppStore());

import { createStore } from "vuex";
import apiService from '../apiService';

export default createStore({
    state: {
        auth: localStorage.getItem('auth'),
        access_token: localStorage.getItem('access_token') ?? null,
        homePage: '',
        caseList: '',
        caseDetail: '',
    },
    mutations: {
        loginUser(state,data){
            localStorage.setItem('access_token',data.access_token);
            apiService.setHeader(this.getters.getUserAccessToken)
            return state.access_token = data.access_token;
        },
        logout_user(state){
            localStorage.removeItem('access_token');
            state.access_token =  null;
        },
        saveCase(data){
          return data;
        },
        updateHome(state,data){
            return state.homePage = data;
        },
        updateList(state,data){
            return state.caseList = data;
        },
        updateCaseDetail(state,data){
            return state.caseDetail = data;
        },
    },
    getters:{
        auth(state){
            return state.access_token;
        },
        getUserAccessToken(state){
            return state.access_token;
        },
        getHomePage(state) {
            return state.homePage;
        },
        getCaseList(state){
            return state.caseList;
        },
        getCaseDetail(state){
            return state.caseDetail;
        },
    },
    actions: {
        async loginUser(state, user_data) {
            return new Promise((resolve) => {
                apiService.post('auth/login', user_data).then(response => {

                    resolve(response);
                });
            });
        },

        async saveCase({commit}, data) {
            await apiService.post('case/create', {params: {case_data: data}}).then(response => {
                 commit("saveCase", response.data);
                return response.data;
            });
        },

        async updateHome({commit}) {
            await apiService.get('case/upcoming').then(response => {
                return commit('updateHome', response.data);
            });
        },

        async updateList({commit}) {
            await apiService.get('case/all').then(response => {
                return commit('updateList', response.data);
            });
        },

        async updateCaseDetail({commit}, caseId) {
            await apiService.get('case/detail/' + caseId).then(response => {
                return commit('updateCaseDetail', response.data);
            });
        },

        async editCase({commit}, caseData) {
            await apiService.post('case/update',{params: {case_data: caseData}}).then(response => {
                return commit('updateCaseDetail', response.data);
            });
        },

    },
    modules: {

    },
});

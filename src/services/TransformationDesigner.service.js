import axios from "axios";

let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpZCI6IjMwNzA2MTQwNzM1Njk0MTA3OTI3NzQ5MDc5OTY3MDk4MTg4NjgwNiIsImVtYWlsIjoiY3Jvc2VubHVuZEBzcHNjb21tZXJjZS5jb20iLCJmaXJzdF9uYW1lIjoiQ29keSIsImxhc3RfbmFtZSI6IlJvc2VubHVuZCIsImF2YXRhcl9pbWFnZV91cmwiOiIiLCJ1c2VyX2lkIjoiMjg0NDQyNzQ4MjgxODI2OTI2MzUzMDMyODk3OTAzNzQyNzIwODQxIiwib3JnX2lkIjoiMTU3NjI3MTQxOTc5NjEyOTE1NjI2MzMzNTc3MTA1MTExODU0MjMyIiwib3JnX25hbWUiOiJTUFMgQ29tbWVyY2UiLCJleHAiOjE1MzYxNDkwNTgsInZlciI6IjEiLCJlbnYiOiJwcm9kIiwidXJpIjoiaHR0cHM6Ly9pZC5zcHNjLmlvIiwiaWF0IjoxNTM2MDYyNjU4fQ.jN3b2DtSQ7mITEGjGYLVGEKmUhsFQ0658GCFRHzp14wzTXqodC24QuTmarQiPX5H4aETYFn5aIrmCwHF_ZZ2cXliwO35xY6Uf3igbC_aifM3EW7menCdpkOtDzgOVHlpUWBZGRnsGVF6qAQHnwoug5tjgNNBCvyHvz0Qpj8iqIZNO9Y9u9z_7e3ZdCS-HRhmMyJm0dxxtM6RcPtVrul9w-vFgav3fufJ9dNAb2bWO_viL4srjy15PmDz3Bc7Xd0Bsr_Mirbckd4z-3Vyw45ENxfypxEKaIPWLp4I6nuOX-XJDiaIZNY4ceEm54gJuxwlquOsrDTd0bNSvOC7FCrrSg';
const config = {
    headers: {'Authorization': "bearer " + token}
};

export async function searchCompany(_retailer) {
    const baseURL = 'https://id.spsc.io/identity/v2/organizations/?search=';

    return await (axios.get(baseURL + _retailer, config)
        .then(res => res.data.results)
        .catch((error) => console.log(error))
    );
}

export async function searchDesigns(_retailerID) {
    const config = {
        headers: {'Authorization': "bearer " + token}
    };
    const baseURL = 'https://design-ui-api.spsc.io/customer_design_search/';

    return await (axios.get(baseURL + _retailerID, config)
            .then(res => res.data)
            .catch((error) => console.log(error))
    );
}
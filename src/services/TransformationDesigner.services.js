import axios from "axios";

let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpZCI6IjIxMTQyNTE4MzU5NjU2NTM2Njg4NDE2NTQ4ODg2OTc1NDU0NTMzNiIsImVtYWlsIjoiY3Jvc2VubHVuZEBzcHNjb21tZXJjZS5jb20iLCJmaXJzdF9uYW1lIjoiQ29keSIsImxhc3RfbmFtZSI6IlJvc2VubHVuZCIsImF2YXRhcl9pbWFnZV91cmwiOiIiLCJ1c2VyX2lkIjoiMjg0NDQyNzQ4MjgxODI2OTI2MzUzMDMyODk3OTAzNzQyNzIwODQxIiwib3JnX2lkIjoiMTU3NjI3MTQxOTc5NjEyOTE1NjI2MzMzNTc3MTA1MTExODU0MjMyIiwib3JnX25hbWUiOiJTUFMgQ29tbWVyY2UiLCJleHAiOjE1MzQ4NzU0ODUsInZlciI6IjEiLCJlbnYiOiJwcm9kIiwidXJpIjoiaHR0cHM6Ly9pZC5zcHNjLmlvIiwiaWF0IjoxNTM0Nzg5MDg1fQ.S-7dtM8VflWHcHQCl0YJzHNwhJsi9vIW4g8LKmrlbvuf3fA1LNrLprmFbb_lLkf5abo98caEdpHIYnXXcLWqo1HXMgXKWN2SfsdrER92zB3ssOFLNiEEPXH2j7bcKZYPGEzRAsAxEDoDKh7tvCqqktespGtg7Y7bxt9kKygiaMPxkLG4KSUVF7TbAQW4RNa91bjIIXFG6smsIfcorOs25Xo3r6cs3a5EkbeuKVjhXkoIXRx6Y4To1AbYeLsMpA_ke2dh8WEaDlAQ752s-8GqvklyAlXquRgIV7IqK5lIeC_Kb0kdMdppXH8QccT4sc4-ZnJsQqiB1JDqDteAjbbxJw';

export const searchCompany = ({_retailer, updateState}) => {
    const config = {
        headers: {'Authorization': "bearer " + token}
    };
    console.log(_retailer)
    const baseURL = 'https://id.spsc.io/identity/v2/organizations/?search=';
    axios.get(baseURL + _retailer, config)
        .then((response) => {
            console.log("response");
            console.log(response.data.results)
            return response.data.results;
            // updateState('retailerSearchResults', response.data.results);
        }).catch((error) => {
        console.log(error)
    });
};
import axios from "axios";

export async function getOpportunity(opportunityID) {
    const baseURL = 'https://op.dev.spsc.io/retailerData/';

    return await (axios.get(baseURL + opportunityID)
            .then(res => res.data)
            .catch((error) => console.log(error))
    );
}
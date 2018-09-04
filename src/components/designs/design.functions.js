import {searchDesigns} from "../../services/TransformationDesigner.service";

const docNames = {
    '810': 'Invoice',
    '850': 'Order',
    '856': 'Shipment',
    '860': 'OrderChange',
};


export async function addAllDocs(retailers, docs, convertedMatrices) {
    console.log(retailers);
    for (let i = 0; i < retailers.length; i++) {
        if (!retailers[i].documents) {
            retailers[i].documents = [];
            let designsForRetailer = [];
            await searchDesigns(retailers[i].id).then(designsKeys => {
                designsForRetailer = designsKeys
            });
            console.log(designsForRetailer);
            docs.map(doc => {
                let designsForDoc = [];
                designsForRetailer.some(design => {
                    let designKey = design.Key;
                    if (designKey.toLowerCase().indexOf(docNames[doc].toLowerCase()) !== -1) {
                    // if (designKey.toLowerCase().indexOf(doc) !== -1) {
                        designsForDoc = [...designsForDoc, designKey];
                    }
                });

                //check against the 'Converted Matrix' companies in TD
                if (retailers[i].hubID !== '') {
                    // console.log(convertedMatrices.filter(convertedSet => convertedSet.docType === doc));

                    convertedMatrices.filter(convertedSet => convertedSet.docType === doc).map(convertedSet => {
                        console.log(convertedSet.designs);
                        convertedSet.designs.filter(design => design.Key.indexOf("RSX_"+retailers[i].hubID) !== -1)
                            .map(design => {
                                designsForDoc = [...designsForDoc, design.Key];
                            })
                    });
                }

                let selectedDesign = "";
                if (designsForDoc.length === 1) {
                    selectedDesign = designsForDoc[0].split("/")[designsForDoc[0].split("/").length - 1];
                }
                retailers[i].documents = [...retailers[i].documents, {'docType': doc, "designs": designsForDoc, "selectedDesign": selectedDesign}];
            });
        }
    }
    return retailers
}


export async function addOneDoc(retailers, doc) {
    for (let i = 0; i < retailers.length; i++) {
            let designsForRetailer = [];
            await searchDesigns(retailers[i].id).then(designsKeys => {
                designsForRetailer = designsKeys
            });
            let designsForDoc = [];
            designsForRetailer.some(design => {
                let designKey = design.Key;
                // if (designKey.toLowerCase().indexOf(docNames[doc].toLowerCase()) !== -1) {
                if (designKey.toLowerCase().indexOf(doc) !== -1) {
                    console.log(designKey);
                    designsForDoc = [...designsForDoc, designKey];
                }
            });

            let selectedDesign = "";
            if (designsForDoc.length === 1) {
                selectedDesign = designsForDoc[0].split("/")[designsForDoc[0].split("/").length - 1];
            }

            retailers[i].documents = [...retailers[i].documents, {'docType': doc, "designs": designsForDoc, "selectedDesign": selectedDesign}];

    }
    return retailers
}
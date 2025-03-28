//Define defaults
const customobject = require('../services/customobject.services');

//List Custom Objects
exports.listCustomObjects = async (req, res) => {
    let response = {};

    try {
        const listCustomObjectsResult = await customobject.listCustomObjects();
        const listCustomObjectsResultStatus = listCustomObjectsResult.status;

        if (listCustomObjectsResultStatus >= 200 && listCustomObjectsResultStatus <= 300) {
            const listCustomObjectsResponse = listCustomObjectsResult.data.custom_object_records;
            response.resultcode = "SUCCESS";
            response.data = listCustomObjectsResponse;

            return res.status(listCustomObjectsResultStatus).send(response);
        }
    }
    catch (error) {
        return res.send(error);
    }
}
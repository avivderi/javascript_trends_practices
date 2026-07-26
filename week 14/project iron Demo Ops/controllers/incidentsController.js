import ironRepo from "../Iron-Dome-Ops-Project-main/repositories/baseRepository.js";
import {
    extractNewBody,
    extractUpdateBody,
    querySelectIncidents,
} from "../Iron-Dome-Ops-Project-main/services/ironServices.js";

const TABLE = "incidents";

async function createNewIncident(req, res) {
    req.body.status = "OPEN";
    const queryParameters = extractNewBody(req.body);
    const newIncident = await ironRepo.createNew(TABLE, queryParameters);
    res.status(201).json({ success: true, data: newIncident });
}

async function updateIncident(req, res) {
    const queryParameters = extractUpdateBody(req.body);
    const updateIncident = await ironRepo.updateData(TABLE, queryParameters);
    res.status(200).json({
        success: true,
        message: `Updated ${tableName} successfully. Rows affected: ${updateIncident}`,
    });
}

async function getOpenIncidents(req, res) {
    const query = querySelectIncidents();
    const allOpenIncidents = await ironRepo.getFromTable(query);
    res.status(200).json({ success: true, data: allOpenIncidents });
}

export { createNewIncident, getOpenIncidents, updateIncident };

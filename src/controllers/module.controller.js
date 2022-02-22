import Module from '../models/module.model';
import Industry from '../models/industry.model';
import { generateMessages } from "../utils/generate-message";
import helper from '../utils/middlewares/helper';

class ModuleController {
    constructor() { }

    async create(req, res, next) {
        try {

            const { fileName, displayName, moduleType, summary, youTubeLink, moreInfoLink, industries, pricing, visibility } = req.body;


            let moduleId;

            let data = await Module.findOne().sort({ _id: -1 });

            if (data) moduleId = parseInt(data.moduleId) + 1;

            else moduleId = '100001';



            let module = await Module.create({
                fileName: fileName,
                displayName: displayName,
                moduleId: moduleId,
                moduleType: moduleType,
                summary: summary,
                youTubeLink: youTubeLink,
                moreInfoLink: moreInfoLink,
                industries: industries,
                pricing: pricing,
                visibility: visibility
            });

            res.status(200).json({ status: true, message: "SUCCESS", module });

        }
        catch (error) {
            next(error);
        }
    }

    async getAllModules(req, res, next) {
        try {

            let data = await Module.find();

            res.status(200).json({ status: true, message: "SUCCESS", data });

        }
        catch (error) {
            next(error);
        }
    }

    async filterModules(req, res, next) {
        try {

            const { industries, moduleType, filter } = req.body;

            let map = [];

            if (industries) {
                map.push({ industries: { $in: industries } });
            }
            if (moduleType) {
                map.push({ moduleType: moduleType })
            }

            if (filter) {
                map.push({ $text: { $search: filter } })
            }

            let data = await Module.find({ $and: map });

            res.status(200).json({ status: true, message: "SUCCESS", data });
        }
        catch (error) {
            next(error);
        }

    }

    async getModuleById(req, res, next) {
        try {

            const { id } = req.params;

            let data = await Module.findOne({ _id: id });

            res.status(200).json({ status: true, message: "SUCCESS", data });

        }
        catch (error) {
            next(error);
        }

    }

    async updateModule(req, res, next) {
        try {
            const { fileName, displayName, moduleType, summary, youTubeLink, moreInfoLink, industries, pricing, visibility } = req.body;

            const { id } = req.params;

            let data = await Module.findOneAndUpdate(
                { _id: id },
                {
                    fileName: fileName,
                    displayName: displayName,
                    moduleType: moduleType,
                    summary: summary,
                    youTubeLink: youTubeLink,
                    moreInfoLink: moreInfoLink,
                    industries: industries,
                    pricing: pricing,
                    visibility: visibility
                }, { new: true });

            res.status(200).json({ status: true, message: "SUCCESS", data });
        }

        catch (error) {
            next(error);
        }

    }

    async getAllIndustry(req, res, next) {
        try {

            let data = await Industry.find();

            res.status(200).json({ status: true, message: "SUCCESS", data });

        }
        catch (error) {
            next(error);
        }
    }

    async addIndustry(req, res, next) {
        try {

            const { name } = req.body;

            let data = await Industry.create({
                name: name
            });

            res.status(200).json({ status: true, message: "SUCCESS", data });

        }
        catch (error) {
            next(error);
        }
    }

}

module.exports = ModuleController;

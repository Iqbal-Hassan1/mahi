import Orgnaization from '../models/orgnaization.model';
import { generateMessages } from "../utils/generate-message";
import helper from '../utils/middlewares/helper';

class OrgnaizationController {
    constructor() { }

    async addOrgnaization(req, res, next) {
        try {

            const logo = req.file.path;

            let orgnaizationId;

            const { name, region, website, mainAddress, contactPhone, adminId, payments } = req.body;

            let data = await Orgnaization.findOne().sort({ _id: -1 });

            if (data) orgnaizationId = parseInt(data.orgnaizationId) + 1;

            else orgnaizationId = '100001';

            let orgnaization = await Orgnaization.create({
                name: name,
                region: region,
                website: website,
                mainAddress: mainAddress,
                contactPhone: contactPhone,
                logo: logo,
                adminId: adminId,
                payments: payments,
                orgnaizationId: orgnaizationId
            });

            res.status(200).json({ status: true, message: "SUCCESS", orgnaization });
        }
        catch (error) {
            next(error);
        }

    }

    async updateOrgnaization(req, res, next) {
        try {
            const logo = req.file.path;

            const { id } = req.params;

            const { name, region, website, mainAddress, contactPhone, adminId, payments } = req.body;

            let data;

            if (logo) {
                data = {
                    name: name,
                    region: region,
                    website: website,
                    mainAddress: mainAddress,
                    contactPhone: contactPhone,
                    logo: logo,
                    adminId: adminId,
                    payments: payments,
                }
            }
            else {
                data = {
                    name: name,
                    region: region,
                    website: website,
                    mainAddress: mainAddress,
                    contactPhone: contactPhone,
                    adminId: adminId,
                    payments: payments,
                }
            }



            await Orgnaization.updateOne({ _id: id },
                data
            );

            res.status(200).json({ status: true, message: "SUCCESS" });
        }
        catch (error) {
            next(error);
        }
    }

    async getAllOrgnaization(req, res, next) {
        try {

            let data = await Orgnaization.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "adminId",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $unwind: "$user"
                }
            ]);

            res.status(200).json({ status: true, message: "SUCCESS", data });

        }
        catch (error) {
            next(error);
        }
    }
}
module.exports = OrgnaizationController;
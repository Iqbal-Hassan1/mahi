import User from "./user.controller";
import ModuleController from './module.controller';
import OrgnaizationController from './orgnaization.controller'

module.exports = {
    user: new User(),
    modulecontroller: new ModuleController(),
    orgnaization: new OrgnaizationController()
};

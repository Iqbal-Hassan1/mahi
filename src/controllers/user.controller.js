import Users from "../models/user.model";
import SuperUser from "../models/superUser.model";
import { generateMessages } from "../utils/generate-message";
import helper from "../utils/middlewares/helper";

class User {
  constructor() {}

  async signup(req, res, next) {
    try {
      const {
        firstName,
        lastName,
        secondaryContact,
        email,
        password,
        mainContact,
        orgnaizationId,
        userType,
        region,
        jobTitle,
      } = req.body;

      let userId;

      let userdata = await Users.findOne().sort({ _id: -1 });

      if (userdata) userId = parseInt(userdata.userId) + 1;
      else userId = "100001";

      let user = new Users({
        firstName,
        lastName,
        secondaryContact,
        email,
        password,
        mainContact,
        userId,
        orgnaizationId,
        userType,
        region,
        jobTitle,
      });

      let data = await user.save();

      let token = await data.token();

      data = helper.shallowCopy(data);

      data = Object.assign(data, { token: token });

      res.status(200).json({ status: true, message: "SUCCESS", data });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      let user;

      let token;

      let admin = await Users.findOne({ email: email });

      let superadmin = await SuperUser.findOne({ email: email });

      if (!admin && !superadmin) throw generateMessages("NO_RECORD_FOUND");

      if (admin && !(await admin.validPassword(password)))
        throw generateMessages("PASSWORD_INCORRECT");

      if (superadmin && !(await superadmin.validPassword(password)))
        throw generateMessages("PASSWORD_INCORRECT");

      if (superadmin) {
        token = await superadmin.token();
        user = helper.shallowCopy(superadmin);
      }
      if (admin) {
        token = await admin.token();
        user = helper.shallowCopy(admin);
      }

      user = Object.assign(user, { token: token });

      res.status(200).json({ status: true, message: "SUCCESS", user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      let data = await Users.find({ userType: { $nin: ["Super Admin"] } });

      res.status(200).json({ status: true, message: "SUCCESS", data });
    } catch (error) {
      next(error);
    }
  }

  async filterUsers(req, res, next) {
    try {
      let { filter, region, userType } = req.body;

      let map = [];

      if (filter) map.push({ $text: { $search: filter } });

      if (region) map.push({ region: region });

      if (userType) map.push({ userType: userType });

      let data = await Users.find({ $and: map });

      res.status(200).json({ status: true, message: "SUCCESS", data });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;

      await Users.updateOne({ _id: id }, req.body);

      res.status(200).json({ status: true, message: "SUCCESS" });
    } catch (error) {
      next(error);
    }
  }

  async UserPassUpdate(req, res, next) {
    try {
      const { id } = req.params;

      const { password } = req.body;

      await Users.findOneAndUpdate({ _id: id }, { password: password });

      res.status(200).json({ status: true, message: "SUCCESS" });
    } catch (error) {
      next(error);
    }
  }

  async SuperUser(req, res, next) {
    try {
      const { username, email, permissions, password } = req.body;

      let uid;

      let data = await SuperUser.findOne().sort({ _id: -1 });

      if (data) uid = parseInt(data.UserId) + 1;
      else uid = "100001";

      let x = permissions.split(",");

      const superuser = await SuperUser.create({
        username: username,
        email: email,
        UserId: uid,
        Permissions: x,
        password: password,
      });

      res.status(200).json({ status: true, message: "SUCCESS", superuser });
    } catch (error) {
      next(error);
    }
  }

  async getAllSuperUsers(req, res, next) {
    try {
      let data = await SuperUser.find();

      res.status(200).json({ status: true, message: "SUCCESS", data });
    } catch (error) {
      next(error);
    }
  }

  async filterSuperUsers(req, res, next) {
    try {
      let { filter } = req.body;

      let map = [];

      if (filter) map.push({ $text: { $search: filter } });

      let data = await SuperUser.find({ $and: map });

      res.status(200).json({ status: true, message: "SUCCESS", data });
    } catch (error) {
      next(error);
    }
  }

  async superUserUpdate(req, res, next) {
    try {
      const { id } = req.params;

      const { username, permissions } = req.body;

      let x = permissions.split(",");

      await SuperUser.updateOne(
        { _id: id },
        { username: username, Permissions: x }
      );

      res.status(200).json({ status: true, message: "SUCCESS" });
    } catch (error) {
      next(error);
    }
  }

  async superUserPassUpdate(req, res, next) {
    try {
      const { id } = req.params;

      const { password } = req.body;

      await SuperUser.findOneAndUpdate({ _id: id }, { password: password });

      res.status(200).json({ status: true, message: "SUCCESS" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = User;

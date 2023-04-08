import mongoose from "mongoose";

export default interface IDevice {
  name: string;
  owner: string;
  users: Array<string>;
}

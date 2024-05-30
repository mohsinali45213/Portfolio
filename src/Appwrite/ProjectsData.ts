import config from "../Configuration/Config.ts";
import {
  Databases,
  Storage,
  Query,
  Client,
  Account,
} from "appwrite";


export class Service {
  public client: Client;
  public database: Databases;
  public bucket: Storage;
  public account: Account;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
    this.account = new Account(this.client);
  }

  async getPosts(queries:string[] = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  getFilePreview(fileId:string){
    return this.bucket.getFilePreview(
        config.appwriteBucketId,
        fileId
    )
}
}

const service = new Service();
export default service;

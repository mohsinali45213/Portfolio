import config from "../Configuration/Config.ts";
import {Databases,Storage,Query,ID, Client } from "appwrite";

type Create = {
  slug:string,
  title:string,
  description:string,
  featuredImage:string,
  liveUrl:string,
  githubUrl:string,
}

export class Service {
  constructor(private client:Client,private database:Databases,private bucket:Storage){
    this.client
    .setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId)
    this.database = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }

  async createProjects({title,slug,description,featuredImage,liveUrl,githubUrl}:Create){
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          description,
          featuredImage,
          liveUrl,
          githubUrl,
        }
      )
    } catch (error) {
      console.log("Appwrite serive :: createProjects :: error", error);
    }
  }

  async getProjects(slug:string){
    try {
      return await this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      )
    } catch (error) {
      console.log("Appwrite service :: getProjects :: error", error);
      return false;
    }
  }

  async updateProject({title,slug,description,featuredImage,liveUrl,githubUrl}:Create){
    try {
      return await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          description,
          featuredImage,
          liveUrl,
          githubUrl,
        }
      )
    } catch (error) {
      console.log("Appwrite service :: updateProject :: error", error);
    }
  }

  async deleteProject(slug:string){
    try {
        await this.database.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        
        )
        return true
    } catch (error) {
        console.log("Appwrite serive :: deleteProject :: error", error);
        return false
    }
}
}
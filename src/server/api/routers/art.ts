import z from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import artworkModel from "@/models/artwork.model";
import dbConnect from "@/lib/database";

export const artRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    await dbConnect();

    const artworks = artworkModel.find();
    return artworks;
  }),
});

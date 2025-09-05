import { Request, Response } from "express";
import Integration from "../models/Integration";

export async function listIntegrations(req: Request, res: Response) {
  const where:any = {};
  if (req.query.type) where.type = req.query.type;
  const rows = await Integration.findAll({ where, order:[["id","DESC"]] });
  return res.json(rows);
}

export async function deleteIntegration(req: Request, res: Response) {
  const id = Number(req.params.id);
  await Integration.destroy({ where: { id } });
  return res.sendStatus(204);
}

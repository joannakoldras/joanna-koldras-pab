/** 
 * Required External Modules and Interfaces
 */
import express, {Request, Response} from "express"; 
import * as ItemService from "./items.service"; 
import { BaseItem, Item } from "./item.interface";

/**
 * Router Definition
 */
export const itemsRouter = express.Router(); 

/**
 * Controller Definitions
 */


//GET items
itemsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const items: Item[] = await ItemService.findAll(); 
        res.status(200).send(items);
    } catch (e) {
        res.status(500).send(e.message); 
    }
}); 

//GET items/:id
itemsRouter.get("/:id", async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10); 

    try {
        const item: Item = await ItemService.find(id); 

        if(item){
            return res.status(200).send(item); 
        }

        res.status(404).send("item not found");
    } catch (e) {
        res.status(500).send(e.message); 
    }
}); 


//POST items

//PUT items/:id

//DELETE items/:id